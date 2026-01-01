# 🤖 AI Features Setup Guide

## Current Status: ⚠️ AI Not Working

**Issue**: Gemini API returning 403 Forbidden error
**Cause**: Invalid or missing `VITE_GEMINI_API_KEY` in `.env.local`

---

## 🔧 Fix Steps

### Step 1: Get Your Gemini API Key

1. **Open Google AI Studio**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. Click **"Create API Key"**
4. **Copy** the generated API key (starts with `AIzaSy...`)

⚠️ **IMPORTANT**: Keep this key secure and never commit it to GitHub!

### Step 2: Update Your .env.local File

1. Open the file: `.env.local` (in the root directory)
2. Find the line: `VITE_GEMINI_API_KEY=your_api_key_here`
3. Replace `your_api_key_here` with your actual API key:

```env
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Example of a complete `.env.local` file:**
```env
# Google Gemini API Key
VITE_GEMINI_API_KEY=AIzaSyABcDeFgHiJkLmNoPqRsTuVwXyZ1234567

# Backend API URL
VITE_API_URL=http://localhost:5000/api

# App Environment
VITE_APP_ENV=development

# Feature Flags
VITE_ENABLE_DEMO_MODE=true
VITE_ENABLE_AI_FEATURES=true
```

### Step 3: Restart the Development Server

After updating `.env.local`, you MUST restart the dev server:

**In Terminal 1 (Frontend):**
```powershell
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

**In Terminal 2 (Backend):**
```powershell
# Stop the current server (Ctrl+C)
# Then restart:
cd backend
npm start
```

### Step 4: Verify AI is Working

1. **Refresh** the browser at http://localhost:3000
2. **Login as Admin** (Rajesh Kumar)
3. **Check the AI Site Intel widget** - it should now show:
   - A non-zero delay prediction (e.g., "+2 DAYS")
   - A risk score percentage (e.g., "45%")
   - Actual reasoning text instead of "service unavailable"

---

## 🎯 AI Features in the App

Once configured, these AI features will work:

### 1. **Dashboard - AI Site Intel Widget**
- **Location**: Right sidebar of dashboard
- **Function**: Predicts project delays based on:
  - Pending tasks
  - Low inventory materials
  - Weather conditions
  - Task priorities
- **Output**: Delay in days + Risk Score + Reasoning

### 2. **Safety AI Page** (Future)
- **Location**: Safety AI menu item
- **Function**: Analyzes construction site images for:
  - PPE compliance (helmets, vests, boots)
  - Unsafe acts
  - Hazardous conditions
- **Output**: Compliance score + Violations list

### 3. **Reports - AI Summary** (Future)
- **Function**: Generates professional project summaries
- **Output**: Daily stakeholder report with progress and outlook

---

## ✅ Verification Checklist

- [ ] API key obtained from Google AI Studio
- [ ] `.env.local` file updated with valid key
- [ ] Frontend server restarted (`npm run dev`)
- [ ] Backend server restarted (`npm start`)
- [ ] Browser refreshed (hard refresh: Ctrl+Shift+R)
- [ ] AI Site Intel shows actual prediction (not "0 DAYS")
- [ ] No console errors about "API key" or "403 Forbidden"

---

## 🐛 Troubleshooting

### Issue: Still showing "0 DAYS" after setup
**Solution**: 
1. Check browser console (F12) for errors
2. Verify the API key has no extra spaces
3. Make sure you're using `VITE_` prefix (not just `GEMINI_API_KEY`)
4. Clear browser cache and hard reload (Ctrl+Shift+R)

### Issue: Console shows "API key not found"
**Solution**: 
1. Ensure the file is named exactly `.env.local` (not `.env`)
2. File must be in the **root directory** (same level as `package.json`)
3. Restart the dev server after any changes

### Issue: 403 Forbidden error persists
**Solution**: 
1. Generate a new API key (old one might be invalid)
2. Check your Google Cloud billing is enabled
3. Verify Gemini API is enabled in your Google Cloud project

### Issue: API quota exceeded
**Solution**: 
1. Check your usage at: https://console.cloud.google.com/
2. Gemini free tier: 60 requests/minute
3. Wait for quota to reset or upgrade plan

---

## 📊 Expected AI Behavior

**When Working Correctly:**
```javascript
// Dashboard will show something like:
{
  delayDays: 2,
  riskScore: 45,
  reasoning: "3 high-priority tasks are delayed. Low inventory on steel reinforcement may cause work stoppage. Monsoon weather expected for 5 days will impact outdoor concrete work. Recommended mitigation: expedite material orders and reschedule outdoor tasks."
}
```

**Current Broken State:**
```javascript
// Currently showing:
{
  delayDays: 0,
  riskScore: 0,
  reasoning: "Prediction service unavailable. Please try again later."
}
```

---

## 🔐 Security Notes

- **NEVER** commit `.env.local` to git (it's already in `.gitignore`)
- **NEVER** share your API key publicly
- **Rotate** keys if accidentally exposed
- Consider using environment-specific keys for production

---

## 📞 Need Help?

If you're still experiencing issues:
1. Check the console logs in browser (F12)
2. Check the terminal output for server errors
3. Verify your network connection
4. Test the API key at: https://aistudio.google.com/

---

**Last Updated**: 2025-12-30
**Status**: Awaiting API Key Configuration
