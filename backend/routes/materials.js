const express = require('express');
const router = express.Router();
const Material = require('../models/Material');

// GET all materials
router.get('/', async (req, res) => {
    try {
        const materials = await Material.find().sort({ createdAt: -1 });
        res.json(materials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET material by ID
router.get('/:id', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE new material
router.post('/', async (req, res) => {
    try {
        const material = new Material(req.body);
        const savedMaterial = await material.save();
        res.status(201).json(savedMaterial);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE material
router.put('/:id', async (req, res) => {
    try {
        req.body.lastUpdated = new Date().toLocaleDateString();
        const material = await Material.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE material quantity
router.patch('/:id/quantity', async (req, res) => {
    try {
        const { quantity } = req.body;
        const material = await Material.findByIdAndUpdate(
            req.params.id,
            {
                quantity,
                lastUpdated: new Date().toLocaleDateString(),
                updatedAt: new Date()
            },
            { new: true }
        );
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET low stock materials
router.get('/alerts/lowstock', async (req, res) => {
    try {
        const lowStockMaterials = await Material.find({
            $expr: { $lte: ['$quantity', '$reorderLevel'] }
        });
        res.json(lowStockMaterials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE material
router.delete('/:id', async (req, res) => {
    try {
        const material = await Material.findByIdAndDelete(req.params.id);
        if (!material) {
            return res.status(404).json({ error: 'Material not found' });
        }
        res.json({ message: 'Material deleted successfully', material });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
