# 🚀 BuildSmart AI - Quick Start Guide

## Production-Grade Setup Instructions

### Prerequisites
- Node.js 18+ installed
- MongoDB running (local or cloud)
- Git installed

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
copy .env.example .env

# Edit .env with your settings (optional, defaults work for demo)
# JWT_SECRET=your_secure_secret_key
# MONGODB_URI=mongodb://localhost:27017/buildsmart
# PORT=5000

# Start the backend server
npm start
```

The backend will start on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to project root
cd ..

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 3. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 🎯 Demo Login

The system supports **instant demo access** with 4 different roles:

### 1. **Admin** (Rajesh Kumar)
- **Email**: rajesh@buildsmart.in
- **Password**: demo123
- **Access**: Full system control, executive analytics, user management

### 2. **Project Manager** (Priya Sharma)
- **Email**: priya@buildsmart.in
- **Password**: demo123
- **Access**: Project planning, resource management, team analytics

### 3. **Supervisor** (Amit Patel)
- **Email**: amit@buildsmart.in
- **Password**: demo123
- **Access**: Team coordination, task assignment, safety checks

### 4. **Worker** (Ramesh Singh)
- **Email**: ramesh@buildsmart.in
- **Password**: demo123
- **Access**: Personal tasks, attendance, safety alerts

## 🔐 Authentication Modes

### Demo Mode (Quick Start)
1. Select "Demo Login" tab
2. Click on any role card
3. Instantly access that role's dashboard

### Credential Mode (Production)
1. Select "Email & Password" tab
2. Enter email and password
3. Or use any demo user credentials above

## 🎨 What to Expect

Each role sees a **completely different dashboard**:

### Admin Dashboard Features:
- Executive KPIs and metrics
- Budget overview with visualizations
- System-wide analytics
- User management panel
- Audit logs
- Advanced reporting

### Project Manager Dashboard Features:
- Project planning interface
- Resource allocation charts
- Team productivity analytics
- Material management
- Progress tracking
- Report generation tools

### Supervisor Dashboard Features:
- Team status board
- Daily task list
- Attendance tracking
- Safety checklist
- Progress monitoring
- Photo upload

### Worker Dashboard Features:
- My assigned tasks
- Check-in/check-out
- Progress updates
- Safety alert submission
- Material requests
- Simplified, mobile-friendly UI

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Redux Toolkit + Redux Persist
- **Backend**: Express.js + Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Authorization**: Role-Based Access Control (RBAC)
- **Charts**: Recharts
- **Styling**: Tailwind-like utility CSS

## 🔧 Configuration

### MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod --dbpath /path/to/data

# Backend will auto-create database and collections
```

**Option 2: MongoDB Atlas (Cloud)**
```bash
# 1. Create free account at mongodb.com/cloud/atlas
# 2. Create cluster
# 3. Get connection string
# 4. Update backend/.env:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buildsmart
```

### Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/buildsmart
JWT_SECRET=buildsmart_secure_key_2024
JWT_EXPIRY=7d
```

**Frontend** (`.env.local`):
```env
VITE_API_URL=http://localhost:5000/api
```

## 📦 Package Installation

If you encounter any issues:

```bash
# Backend dependencies
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend dependencies
cd ..
rm -rf node_modules package-lock.json
npm install
```

## 🐛 Troubleshooting

### Backend won't start
- **MongoDB not running**: Start MongoDB service
- **Port 5000 in use**: Change `PORT` in `backend/.env`
- **Missing dependencies**: Run `npm install` in backend folder

### Frontend won't start
- **Port 5173 in use**: Vite will auto-select another port
- **Missing dependencies**: Run `npm install` in root folder
- **Build errors**: Clear `.cache` and `dist` folders

### Authentication issues
- **Can't login**: Ensure backend is running on port 5000
- **CORS errors**: Backend CORS is enabled, check API_URL
- **Token expired**: Tokens expire after 7 days, re-login

### Database issues
- **Connection failed**: Check MongoDB is running
- **Collections not created**: Backend auto-creates on first run
- **Data not persisting**: Check MongoDB connection string

## 🎯 Testing the System

### Test Different Roles
1. Login as Admin - See executive dashboard
2. Logout (top-right profile icon)
3. Login as Project Manager - See management dashboard
4. Repeat for Supervisor and Worker roles
5. Notice each role has different features and access

### Test Permissions
- Try accessing restricted features
- Features you can't access won't be visible
- Backend enforces all permissions server-side

### Test Authentication
- Refresh browser - Session persists
- Clear localStorage - Redirects to login
- Close and reopen browser - Session maintained
- Wait for token expiry (7 days) - Auto logout

## 🚀 Production Deployment

### Backend Deployment (Render/Heroku/Railway)
```bash
# Set environment variables:
PORT=5000
MONGODB_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<strong_random_secret>
JWT_EXPIRY=7d

# Deploy command:
npm start
```

### Frontend Deployment (Vercel/Netlify)
```bash
# Set environment variable:
VITE_API_URL=<your_backend_url>/api

# Build command:
npm run build

# Output directory:
dist
```

## 📚 Additional Resources

- **Full Documentation**: See `RBAC_SYSTEM_DOCUMENTATION.md`
- **Architecture Guide**: See documentation for system design
- **API Reference**: Backend routes documented in code
- **Security Guide**: See documentation for security features

## 💡 Tips

1. **Demo Mode**: Perfect for showcasing different role experiences
2. **Mobile Testing**: Worker dashboard is mobile-optimized
3. **Real Users**: Use credential mode with proper accounts
4. **Permissions**: Customize in `services/rbac.ts` and `models/User.js`
5. **Branding**: Update colors and icons in dashboard components

## ✅ Verification Checklist

- [ ] Backend starts without errors
- [ ] MongoDB connection successful
- [ ] Frontend builds and runs
- [ ] Can login with demo users
- [ ] Each role shows different dashboard
- [ ] Navigation items filtered by role
- [ ] Logout works correctly
- [ ] Session persists after refresh
- [ ] API calls include JWT token
- [ ] Permissions checked server-side

## 🎉 Success!

You now have a **production-grade, role-based construction management system** running locally!

**Key Features Enabled:**
✅ Secure JWT authentication  
✅ Role-based dashboards  
✅ Permission-based access control  
✅ Session persistence  
✅ Mobile-responsive design  
✅ AI-powered insights  
✅ Real-time data management  

---

**Need Help?** Check the troubleshooting section or documentation.  
**Ready for Production?** Follow the deployment guide.
