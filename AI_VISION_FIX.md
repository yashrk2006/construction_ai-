# 🔧 AI Vision Inspector Fix - Troubleshooting Guide

## Issue: "AI Inference Error" on Image Upload

### ✅ What Was Fixed

1. **Changed AI Model**:
   - ❌ Old: `gemini-2.0-flash-exp` (experimental, unstable)
   - ✅ New: `gemini-1.5-flash` (stable, vision-capable)

2. **Enhanced Error Handling**:
   - Better error messages
   - Detailed console logging
   - Fallback responses

3. **Improved Image Processing**:
   - Better MIME type handling
   - Enhanced JSON parsing
   - Graceful failure modes

---

## 🧪 How to Test the Fix

### Step 1: Restart Dev Server
```bash
# Stop current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### Step 2: Clear Browser Cache
1. Press `F12` (open DevTools)
2. Right-click on refresh button
3. Select "Empty Cache and Hard Reload"

### Step 3: Test Safety AI
1. Go to **Safety AI** page
2. Click **"Upload Site Capture"**
3. Upload a construction site image
4. **Open Console (F12)** to see detailed logs

### Expected Console Output:
```
🔍 Starting safety analysis...
📤 Sending request to Gemini API...
📥 Received response from Gemini API
Raw response: { ... }
✅ Successfully parsed response: { complianceScore: 85, ... }
```

---

## 🔍 Debugging Steps

### Check 1: Verify API Key
```bash
# In project root, run:
type .env.local
```

Should show:
```
VITE_GEMINI_API_KEY=AIzaSyD4fKTP7gPWdAOZDoeQ9pno3TXc7E1-VEs
```

### Check 2: Browser Console
Press `F12` and look for:
- ✅ `API key loaded successfully`
- ❌ `No API key found` → API key issue
- ❌ `Invalid API key` → Wrong API key
- ❌ `quota exceeded` → API quota issue

### Check 3: Network Tab
1. Open DevTools (F12)
2. Go to **Network** tab
3. Upload an image
4. Look for request to `generativelanguage.googleapis.com`
5. Check response:
   - ✅ Status 200 → Success
   - ❌ Status 400 → Bad request
   - ❌ Status 401 → API key invalid
   - ❌ Status 429 → Rate limit exceeded

---

## 🚨 Common Issues & Solutions

### Issue 1: "Invalid API Key"
**Solution**:
1. Go to https://makersuite.google.com/app/apikey
2. Create a NEW API key
3. Copy it
4. Edit `.env.local`:
   ```
   VITE_GEMINI_API_KEY=your_new_api_key_here
   ```
5. Restart dev server

### Issue 2: "Quota Exceeded"
**Solution**:
- You've hit the free tier limit
- Wait 24 hours, OR
- Upgrade your Gemini API plan
- Check usage at: https://console.cloud.google.com/

### Issue 3: "Model Not Available"
**Solution**:
- Already fixed! Now using `gemini-1.5-flash`
- This model is stable and widely available

### Issue 4: Image Not Uploading
**Solution**:
1. Check image size (< 4MB)
2. Use JPEG or PNG format
3. Check file permissions

### Issue 5: Still Getting Errors
**Solution**:
```bash
# Complete reset:
1. Delete node_modules
   rm -rf node_modules

2. Clear npm cache
   npm cache clean --force

3. Reinstall
   npm install

4. Restart
   npm run dev
```

---

## 📝 Detailed Error Messages

### Error: "Failed to get API key"
**Cause**: Environment variable not loaded
**Fix**: 
1. Ensure `.env.local` exists
2. Check variable name is `VITE_GEMINI_API_KEY` (exact)
3. Restart dev server

### Error: "AI response was received but couldn't be parsed"
**Cause**: Gemini returned text instead of JSON
**Fix**: This is handled automatically now with fallback
**Impact**: Analysis still works, just with partial results

### Error: "Image analysis completed with partial results"
**Cause**: Response format unexpected
**Fix**: Already handled! You'll get a fallback response
**Impact**: You get some results instead of complete failure

---

## �� Testing with Different Images

### Good Test Images:
1. **Construction worker with helmet** → Should show high compliance
2. **Construction site, no PPE** → Should flag violations
3. **Empty construction site** → Should return clean score

### What to Expect:
```json
{
  "complianceScore": 85,
  "violations": [
    {
      "type": "Missing High-Visibility Vest",
      "description": "Worker visible without safety vest",
      "severity": "High"
    }
  ],
  "summary": "Overall safety compliance is good, but PPE violations detected."
}
```

---

## 🔄 If Still Not Working

### Option 1: Test with Simple API Call
1. Open browser console
2. Run this test:
```javascript
fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{
      parts: [{ text: 'say hi' }]
    }]
  })
})
.then(r => r.json())
.then(console.log)
```

### Option 2: Use test-api.ts
```bash
# Run the API test file
npm run dev
# Then in browser console, import and run test-api.ts
```

### Option 3: Check Gemini API Status
Visit: https://status.cloud.google.com/
Look for "Vertex AI API" status

---

## ✅ Verification Checklist

After applying the fix:

- [ ] Dev server restarted
- [ ] Browser cache cleared
- [ ] `.env.local` has correct API key
- [ ] Console shows "API key loaded successfully"
- [ ] Can upload image without error
- [ ] Results appear within 5 seconds
- [ ] Console shows detailed logs
- [ ] No red errors in console

---

## 📊 Expected Performance

| Action | Time | Status |
|--------|------|--------|
| Upload image | < 1 sec | Should be instant |
| API processing | 3-5 sec | Normal |
| Display results | < 1 sec | Should be instant |
| **Total** | **4-6 sec** | ✅ Normal |

If taking > 10 seconds → Check internet connection

---

## 🆘 Still Having Issues?

### Collect Debug Info:
1. Open Console (F12)
2. Upload an image
3. Copy ALL console logs
4. Check Network tab for failed requests
5. Screenshot any errors

### Check These:
- [ ] Internet connection working?
- [ ] VPN interfering with API calls?
- [ ] Firewall blocking googleapis.com?
- [ ] Browser extensions blocking requests?

---

## 🎯 Quick Fix Summary

**What Changed**:
1. ✅ Model: `gemini-1.5-flash` (stable)
2. ✅ Error handling: Much better
3. ✅ Logging: Detailed debug info
4. ✅ Fallbacks: Graceful degradation

**What to Do**:
1. 🔄 Restart dev server
2. 🧹 Clear browser cache
3. 🧪 Test with any construction image
4. 👀 Check console for detailed logs

**If it works**: ✅ You're done!
**If not**: Check troubleshooting above ⬆️

---

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Upload completes
- ✅ Console shows: "Starting safety analysis..."
- ✅ Console shows: "Sending request to Gemini API..."
- ✅ Console shows: "Successfully parsed response"
- ✅ Results appear on screen
- ✅ Compliance score displayed
- ✅ Violations listed (if any)

---

**The fix is applied! Restart your dev server and try again.** 🚀
