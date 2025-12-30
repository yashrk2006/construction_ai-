const express = require('express');
const router = express.Router();

router.get('/summary', (req, res) => {
    const tasks = req.app.locals.readData(req.app.locals.DATA_FILES.tasks);
    const workforce = req.app.locals.readData(req.app.locals.DATA_FILES.workforce);
    const materials = req.app.locals.readData(req.app.locals.DATA_FILES.materials);
    const safety = req.app.locals.readData(req.app.locals.DATA_FILES.safety);

    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const delayedTasks = tasks.filter(t => t.status === 'Delayed').length;

    const totalWorkforce = workforce.length;
    const activeWorkforce = workforce.filter(w => w.attendanceStatus === 'Present').length;

    const totalMaterials = materials.length;
    const lowStockMaterials = materials.filter(m => m.quantity <= m.reorderLevel).length;

    const unresolvedAlerts = safety.filter(s => !s.resolved).length;
    const complianceRate = safety.length > 0 ? Math.round((safety.filter(s => s.resolved).length / safety.length) * 100) : 100;

    res.json({
        tasks: { total: totalTasks, pending: pendingTasks, completed: completedTasks, delayed: delayedTasks },
        workforce: { total: totalWorkforce, active: activeWorkforce, attendanceRate: totalWorkforce > 0 ? Math.round((activeWorkforce / totalWorkforce) * 100) : 0 },
        materials: { total: totalMaterials, lowStock: lowStockMaterials },
        safety: { unresolvedAlerts, complianceRate }
    });
});

module.exports = router;
