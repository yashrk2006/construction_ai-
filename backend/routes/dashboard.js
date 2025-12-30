const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const WorkforceMember = require('../models/WorkforceMember');
const Material = require('../models/Material');
const SafetyAlert = require('../models/SafetyAlert');

// GET dashboard summary
router.get('/summary', async (req, res) => {
    try {
        // Tasks stats
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: 'Pending' });
        const completedTasks = await Task.countDocuments({ status: 'Completed' });
        const delayedTasks = await Task.countDocuments({ status: 'Delayed' });

        // Workforce stats
        const totalWorkforce = await WorkforceMember.countDocuments();
        const activeWorkforce = await WorkforceMember.countDocuments({ attendanceStatus: 'Present' });

        // Materials stats
        const totalMaterials = await Material.countDocuments();
        const lowStockMaterials = await Material.find({
            $expr: { $lte: ['$quantity', '$reorderLevel'] }
        }).countDocuments();

        // Safety stats
        const unresolvedAlerts = await SafetyAlert.countDocuments({ resolved: false });
        const complianceRate = await calculateComplianceRate();

        res.json({
            tasks: {
                total: totalTasks,
                pending: pendingTasks,
                completed: completedTasks,
                delayed: delayedTasks
            },
            workforce: {
                total: totalWorkforce,
                active: activeWorkforce,
                attendanceRate: totalWorkforce > 0 ? Math.round((activeWorkforce / totalWorkforce) * 100) : 0
            },
            materials: {
                total: totalMaterials,
                lowStock: lowStockMaterials
            },
            safety: {
                unresolvedAlerts,
                complianceRate
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Helper function to calculate compliance rate
async function calculateComplianceRate() {
    const total = await SafetyAlert.countDocuments();
    const resolved = await SafetyAlert.countDocuments({ resolved: true });
    return total > 0 ? Math.round((resolved / total) * 100) : 100;
}

module.exports = router;
