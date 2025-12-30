const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken, authenticate } = require('../middleware/auth');

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 */
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }

        // Find user and include password field
        const user = await User.findOne({ email: email.toLowerCase() })
            .select('+password');

        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials',
                code: 'INVALID_CREDENTIALS'
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                error: 'Account is deactivated',
                code: 'ACCOUNT_INACTIVE'
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                error: 'Invalid credentials',
                code: 'INVALID_CREDENTIALS'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = generateToken({
            id: user._id,
            email: user.email,
            role: user.role,
            permissions: user.permissions
        });

        // Return user data and token
        res.json({
            success: true,
            token,
            user: user.toSafeObject()
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Login failed',
            message: error.message
        });
    }
});

/**
 * POST /api/auth/register
 * Register new user (admin only in production, open for demo)
 */
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, site, employeeId } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Name, email, and password are required'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: 'Password must be at least 6 characters'
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                error: 'User already exists',
                code: 'USER_EXISTS'
            });
        }

        // Determine role and permissions
        const userRole = role || 'Worker';
        const permissions = User.getDefaultPermissions(userRole);

        // Create user
        const user = new User({
            name,
            email: email.toLowerCase(),
            password,
            role: userRole,
            site: site || 'Mumbai Metro Line 3 - Phase II',
            employeeId,
            permissions
        });

        await user.save();

        // Generate token
        const token = generateToken({
            id: user._id,
            email: user.email,
            role: user.role,
            permissions: user.permissions
        });

        res.status(201).json({
            success: true,
            token,
            user: user.toSafeObject()
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            error: 'Registration failed',
            message: error.message
        });
    }
});

/**
 * GET /api/auth/me
 * Get current user profile
 */
router.get('/me', authenticate, async (req, res) => {
    try {
        if (!req.authenticated || !req.user) {
            return res.status(401).json({
                error: 'Not authenticated'
            });
        }

        const user = await User.findById(req.user.id);

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
        console.error('Get profile error:', error);
        res.status(500).json({
            error: 'Failed to get profile',
            message: error.message
        });
    }
});

/**
 * POST /api/auth/demo-login
 * Demo login endpoint for quick role-based testing
 */
router.post('/demo-login', async (req, res) => {
    try {
        const { role } = req.body;

        // Demo users mapping
        const demoUsers = {
            'Admin': {
                name: 'Rajesh Kumar',
                email: 'rajesh@buildsmart.in',
                role: 'Admin'
            },
            'Project Manager': {
                name: 'Priya Sharma',
                email: 'priya@buildsmart.in',
                role: 'Project Manager'
            },
            'Supervisor': {
                name: 'Amit Patel',
                email: 'amit@buildsmart.in',
                role: 'Supervisor'
            },
            'Worker': {
                name: 'Ramesh Singh',
                email: 'ramesh@buildsmart.in',
                role: 'Worker'
            }
        };

        const demoUser = demoUsers[role] || demoUsers['Worker'];

        // Try to find existing demo user
        let user = await User.findOne({ email: demoUser.email });

        // Create if doesn't exist
        if (!user) {
            user = new User({
                ...demoUser,
                password: 'demo123',
                site: 'Mumbai Metro Line 3 - Phase II',
                permissions: User.getDefaultPermissions(demoUser.role),
                employeeId: `EMP${Date.now()}`
            });
            await user.save();
        }

        // Generate token
        const token = generateToken({
            id: user._id,
            email: user.email,
            role: user.role,
            permissions: user.permissions
        });

        res.json({
            success: true,
            token,
            user: user.toSafeObject(),
            message: 'Demo login successful'
        });

    } catch (error) {
        console.error('Demo login error:', error);
        res.status(500).json({
            error: 'Demo login failed',
            message: error.message
        });
    }
});

/**
 * POST /api/auth/refresh
 * Refresh JWT token
 */
router.post('/refresh', authenticate, async (req, res) => {
    try {
        if (!req.authenticated || !req.user) {
            return res.status(401).json({
                error: 'Not authenticated'
            });
        }

        const user = await User.findById(req.user.id);

        if (!user || !user.isActive) {
            return res.status(403).json({
                error: 'User not found or inactive'
            });
        }

        const token = generateToken({
            id: user._id,
            email: user.email,
            role: user.role,
            permissions: user.permissions
        });

        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({
            error: 'Token refresh failed',
            message: error.message
        });
    }
});

module.exports = router;
