
import { Task, Material, WorkforceMember, User } from './types';

export const COLORS = {
  primary: '#FF9933',    // Saffron (Indian tricolor)
  secondary: '#138808',  // Green (Indian tricolor)
  dark: '#1A1A1A',       // Industrial Black
  danger: '#D32F2F',     // Hazard Red
  warning: '#FF9800',    // Caution Orange
  success: '#2E7D32',    // Progress Green
  info: '#0288D1',       // System Blue
  background: '#F4F4F4', // Concrete Gray
};

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Rajesh Kumar',
  email: 'rajesh.k@buildsmart.in',
  role: 'Project Manager',
  site: 'Mumbai Metro Line 3 - Phase II',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
};

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Foundation Reinforcement - Tower A',
    description: 'Ensure all steel bars are tied according to structural blueprints for the west wing foundation work.',
    assignedTo: 'Amit Shah',
    priority: 'High',
    deadline: '2025-01-15',
    status: 'In Progress',
    progress: 65,
  },
  {
    id: 't2',
    title: 'Electrical Conduit Installation',
    description: 'Install floor 3 conduits for primary data lines and emergency lighting systems.',
    assignedTo: 'Priya Sharma',
    priority: 'Medium',
    deadline: '2025-01-20',
    status: 'Pending',
    progress: 0,
  },
  {
    id: 't3',
    title: 'Concrete Pouring (Floor 4)',
    description: 'Coordinate with cement mixers for 08:00 start. Requires 12 workers on site.',
    assignedTo: 'Sunita Reddy',
    priority: 'High',
    deadline: '2025-01-12',
    status: 'Delayed',
    progress: 10,
  },
  {
    id: 't4',
    title: 'Site Safety Inspection',
    description: 'Weekly walk-through for IS 4014 compliance and equipment safety check.',
    assignedTo: 'Vikram Patel',
    priority: 'Low',
    deadline: '2025-01-10',
    status: 'Completed',
    progress: 100,
  }
];

export const MOCK_MATERIALS: Material[] = [
  { id: 'm1', itemName: 'ACC Cement Grade 53', quantity: 450, unit: 'Bags', reorderLevel: 100, lastUpdated: '2025-01-05' },
  { id: 'm2', itemName: 'Tata Steel Rebar 12mm', quantity: 15, unit: 'Tons', reorderLevel: 20, lastUpdated: '2025-01-04' },
  { id: 'm3', itemName: 'Safety Helmets (ISI Marked)', quantity: 85, unit: 'Pcs', reorderLevel: 20, lastUpdated: '2024-12-28' },
  { id: 'm4', itemName: 'PVC Conduit 2 inch', quantity: 1200, unit: 'Meters', reorderLevel: 300, lastUpdated: '2025-01-05' },
  { id: 'm5', itemName: 'TMT Bars 16mm', quantity: 8, unit: 'Tons', reorderLevel: 15, lastUpdated: '2025-01-03' },
];

export const MOCK_WORKFORCE: WorkforceMember[] = [
  { id: 'w1', name: 'Amit Shah', role: 'Steel Worker', attendanceStatus: 'Present', lastCheckIn: '07:45 AM', productivityScore: 92 },
  { id: 'w2', name: 'Vikram Patel', role: 'Safety Officer', attendanceStatus: 'Present', lastCheckIn: '08:00 AM', productivityScore: 98 },
  { id: 'w3', name: 'Priya Sharma', role: 'Electrician', attendanceStatus: 'Absent', lastCheckIn: '-', productivityScore: 0 },
  { id: 'w4', name: 'Sunita Reddy', role: 'Site Engineer', attendanceStatus: 'Late', lastCheckIn: '08:45 AM', productivityScore: 85 },
  { id: 'w5', name: 'Ramesh Kumar', role: 'Mason', attendanceStatus: 'Present', lastCheckIn: '07:30 AM', productivityScore: 88 },
  { id: 'w6', name: 'Kavita Singh', role: 'Supervisor', attendanceStatus: 'Present', lastCheckIn: '07:50 AM', productivityScore: 95 },
];

// Indian Construction Standards
export const INDIAN_STANDARDS = {
  safety: 'IS 4014:1967 - Code of Practice for General Construction',
  concrete: 'IS 456:2000 - Plain and Reinforced Concrete',
  steel: 'IS 2062:2011 - Steel for General Structural Purposes',
  electrical: 'IS 732:2019 - Code of Practice for Electrical Wiring',
};

// Indian Regulatory Bodies
export const REGULATORY_BODIES = [
  'Bureau of Indian Standards (BIS)',
  'Central Public Works Department (CPWD)',
  'Ministry of Labour & Employment',
  'Directorate General Factory Advice Service & Labour Institutes (DGFASLI)'
];
