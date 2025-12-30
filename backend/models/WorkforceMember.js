const mongoose = require('mongoose');

const workforceMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    attendanceStatus: {
        type: String,
        enum: ['Present', 'Absent', 'Late'],
        default: 'Absent'
    },
    lastCheckIn: {
        type: String,
        default: 'N/A'
    },
    productivityScore: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    email: String,
    phone: String,
    employeeId: {
        type: String,
        unique: true
    },
    joiningDate: Date,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('WorkforceMember', workforceMemberSchema);
