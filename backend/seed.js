const mongoose = require('mongoose');
const Task = require('./models/Task');
const WorkforceMember = require('./models/WorkforceMember');
const Material = require('./models/Material');
const SafetyAlert = require('./models/SafetyAlert');
require('dotenv').config();

// Sample data
const sampleTasks = [
    {
        title: 'Foundation Layout Verification',
        description: 'Verify foundation measurements against blueprints for Block A',
        assignedTo: 'Ramesh Singh',
        priority: 'High',
        deadline: '2024-01-15',
        status: 'In Progress',
        progress: 45
    },
    {
        title: 'Steel Reinforcement QA Check',
        description: 'Quality check for steel rebar installation - IS 456 compliance',
        assignedTo: 'Priya Sharma',
        priority: 'High',
        deadline: '2024-01-12',
        status: 'Pending',
        progress: 0
    },
    {
        title: 'Concrete Mix Testing',
        description: 'Test concrete mix ratio samples from today\'s batch',
        assignedTo: 'Amit Patel',
        priority: 'Medium',
        deadline: '2024-01-10',
        status: 'Completed',
        progress: 100
    }
];

const sampleWorkforce = [
    {
        name: 'Ramesh Singh',
        role: 'Site Engineer',
        attendanceStatus: 'Present',
        lastCheckIn: '08:15 AM',
        productivityScore: 92,
        employeeId: 'EMP001',
        email: 'ramesh@buildsmart.in',
        phone: '+91-9876543210'
    },
    {
        name: 'Priya Sharma',
        role: 'QA Inspector',
        attendanceStatus: 'Present',
        lastCheckIn: '08:30 AM',
        productivityScore: 88,
        employeeId: 'EMP002',
        email: 'priya@buildsmart.in',
        phone: '+91-9876543211'
    },
    {
        name: 'Amit Patel',
        role: 'Mason Supervisor',
        attendanceStatus: 'Late',
        lastCheckIn: '09:45 AM',
        productivityScore: 85,
        employeeId: 'EMP003',
        email: 'amit@buildsmart.in',
        phone: '+91-9876543212'
    },
    {
        name: 'Sunita Devi',
        role: 'Safety Officer',
        attendanceStatus: 'Present',
        lastCheckIn: '08:00 AM',
        productivityScore: 95,
        employeeId: 'EMP004',
        email: 'sunita@buildsmart.in',
        phone: '+91-9876543213'
    }
];

const sampleMaterials = [
    {
        itemName: 'Portland Cement (ACC)',
        quantity: 450,
        unit: 'bags',
        reorderLevel: 200,
        category: 'Construction Materials',
        supplier: 'ACC Cement Ltd',
        unitPrice: 380
    },
    {
        itemName: 'Steel TMT Bars (Tata)',
        quantity: 85,
        unit: 'tons',
        reorderLevel: 50,
        category: 'Reinforcement',
        supplier: 'Tata Steel',
        unitPrice: 55000
    },
    {
        itemName: 'Bricks (Red Clay)',
        quantity: 15000,
        unit: 'pieces',
        reorderLevel: 10000,
        category: 'Masonry',
        supplier: 'Local Supplier',
        unitPrice: 8
    },
    {
        itemName: 'Sand (River)',
        quantity: 120,
        unit: 'cubic meters',
        reorderLevel: 80,
        category: 'Aggregates',
        supplier: 'Local Supplier',
        unitPrice: 1200
    }
];

const sampleSafetyAlerts = [
    {
        type: 'PPE Violation',
        severity: 'High',
        description: 'Worker spotted without safety helmet in Zone A',
        location: 'Zone A - Floor 3',
        reportedBy: 'Sunita Devi',
        resolved: false
    },
    {
        type: 'Hazard Detected',
        severity: 'Medium',
        description: 'Loose scaffolding detected near east wing',
        location: 'East Wing',
        reportedBy: 'Ramesh Singh',
        resolved: true,
        resolvedAt: new Date()
    }
];

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/buildsmart', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Task.deleteMany({});
        await WorkforceMember.deleteMany({});
        await Material.deleteMany({});
        await SafetyAlert.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // Insert sample data
        await Task.insertMany(sampleTasks);
        console.log('✅ Inserted sample tasks');

        await WorkforceMember.insertMany(sampleWorkforce);
        console.log('✅ Inserted sample workforce');

        await Material.insertMany(sampleMaterials);
        console.log('✅ Inserted sample materials');

        await SafetyAlert.insertMany(sampleSafetyAlerts);
        console.log('✅ Inserted sample safety alerts');

        console.log('\n🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
