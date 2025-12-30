const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    unit: {
        type: String,
        required: true
    },
    reorderLevel: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: String,
        default: () => new Date().toLocaleDateString()
    },
    category: String,
    supplier: String,
    unitPrice: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
