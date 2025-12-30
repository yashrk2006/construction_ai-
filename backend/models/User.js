const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false // Don't return password by default
    },
    role: {
        type: String,
        enum: ['Admin', 'Project Manager', 'Supervisor', 'Worker'],
        default: 'Worker'
    },
    site: {
        type: String,
        default: 'Mumbai Metro Line 3 - Phase II'
    },
    avatar: {
        type: String,
        default: null
    },
    permissions: [{
        type: String
    }],
    employeeId: {
        type: String,
        unique: true,
        sparse: true
    },
    department: {
        type: String,
        default: 'Construction'
    },
    phone: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    },
    metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        }
    }
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw error;
    }
};

// Method to get safe user object (without password)
userSchema.methods.toSafeObject = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

// Static method to get default permissions for role
userSchema.statics.getDefaultPermissions = function (role) {
    const permissionsMap = {
        'Admin': [
            'view_budget',
            'manage_users',
            'approve_tasks',
            'view_all_tasks',
            'view_reports',
            'view_safety',
            'technical_review',
            'assign_tasks',
            'manage_materials',
            'manage_workforce',
            'system_settings'
        ],
        'Project Manager': [
            'view_budget',
            'approve_tasks',
            'view_all_tasks',
            'view_reports',
            'view_safety',
            'assign_tasks',
            'manage_materials',
            'manage_workforce'
        ],
        'Supervisor': [
            'assign_tasks',
            'view_all_tasks',
            'view_safety',
            'upload_photos',
            'manage_workforce'
        ],
        'Worker': [
            'view_safety',
            'upload_photos',
            'view_my_tasks'
        ]
    };

    return permissionsMap[role] || [];
};

// Virtual for full name display
userSchema.virtual('displayName').get(function () {
    return this.name;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
