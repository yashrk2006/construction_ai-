const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// GET all tasks
router.get('/', (req, res) => {
    try {
        const tasks = req.app.locals.readData(req.app.locals.DATA_FILES.tasks);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET task by ID
router.get('/:id', (req, res) => {
    try {
        const tasks = req.app.locals.readData(req.app.locals.DATA_FILES.tasks);
        const task = tasks.find(t => t.id === req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE new task
router.post('/', (req, res) => {
    try {
        const tasks = req.app.locals.readData(req.app.locals.DATA_FILES.tasks);
        const newTask = {
            id: uuidv4(),
            ...req.body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        tasks.push(newTask);
        req.app.locals.writeData(req.app.locals.DATA_FILES.tasks, tasks);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE task
router.put('/:id', (req, res) => {
    try {
        const tasks = req.app.locals.readData(req.app.locals.DATA_FILES.tasks);
        const index = tasks.findIndex(t => t.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }
        tasks[index] = {
            ...tasks[index],
            ...req.body,
            id: req.params.id,
            updatedAt: new Date().toISOString()
        };
        req.app.locals.writeData(req.app.locals.DATA_FILES.tasks, tasks);
        res.json(tasks[index]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE task status
router.patch('/:id/status', (req, res) => {
    try {
        const tasks = req.app.locals.readData(req.app.locals.DATA_FILES.tasks);
        const index = tasks.findIndex(t => t.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }
        tasks[index].status = req.body.status;
        tasks[index].updatedAt = new Date().toISOString();
        req.app.locals.writeData(req.app.locals.DATA_FILES.tasks, tasks);
        res.json(tasks[index]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// UPDATE task progress
router.patch('/:id/progress', (req, res) => {
    try {
        const tasks = req.app.locals.readData(req.app.locals.DATA_FILES.tasks);
        const index = tasks.findIndex(t => t.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }
        tasks[index].progress = req.body.progress;
        tasks[index].updatedAt = new Date().toISOString();
        req.app.locals.writeData(req.app.locals.DATA_FILES.tasks, tasks);
        res.json(tasks[index]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE task
router.delete('/:id', (req, res) => {
    try {
        const tasks = req.app.locals.readData(req.app.locals.DATA_FILES.tasks);
        const index = tasks.findIndex(t => t.id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const deletedTask = tasks.splice(index, 1)[0];
        req.app.locals.writeData(req.app.locals.DATA_FILES.tasks, tasks);
        res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
