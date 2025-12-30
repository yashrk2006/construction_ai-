const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    const materials = req.app.locals.readData(req.app.locals.DATA_FILES.materials);
    res.json(materials);
});

router.get('/:id', (req, res) => {
    const materials = req.app.locals.readData(req.app.locals.DATA_FILES.materials);
    const material = materials.find(m => m.id === req.params.id);
    if (!material) return res.status(404).json({ error: 'Material not found' });
    res.json(material);
});

router.post('/', (req, res) => {
    const materials = req.app.locals.readData(req.app.locals.DATA_FILES.materials);
    const newMaterial = { id: uuidv4(), ...req.body, lastUpdated: new Date().toLocaleDateString(), createdAt: new Date().toISOString() };
    materials.push(newMaterial);
    req.app.locals.writeData(req.app.locals.DATA_FILES.materials, materials);
    res.status(201).json(newMaterial);
});

router.put('/:id', (req, res) => {
    const materials = req.app.locals.readData(req.app.locals.DATA_FILES.materials);
    const index = materials.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Material not found' });
    materials[index] = { ...materials[index], ...req.body, id: req.params.id, lastUpdated: new Date().toLocaleDateString() };
    req.app.locals.writeData(req.app.locals.DATA_FILES.materials, materials);
    res.json(materials[index]);
});

router.patch('/:id/quantity', (req, res) => {
    const materials = req.app.locals.readData(req.app.locals.DATA_FILES.materials);
    const index = materials.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Material not found' });
    materials[index].quantity = req.body.quantity;
    materials[index].lastUpdated = new Date().toLocaleDateString();
    req.app.locals.writeData(req.app.locals.DATA_FILES.materials, materials);
    res.json(materials[index]);
});

router.get('/alerts/lowstock', (req, res) => {
    const materials = req.app.locals.readData(req.app.locals.DATA_FILES.materials);
    const lowStock = materials.filter(m => m.quantity <= m.reorderLevel);
    res.json(lowStock);
});

router.delete('/:id', (req, res) => {
    const materials = req.app.locals.readData(req.app.locals.DATA_FILES.materials);
    const index = materials.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Material not found' });
    const deleted = materials.splice(index, 1)[0];
    req.app.locals.writeData(req.app.locals.DATA_FILES.materials, materials);
    res.json({ message: 'Material deleted', material: deleted });
});

module.exports = router;
