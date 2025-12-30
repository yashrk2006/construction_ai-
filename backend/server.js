const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/buildsmart', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Import Routes
const tasksRoutes = require('./routes/tasks');
const workforceRoutes = require('./routes/workforce');
const materialsRoutes = require('./routes/materials');
const safetyRoutes = require('./routes/safety');
const reportsRoutes = require('./routes/reports');
const dashboardRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/workforce', workforceRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/safety', safetyRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'BuildSmart AI Backend is running',
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
});

module.exports = app;
