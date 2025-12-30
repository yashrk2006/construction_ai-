const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// JSON File Storage Setup
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILES = {
    tasks: path.join(DATA_DIR, 'tasks.json'),
    workforce: path.join(DATA_DIR, 'workforce.json'),
    materials: path.join(DATA_DIR, 'materials.json'),
    safety: path.join(DATA_DIR, 'safety.json'),
};

// Create data directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Initialize data files with empty arrays if they don't exist
Object.values(DATA_FILES).forEach(file => {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify([]), 'utf8');
    }
});

// Helper functions for JSON file operations
const readData = (file) => {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
};

// Import Routes (we'll update these to use JSON files)
const tasksRoutes = require('./routes/tasks-json');
const workforceRoutes = require('./routes/workforce-json');
const materialsRoutes = require('./routes/materials-json');
const safetyRoutes = require('./routes/safety-json');
const dashboardRoutes = require('./routes/dashboard-json');

// Make data functions available to routes
app.locals.readData = readData;
app.locals.writeData = writeData;
app.locals.DATA_FILES = DATA_FILES;

// Use Routes
app.use('/api/tasks', tasksRoutes);
app.use('/api/workforce', workforceRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/safety', safetyRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Reports endpoint (simple)
app.get('/api/reports', (req, res) => {
    res.json({ message: 'Reports endpoint', reports: [] });
});

app.post('/api/reports', (req, res) => {
    res.status(201).json({ message: 'Report created', report: req.body });
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'BuildSmart AI Backend is running (JSON File Storage)',
        timestamp: new Date().toISOString()
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 BuildSmart AI Backend running on port ${PORT}`);
    console.log(`📡 API URL: http://localhost:${PORT}/api`);
    console.log(`💾 Using JSON File Storage (No MongoDB required)`);
});

module.exports = app;
