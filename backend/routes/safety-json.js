const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    const alerts = req.app.locals.readData(req.app.locals.DATA_FILES.safety);
    res.json(alerts);
});

router.get('/unresolved', (req, res) => {
    const alerts = req.app.locals.readData(req.app.locals.DATA_FILES.safety);
    const unresolved = alerts.filter(a => !a.resolved);
    res.json(unresolved);
});

router.get('/:id', (req, res) => {
    const alerts = req.app.locals.readData(req.app.locals.DATA_FILES.safety);
    const alert = alerts.find(a => a.id === req.params.id);
    if (!alert) return res.status(404).json({ error: 'Safety alert not found' });
    res.json(alert);
});

router.post('/', (req, res) => {
    const alerts = req.app.locals.readData(req.app.locals.DATA_FILES.safety);
    const newAlert = { id: uuidv4(), ...req.body, timestamp: new Date().toLocaleString(), resolved: false, createdAt: new Date().toISOString() };
    alerts.push(newAlert);
    req.app.locals.writeData(req.app.locals.DATA_FILES.safety, alerts);
    res.status(201).json(newAlert);
});

router.put('/:id', (req, res) => {
    const alerts = req.app.locals.readData(req.app.locals.DATA_FILES.safety);
    const index = alerts.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Safety alert not found' });
    alerts[index] = { ...alerts[index], ...req.body, id: req.params.id };
    req.app.locals.writeData(req.app.locals.DATA_FILES.safety, alerts);
    res.json(alerts[index]);
});

router.patch('/:id/resolve', (req, res) => {
    const alerts = req.app.locals.readData(req.app.locals.DATA_FILES.safety);
    const index = alerts.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Safety alert not found' });
    alerts[index].resolved = true;
    alerts[index].resolvedAt = new Date().toISOString();
    req.app.locals.writeData(req.app.locals.DATA_FILES.safety, alerts);
    res.json(alerts[index]);
});

router.delete('/:id', (req, res) => {
    const alerts = req.app.locals.readData(req.app.locals.DATA_FILES.safety);
    const index = alerts.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Safety alert not found' });
    const deleted = alerts.splice(index, 1)[0];
    req.app.locals.writeData(req.app.locals.DATA_FILES.safety, alerts);
    res.json({ message: 'Safety alert deleted', alert: deleted });
});

router.get('/stats/summary', (req, res) => {
    const alerts = req.app.locals.readData(req.app.locals.DATA_FILES.safety);
    const total = alerts.length;
    const high = alerts.filter(a => a.severity === 'High').length;
    const medium = alerts.filter(a => a.severity === 'Medium').length;
    const low = alerts.filter(a => a.severity === 'Low').length;
    const resolved = alerts.filter(a => a.resolved).length;
    const unresolved = alerts.filter(a => !a.resolved).length;
    res.json({
        total,
        severity: { high, medium, low },
        resolved,
        unresolved,
        complianceRate: total > 0 ? Math.round((resolved / total) * 100) : 100
    });
});

module.exports = router;
