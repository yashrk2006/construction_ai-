# 🚀 Vercel Deployment Guide for BuildSmart AI

## ⚠️ Current Issue: "Failed to Fetch" on Vercel

**Problem**: When deployed to Vercel, the app asks for local network access and shows "failed to fetch" errors.

**Root Cause**: The frontend on Vercel is trying to connect to `localhost:5000` which doesn't exist in production. The backend needs to be deployed separately.

---

## 📋 Deployment Strategy

### Architecture:
- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Render/Railway/Fly.io
- **Database**: MongoDB Atlas (cloud database)

---

## STEP 1: Deploy Backend to Render

### 1.1 Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### 1.2 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `yashrk2006/construction_ai-`
3. Configure the service:

```
Name: buildsmart-backend
Region: Singapore (or closest to you)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### 1.3 Add Environment Variables in Render

Click **"Environment"** and add:

```env
# MongoDB Connection (you'll configure this in Step 2)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/buildsmart

# JWT Secret
JWT_SECRET=your_super_secret_random_string_change_this

# Port (Render provides this automatically, but you can set it)
PORT=5000

# Node Environment
NODE_ENV=production
```

### 1.4 Deploy
- Click **"Create Web Service"**
- Wait for deployment (5-10 minutes)
- Copy your backend URL: `https://buildsmart-backend-xxxx.onrender.com`

---

## STEP 2: Setup MongoDB Atlas (Free Cloud Database)

### 2.1 Create MongoDB Atlas Account
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free

### 2.2 Create Cluster
1. Click **"Build a Database"**
2. Choose **"M0 Free"** tier
3. Select **AWS** and region closest to your Render deployment
4. Click **"Create"**

### 2.3 Create Database User
1. **Security** → **Database Access** → **Add New Database User**
2. Username: `buildsmart_admin`
3. Password: Generate a secure password (save it!)
4. Database User Privileges: **Read and write to any database**

### 2.4 Allow Network Access
1. **Security** → **Network Access** → **Add IP Address**
2. Click **"Allow Access from Anywhere"** (for development)
   - IP: `0.0.0.0/0`

### 2.5 Get Connection String
1. **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string:

```
mongodb+srv://buildsmart_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

4. Replace `<password>` with your actual password
5. Add database name before the `?`:

```
mongodb+srv://buildsmart_admin:yourPassword@cluster0.xxxxx.mongodb.net/buildsmart?retryWrites=true&w=majority
```

6. Go back to Render and update `MONGODB_URI` with this string

---

## STEP 3: Deploy Frontend to Vercel

### 3.1 Vercel Configuration

Create `vercel.json` in your project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3.2 Push to GitHub

```bash
git add vercel.json
git commit -m "Add Vercel configuration"
git push origin main
```

### 3.3 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your repository: `yashrk2006/construction_ai-`
4. Configure:

```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 3.4 Add Environment Variables in Vercel

Click **"Environment Variables"** and add:

```env
# Gemini API Key (from Google AI Studio)
VITE_GEMINI_API_KEY=AIzaSy... (your actual key)

# Backend API URL (from Render deployment)
VITE_API_URL=https://buildsmart-backend-xxxx.onrender.com/api

# App Environment
VITE_APP_ENV=production

# Feature Flags
VITE_ENABLE_DEMO_MODE=false
VITE_ENABLE_AI_FEATURES=true
```

**CRITICAL**: Make sure to use your **deployed backend URL** from Render, NOT `http://localhost:5000`!

### 3.5 Deploy
- Click **"Deploy"**
- Wait for deployment (2-3 minutes)
- Your app will be live at: `https://your-project-name.vercel.app`

---

## STEP 4: Configure CORS on Backend

Update `backend/server.js` to allow Vercel domain:

```javascript
const cors = require('cors');

// Add your Vercel domain
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-project-name.vercel.app',  // Replace with your Vercel URL
  'https://your-custom-domain.com'         // If you have a custom domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

Push this change and Render will auto-redeploy.

---

## STEP 5: Test Production Deployment

### 5.1 Test Backend
Visit: `https://buildsmart-backend-xxxx.onrender.com/api/health`

Should return:
```json
{
  "status": "ok",
  "message": "BuildSmart AI Backend is running"
}
```

### 5.2 Test Frontend
1. Visit your Vercel URL: `https://your-project-name.vercel.app`
2. Login as Admin
3. Check if:
   - Dashboard loads correctly
   - AI Site Intel shows predictions
   - No "failed to fetch" errors
   - Charts display properly

---

## 🐛 Troubleshooting Vercel Issues

### Issue 1: "Failed to Fetch" after clicking role
**Cause**: Frontend trying to connect to localhost:5000

**Solution**:
1. Verify `VITE_API_URL` in Vercel environment variables points to your Render backend
2. Redeploy on Vercel after changing env vars
3. Check browser console for the actual API URL being called

### Issue 2: "Local network access" request
**Cause**: Browser security blocking localhost connections from production site

**Solution**:
- This confirms the app is trying to reach `localhost:5000`
- Update `VITE_API_URL` in Vercel to use the Render URL
- Redeploy

### Issue 3: CORS errors in production
**Cause**: Backend not allowing Vercel domain

**Solution**:
1. Add your Vercel URL to `allowedOrigins` in `backend/server.js`
2. Push to GitHub
3. Render will auto-redeploy

### Issue 4: MongoDB connection fails
**Cause**: Connection string incorrect or network access not configured

**Solution**:
1. Double-check `MONGODB_URI` in Render matches Atlas connection string
2. Verify password is correct (no special characters unescaped)
3. Ensure `0.0.0.0/0` is in Network Access on MongoDB Atlas

### Issue 5: Gemini API not working in production
**Cause**: API key not set in Vercel environment variables

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `VITE_GEMINI_API_KEY` with your key
3. Redeploy (Vercel → Deployments → ⋯ → Redeploy)

---

## 📊 Architecture Diagram

```
┌─────────────────────┐
│   User's Browser    │
└──────────┬──────────┘
           │
           ├─────────────────────────────┐
           │                             │
    ┌──────▼────────┐           ┌───────▼────────┐
    │  Vercel       │   API     │  Render        │
    │  (Frontend)   │  Calls    │  (Backend)     │
    │               │◄─────────►│                │
    │  - React      │           │  - Express     │
    │  - Dashboard  │           │  - REST API    │
    │  - Charts     │           │  - Auth        │
    └───────────────┘           └────────┬───────┘
                                         │
                                         │ MongoDB
                                         │ Driver
                                         │
                                ┌────────▼────────┐
                                │  MongoDB Atlas  │
                                │  (Database)     │
                                │                 │
                                │  - Users        │
                                │  - Tasks        │
                                │  - Materials    │
                                └─────────────────┘

External APIs:
┌────────────────────┐
│  Google Gemini AI  │◄── Called from Frontend
│  (AI Predictions)  │    (via VITE_GEMINI_API_KEY)
└────────────────────┘
```

---

## ✅ Deployment Checklist

**Backend (Render)**:
- [ ] Web service created and deployed
- [ ] `MONGODB_URI` configured with Atlas connection string
- [ ] `JWT_SECRET` set to secure random string
- [ ] Backend URL copied (e.g., `https://buildsmart-backend-xxxx.onrender.com`)
- [ ] Health endpoint working (`/api/health`)

**Database (MongoDB Atlas)**:
- [ ] Free cluster created
- [ ] Database user created with password saved
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied and tested

**Frontend (Vercel)**:
- [ ] Repository connected
- [ ] `VITE_API_URL` set to Render backend URL (NOT localhost)
- [ ] `VITE_GEMINI_API_KEY` configured
- [ ] Build succeeds
- [ ] Site loads without errors
- [ ] Login works
- [ ] Dashboard displays correctly
- [ ] No "failed to fetch" errors

**CORS**:
- [ ] Vercel URL added to `allowedOrigins` in backend
- [ ] Backend redeployed with CORS configuration

---

## 💡 Pro Tips

1. **Free Tier Limitations**:
   - Render Free: Spins down after 15 minutes of inactivity (first request takes 30-60 seconds)
   - MongoDB Atlas Free: 512MB storage
   - Vercel Free: 100GB bandwidth/month

2. **Custom Domain** (Optional):
   - Buy domain from Namecheap/Google Domains
   - Add to Vercel: Settings → Domains
   - Add to Render backend CORS origins

3. **Environment Variables**:
   - NEVER commit `.env` or `.env.local` to GitHub
   - Set all env vars in Vercel/Render dashboards
   - Redeploy after changing env vars

4. **Monitoring**:
   - Render: View logs in real-time from dashboard
   - Vercel: Check Function logs and Runtime logs
   - MongoDB Atlas: Monitor connections and queries

---

## 🔗 Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Google AI Studio** (Get Gemini API key): https://makersuite.google.com/app/apikey

---

**Last Updated**: 2025-12-30  
**Status**: Ready for Production Deployment
