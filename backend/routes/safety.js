const express = require('express');
const router = express.Router();
const SafetyAlert = require('../models/SafetyAlert');

// GET all safety alerts
router.get('/', async (req, res) => {
    try {
        const alerts = await SafetyAlert.find().sort({ createdAt: -1 });
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET unresolved safety alerts
router.get('/unresolved', async (req, res) => {
    try {
        const alerts = await SafetyAlert.find({ resolved: false }).sort({ createdAt: -1 });
        res.json(alerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET safety alert by ID
router.get('/:id', async (req, res) => {
    try {
        const alert = await SafetyAlert.findById(req.params.id);
        if (!alert) {
            return res.status(404).json({ error: 'Safety alert not found' });
        }
        res.json(alert);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE new safety alert
router.post('/', async (req, res) => {
    try {
        const alert = new SafetyAlert(req.body);
        const savedAlert = await alert.save();
        res.status(201).json(savedAlert);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// RESOLVE safety alert
router.patch('/:id/resolve', async (req, res) => {
    try {
        const alert = await SafetyAlert.findByIdAndUpdate(
            req.params.id,
            {
                resolved: true,
                resolvedAt: new Date(),
                updatedAt: new Date()
            },
            { new: true }
        );
        if (!alert) {
            return res.status(404).json({ error: 'Safety alert not found' });
        }
        res.json(alert);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE safety alert
router.put('/:id', async (req, res) => {
    try {
        const alert = await SafetyAlert.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!alert) {
            return res.status(404).json({ error: 'Safety alert not found' });
        }
        res.json(alert);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE safety alert
router.delete('/:id', async (req, res) => {
    try {
        const alert = await SafetyAlert.findByIdAndDelete(req.params.id);
        if (!alert) {
            return res.status(404).json({ error: 'Safety alert not found' });
        }
        res.json({ message: 'Safety alert deleted successfully', alert });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET SAFETY STATISTICS
router.get('/stats/summary', async (req, res) => {
    try {
        const total = await SafetyAlert.countDocuments();
        const high = await SafetyAlert.countDocuments({ severity: 'High' });
        const medium = await SafetyAlert.countDocuments({ severity: 'Medium' });
        const low = await SafetyAlert.countDocuments({ severity: 'Low' });
        const resolved = await SafetyAlert.countDocuments({ resolved: true });
        const unresolved = await SafetyAlert.countDocuments({ resolved: false });

        res.json({
            total,
            severity: { high, medium, low },
            resolved,
            unresolved,
            complianceRate: total > 0 ? Math.round((resolved / total) * 100) : 100
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
