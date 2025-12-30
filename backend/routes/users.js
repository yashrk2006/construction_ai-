const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * GET /api/users
 * Get all users (Admin and Project Manager only)
 */
router.get('/', authenticate, authorize('Admin', 'Project Manager'), async (req, res) => {
    try {
        const { role, site, isActive, search } = req.query;

        let query = {};

        if (role) query.role = role;
        if (site) query.site = site;
        if (isActive !== undefined) query.isActive = isActive === 'true';
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { employeeId: { $regex: search, $options: 'i' } }
            ];
        }

        const users = await User.find(query)
            .select('-password')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            error: 'Failed to fetch users',
            message: error.message
        });
    }
});

/**
 * GET /api/users/:id
 * Get specific user by ID
 */
router.get('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        // Users can view their own profile, admins can view anyone
        if (req.user.id !== id && req.user.role !== 'Admin') {
            return res.status(403).json({
                error: 'Unauthorized to view this user'
            });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            user: user.toSafeObject()
        });

    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            error: 'Failed to fetch user',
            message: error.message
        });
    }
});

/**
 * PUT /api/users/:id
 * Update user details
 */
router.put('/:id', authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Users can update their own profile, admins can update anyone
        if (req.user.id !== id && req.user.role !== 'Admin') {
            return res.status(403).json({
                error: 'Unauthorized to update this user'
            });
        }

        // Prevent non-admins from changing role or permissions
        if (req.user.role !== 'Admin') {
            delete updates.role;
            delete updates.permissions;
            delete updates.isActive;
        }

        // Don't allow direct password updates through this endpoint
        delete updates.password;

        const user = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            user: user.toSafeObject()
        });

    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            error: 'Failed to update user',
            message: error.message
        });
    }
});

/**
 * DELETE /api/users/:id
 * Deactivate user (Admin only)
 */
router.delete('/:id', authenticate, authorize('Admin'), async (req, res) => {
    try {
        const { id } = req.params;

        // Don't allow deleting yourself
        if (req.user.id === id) {
            return res.status(400).json({
                error: 'Cannot deactivate your own account'
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User deactivated successfully',
            user: user.toSafeObject()
        });

    } catch (error) {
        console.error('Deactivate user error:', error);
        res.status(500).json({
            error: 'Failed to deactivate user',
            message: error.message
        });
    }
});

/**
 * PUT /api/users/:id/permissions
 * Update user permissions (Admin only)
 */
router.put('/:id/permissions', authenticate, authorize('Admin'), async (req, res) => {
    try {
        const { id } = req.params;
        const { permissions } = req.body;

        if (!Array.isArray(permissions)) {
            return res.status(400).json({
                error: 'Permissions must be an array'
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            { permissions },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Permissions updated successfully',
            user: user.toSafeObject()
        });

    } catch (error) {
        console.error('Update permissions error:', error);
        res.status(500).json({
            error: 'Failed to update permissions',
            message: error.message
        });
    }
});

/**
 * GET /api/users/stats/summary
 * Get user statistics (Admin and Project Manager only)
 */
router.get('/stats/summary', authenticate, authorize('Admin', 'Project Manager'), async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isActive: true });
        const usersByRole = await User.aggregate([
            { $group: { _id: '$role', count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            stats: {
                total: totalUsers,
                active: activeUsers,
                inactive: totalUsers - activeUsers,
                byRole: usersByRole
            }
        });

    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            error: 'Failed to fetch statistics',
            message: error.message
        });
    }
});

module.exports = router;
