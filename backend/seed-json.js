const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, 'data');

// Create data directory
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}

// Sample tasks
const tasks = [
    {
        id: uuidv4(),
        title: 'Foundation Layout Verification',
        description: 'Verify foundation measurements against blueprints for Block A',
        assignedTo: 'Ramesh Singh',
        priority: 'High',
        deadline: '2024-01-15',
        status: 'In Progress',
        progress: 45,
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        title: 'Steel Reinforcement QA Check',
        description: 'Quality check for steel rebar installation - IS 456 compliance',
        assignedTo: 'Priya Sharma',
        priority: 'High',
        deadline: '2024-01-12',
        status: 'Pending',
        progress: 0,
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        title: 'Concrete Mix Testing',
        description: 'Test concrete mix ratio samples from today\'s batch',
        assignedTo: 'Amit Patel',
        priority: 'Medium',
        deadline: '2024-01-10',
        status: 'Completed',
        progress: 100,
        createdAt: new Date().toISOString()
    }
];

// Sample workforce
const workforce = [
    {
        id: uuidv4(),
        name: 'Ramesh Singh',
        role: 'Site Engineer',
        attendanceStatus: 'Present',
        lastCheckIn: '08:15 AM',
        productivityScore: 92,
        employeeId: 'EMP001',
        email: 'ramesh@buildsmart.in',
        phone: '+91-9876543210',
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        name: 'Priya Sharma',
        role: 'QA Inspector',
        attendanceStatus: 'Present',
        lastCheckIn: '08:30 AM',
        productivityScore: 88,
        employeeId: 'EMP002',
        email: 'priya@buildsmart.in',
        phone: '+91-9876543211',
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        name: 'Amit Patel',
        role: 'Mason Supervisor',
        attendanceStatus: 'Late',
        lastCheckIn: '09:45 AM',
        productivityScore: 85,
        employeeId: 'EMP003',
        email: 'amit@buildsmart.in',
        phone: '+91-9876543212',
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        name: 'Sunita Devi',
        role: 'Safety Officer',
        attendanceStatus: 'Present',
        lastCheckIn: '08:00 AM',
        productivityScore: 95,
        employeeId: 'EMP004',
        email: 'sunita@buildsmart.in',
        phone: '+91-9876543213',
        createdAt: new Date().toISOString()
    }
];

// Sample materials
const materials = [
    {
        id: uuidv4(),
        itemName: 'Portland Cement (ACC)',
        quantity: 450,
        unit: 'bags',
        reorderLevel: 200,
        category: 'Construction Materials',
        supplier: 'ACC Cement Ltd',
        unitPrice: 380,
        lastUpdated: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        itemName: 'Steel TMT Bars (Tata)',
        quantity: 85,
        unit: 'tons',
        reorderLevel: 50,
        category: 'Reinforcement',
        supplier: 'Tata Steel',
        unitPrice: 55000,
        lastUpdated: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        itemName: 'Bricks (Red Clay)',
        quantity: 15000,
        unit: 'pieces',
        reorderLevel: 10000,
        category: 'Masonry',
        supplier: 'Local Supplier',
        unitPrice: 8,
        lastUpdated: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        itemName: 'Sand (River)',
        quantity: 120,
        unit: 'cubic meters',
        reorderLevel: 80,
        category: 'Aggregates',
        supplier: 'Local Supplier',
        unitPrice: 1200,
        lastUpdated: new Date().toLocaleDateString(),
        createdAt: new Date().toISOString()
    }
];

// Sample safety alerts
const safety = [
    {
        id: uuidv4(),
        type: 'PPE Violation',
        severity: 'High',
        description: 'Worker spotted without safety helmet in Zone A',
        location: 'Zone A - Floor 3',
        reportedBy: 'Sunita Devi',
        resolved: false,
        timestamp: new Date().toLocaleString(),
        createdAt: new Date().toISOString()
    },
    {
        id: uuidv4(),
        type: 'Hazard Detected',
        severity: 'Medium',
        description: 'Loose scaffolding detected near east wing',
        location: 'East Wing',
        reportedBy: 'Ramesh Singh',
        resolved: true,
        resolvedAt: new Date().toISOString(),
        timestamp: new Date().toLocaleString(),
        createdAt: new Date().toISOString()
    }
];

// Write data to files
fs.writeFileSync(path.join(DATA_DIR, 'tasks.json'), JSON.stringify(tasks, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'workforce.json'), JSON.stringify(workforce, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'materials.json'), JSON.stringify(materials, null, 2));
fs.writeFileSync(path.join(DATA_DIR, 'safety.json'), JSON.stringify(safety, null, 2));

console.log('✅ Database seeded successfully!');
console.log(`📁 Data files created in: ${DATA_DIR}`);
console.log(`  - tasks.json (${tasks.length} items)`);
console.log(`  - workforce.json (${workforce.length} items)`);
console.log(`  - materials.json (${materials.length} items)`);
console.log(`  - safety.json (${safety.length} items)`);
