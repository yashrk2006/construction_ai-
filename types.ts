
export type Role = 'Admin' | 'Project Manager' | 'Supervisor' | 'Worker';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  site: string;
  avatar?: string;
}

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Delayed';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: 'Low' | 'Medium' | 'High';
  deadline: string;
  status: TaskStatus;
  progress: number;
}

export interface Material {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  lastUpdated: string;
}

export interface WorkforceMember {
  id: string;
  name: string;
  role: string;
  attendanceStatus: 'Present' | 'Absent' | 'Late';
  lastCheckIn: string;
  productivityScore: number;
}

export interface SafetyAlert {
  id: string;
  timestamp: string;
  type: 'PPE Violation' | 'Unsafe Act' | 'Hazard Detected';
  severity: 'Low' | 'Medium' | 'High';
  description: string;
  imageUrl?: string;
}

export interface PredictionResult {
  delayDays: number;
  riskScore: number;
  reasoning: string;
}
