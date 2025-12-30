// @ts-nocheck
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle API requests
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'API request failed');
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Tasks API
export const tasksAPI = {
    getAll: () => apiRequest('/tasks'),
    getById: (id) => apiRequest(`/tasks/${id}`),
    create: (task) => apiRequest('/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
    }),
    update: (id, task) => apiRequest(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(task),
    }),
    updateStatus: (id, status) => apiRequest(`/tasks/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    }),
    updateProgress: (id, progress) => apiRequest(`/tasks/${id}/progress`, {
        method: 'PATCH',
        body: JSON.stringify({ progress }),
    }),
    delete: (id) => apiRequest(`/tasks/${id}`, { method: 'DELETE' }),
};

// Workforce API
export const workforceAPI = {
    getAll: () => apiRequest('/workforce'),
    getById: (id) => apiRequest(`/workforce/${id}`),
    create: (member) => apiRequest('/workforce', {
        method: 'POST',
        body: JSON.stringify(member),
    }),
    update: (id, member) => apiRequest(`/workforce/${id}`, {
        method: 'PUT',
        body: JSON.stringify(member),
    }),
    checkIn: (id) => apiRequest(`/workforce/${id}/checkin`, { method: 'POST' }),
    updateAttendance: (id, status) => apiRequest(`/workforce/${id}/attendance`, {
        method: 'PATCH',
        body: JSON.stringify({ attendanceStatus: status }),
    }),
    updateProductivity: (id, score) => apiRequest(`/workforce/${id}/productivity`, {
        method: 'PATCH',
        body: JSON.stringify({ productivityScore: score }),
    }),
    delete: (id) => apiRequest(`/workforce/${id}`, { method: 'DELETE' }),
    getStats: () => apiRequest('/workforce/stats/attendance'),
};

// Materials API
export const materialsAPI = {
    getAll: () => apiRequest('/materials'),
    getById: (id) => apiRequest(`/materials/${id}`),
    create: (material) => apiRequest('/materials', {
        method: 'POST',
        body: JSON.stringify(material),
    }),
    update: (id, material) => apiRequest(`/materials/${id}`, {
        method: 'PUT',
        body: JSON.stringify(material),
    }),
    updateQuantity: (id, quantity) => apiRequest(`/materials/${id}/quantity`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity }),
    }),
    getLowStock: () => apiRequest('/materials/alerts/lowstock'),
    delete: (id) => apiRequest(`/materials/${id}`, { method: 'DELETE' }),
};

// Safety API
export const safetyAPI = {
    getAll: () => apiRequest('/safety'),
    getUnresolved: () => apiRequest('/safety/unresolved'),
    getById: (id) => apiRequest(`/safety/${id}`),
    create: (alert: any) => apiRequest('/safety', {
        method: 'POST',
        body: JSON.stringify(alert),
    }),
    update: (id, alert) => apiRequest(`/safety/${id}`, {
        method: 'PUT',
        body: JSON.stringify(alert),
    }),
    resolve: (id) => apiRequest(`/safety/${id}/resolve`, { method: 'PATCH' }),
    delete: (id) => apiRequest(`/safety/${id}`, { method: 'DELETE' }),
    getStats: () => apiRequest('/safety/stats/summary'),
};

// Dashboard API
export const dashboardAPI = {
    getSummary: () => apiRequest('/dashboard/summary'),
};

// Reports API
export const reportsAPI = {
    getAll: () => apiRequest('/reports'),
    create: (report) => apiRequest('/reports', {
        method: 'POST',
        body: JSON.stringify(report),
    }),
};

// Health Check
export const healthCheck = () => apiRequest('/health');
