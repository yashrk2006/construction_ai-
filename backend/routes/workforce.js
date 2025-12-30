const express = require('express');
const router = express.Router();
const WorkforceMember = require('../models/WorkforceMember');

// GET all workforce members
router.get('/', async (req, res) => {
    try {
        const members = await WorkforceMember.find().sort({ createdAt: -1 });
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET workforce member by ID
router.get('/:id', async (req, res) => {
    try {
        const member = await WorkforceMember.findById(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE new workforce member
router.post('/', async (req, res) => {
    try {
        const member = new WorkforceMember(req.body);
        const savedMember = await member.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE workforce member
router.put('/:id', async (req, res) => {
    try {
        const member = await WorkforceMember.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// MARK ATTENDANCE - Check In
router.post('/:id/checkin', async (req, res) => {
    try {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        const member = await WorkforceMember.findByIdAndUpdate(
            req.params.id,
            {
                attendanceStatus: 'Present',
                lastCheckIn: timeString,
                updatedAt: new Date()
            },
            { new: true }
        );

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE ATTENDANCE STATUS
router.patch('/:id/attendance', async (req, res) => {
    try {
        const { attendanceStatus } = req.body;
        const member = await WorkforceMember.findByIdAndUpdate(
            req.params.id,
            { attendanceStatus, updatedAt: new Date() },
            { new: true }
        );
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE PRODUCTIVITY SCORE
router.patch('/:id/productivity', async (req, res) => {
    try {
        const { productivityScore } = req.body;
        const member = await WorkforceMember.findByIdAndUpdate(
            req.params.id,
            { productivityScore, updatedAt: new Date() },
            { new: true }
        );
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE workforce member
router.delete('/:id', async (req, res) => {
    try {
        const member = await WorkforceMember.findByIdAndDelete(req.params.id);
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json({ message: 'Member deleted successfully', member });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET ATTENDANCE STATISTICS
router.get('/stats/attendance', async (req, res) => {
    try {
        const total = await WorkforceMember.countDocuments();
        const present = await WorkforceMember.countDocuments({ attendanceStatus: 'Present' });
        const absent = await WorkforceMember.countDocuments({ attendanceStatus: 'Absent' });
        const late = await WorkforceMember.countDocuments({ attendanceStatus: 'Late' });

        res.json({
            total,
            present,
            absent,
            late,
            attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
