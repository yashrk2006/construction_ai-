const mongoose = require('mongoose');

const safetyAlertSchema = new mongoose.Schema({
    timestamp: {
        type: String,
        default: () => new Date().toLocaleString()
    },
    type: {
        type: String,
        enum: ['PPE Violation', 'Unsafe Act', 'Hazard Detected'],
        required: true
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: String,
    location: String,
    reportedBy: String,
    resolved: {
        type: Boolean,
        default: false
    },
    resolvedAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('SafetyAlert', safetyAlertSchema);
