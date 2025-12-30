const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    const members = req.app.locals.readData(req.app.locals.DATA_FILES.workforce);
    res.json(members);
});

router.get('/:id', (req, res) => {
    const members = req.app.locals.readData(req.app.locals.DATA_FILES.workforce);
    const member = members.find(m => m.id === req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
});

router.post('/', (req, res) => {
    const members = req.app.locals.readData(req.app.locals.DATA_FILES.workforce);
    const newMember = { id: uuidv4(), ...req.body, createdAt: new Date().toISOString() };
    members.push(newMember);
    req.app.locals.writeData(req.app.locals.DATA_FILES.workforce, members);
    res.status(201).json(newMember);
});

router.put('/:id', (req, res) => {
    const members = req.app.locals.readData(req.app.locals.DATA_FILES.workforce);
    const index = members.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Member not found' });
    members[index] = { ...members[index], ...req.body, id: req.params.id, updatedAt: new Date().toISOString() };
    req.app.locals.writeData(req.app.locals.DATA_FILES.workforce, members);
    res.json(members[index]);
});

router.post('/:id/checkin', (req, res) => {
    const members = req.app.locals.readData(req.app.locals.DATA_FILES.workforce);
    const index = members.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Member not found' });
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    members[index].attendanceStatus = 'Present';
    members[index].lastCheckIn = timeString;
    members[index].updatedAt = new Date().toISOString();
    req.app.locals.writeData(req.app.locals.DATA_FILES.workforce, members);
    res.json(members[index]);
});

router.patch('/:id/attendance', (req, res) => {
    const members = req.app.locals.readData(req.app.locals.DATA_FILES.workforce);
    const index = members.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Member not found' });
    members[index].attendanceStatus = req.body.attendanceStatus;
    members[index].updatedAt = new Date().toISOString();
    req.app.locals.writeData(req.app.locals.DATA_FILES.workforce, members);
    res.json(members[index]);
});

router.patch('/:id/productivity', (req, res) => {
    const members = req.app.locals.readData(req.app.locals.DATA_FILES.workforce);
    const index = members.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Member not found' });
    members[index].productivityScore = req.body.productivityScore;
    members[index].updatedAt = new Date().toISOString();
    req.app.locals.writeData(req.app.locals.DATA_FILES.workforce, members);
    res.json(members[index]);
});

router.delete('/:id', (req, res) => {
    const members = req.app.locals.readData(req.app.locals.DATA_FILES.workforce);
    const index = members.findIndex(m => m.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Member not found' });
    const deleted = members.splice(index, 1)[0];
    req.app.locals.writeData(req.app.locals.DATA_FILES.workforce, members);
    res.json({ message: 'Member deleted', member: deleted });
});

router.get('/stats/attendance', (req, res) => {
    const members = req.app.locals.readData(req.app.locals.DATA_FILES.workforce);
    const total = members.length;
    const present = members.filter(m => m.attendanceStatus === 'Present').length;
    const absent = members.filter(m => m.attendanceStatus === 'Absent').length;
    const late = members.filter(m => m.attendanceStatus === 'Late').length;
    res.json({ total, present, absent, late, attendanceRate: total > 0 ? Math.round((present / total) * 100) : 0 });
});

module.exports = router;
