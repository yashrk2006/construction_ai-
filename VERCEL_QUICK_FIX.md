# ⚡ Quick Vercel Setup Instructions

## 🎯 Fix "Failed to Fetch" Error - 3 Steps

### Step 1️⃣: Set Environment Variables in Vercel

1. Go to: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add this variable:

```
Name:  VITE_ENABLE_DEMO_MODE
Value: true
```

Click **Save**.

---

### Step 2️⃣: Redeploy

1. Go to **Deployments** tab
2. Click the ⋯ (three dots) on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes

---

### Step 3️⃣: Test

1. Open your Vercel URL: `https://your-project.vercel.app`
2. Click any role (Admin, Manager, etc.)
3. ✅ Should load dashboard WITHOUT "Failed to Fetch" error!

---

## 🎨 What Changed?

**Before**: Frontend tried to connect to `localhost:5000` → Failed  
**After**: Frontend uses local demo data → Works perfectly!

---

## 📱 What Works Now?

✅ Login with any role  
✅ Dashboard with mock data  
✅ All navigation and UI  
✅ Role-based access control  
✅ Charts and visualizations  
✅ Responsive mobile design  

All without needing a backend server!

---

## 🚨 Still Getting Errors?

1. **Clear browser cache** (Ctrl + Shift + R)
2. **Check environment variable** is exactly: `VITE_ENABLE_DEMO_MODE` = `true`
3. **Make sure you redeployed** after adding the variable
4. Open browser console (F12) - should see: "Backend unavailable, using frontend-only demo mode"

---

## 📚 More Details

See `VERCEL_FRONTEND_ONLY_GUIDE.md` for complete documentation.

---

**Quick Support**: Check that Vercel environment variable is `true` (not `"true"` with quotes)
