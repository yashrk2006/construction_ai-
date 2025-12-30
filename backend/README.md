# BuildSmart AI Backend

Complete backend API for the BuildSmart AI Construction Management System.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

**Option A: If you have MongoDB installed locally:**
```bash
mongod
```

**Option B: Use MongoDB Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option C: Use MongoDB Atlas (Cloud):**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 4. Seed the Database (Optional)
```bash
node seed.js
```

### 5. Start the Server
```bash
npm run dev
```

Server will start on: **http://localhost:5000**

## 📡 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status
- `PATCH /api/tasks/:id/progress` - Update task progress
- `DELETE /api/tasks/:id` - Delete task

### Workforce
- `GET /api/workforce` - Get all workforce members
- `GET /api/workforce/:id` - Get member by ID
- `POST /api/workforce` - Register new member
- `PUT /api/workforce/:id` - Update member
- `POST /api/workforce/:id/checkin` - Mark attendance (check-in)
- `PATCH /api/workforce/:id/attendance` - Update attendance status
- `PATCH /api/workforce/:id/productivity` - Update productivity score
- `DELETE /api/workforce/:id` - Delete member
- `GET /api/workforce/stats/attendance` - Get attendance statistics

### Materials
- `GET /api/materials` - Get all materials
- `GET /api/materials/:id` - Get material by ID
- `POST /api/materials` - Add new material
- `PUT /api/materials/:id` - Update material
- `PATCH /api/materials/:id/quantity` - Update quantity
- `GET /api/materials/alerts/lowstock` - Get low stock alerts
- `DELETE /api/materials/:id` - Delete material

### Safety
- `GET /api/safety` - Get all safety alerts
- `GET /api/safety/unresolved` - Get unresolved alerts
- `GET /api/safety/:id` - Get alert by ID
- `POST /api/safety` - Create safety alert
- `PUT /api/safety/:id` - Update alert
- `PATCH /api/safety/:id/resolve` - Resolve alert
- `DELETE /api/safety/:id` - Delete alert
- `GET /api/safety/stats/summary` - Get safety statistics

### Dashboard
- `GET /api/dashboard/summary` - Get dashboard summary stats

### Health Check
- `GET /api/health` - Check if server is running

## 🗄️ Database Schema

### Task
- title, description, assignedTo
- priority (Low/Medium/High)
- status (Pending/In Progress/Completed/Delayed)
- progress (0-100)
- deadline

### WorkforceMember
- name, role, email, phone
- attendanceStatus (Present/Absent/Late)
- lastCheckIn
- productivityScore (0-100)
- employeeId

### Material
- itemName, quantity, unit
- reorderLevel
- category, supplier, unitPrice

### SafetyAlert
- type, severity, description
- timestamp, location
- resolved (boolean)
- imageUrl

## 🔧 Tech Stack
- Node.js + Express
- MongoDB + Mongoose
- CORS enabled for frontend integration
- RESTful API design

## 📝 Notes
- All routes return JSON
- Timestamps are automatically added to all records
- Error handling included on all endpoints
