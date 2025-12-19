# 🔍 API Key Diagnostic - MUST READ

## The Problem

Your API key might be:
1. ❌ Not enabled for Generative Language API
2. ❌ Restricted to specific referrers
3. ❌ Not activated yet
4. ❌ Invalid or expired

## ✅ SOLUTION - Enable the API

### Step 1: Go to Google Cloud Console
Open: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com

### Step 2: Enable the API
1. Click **"ENABLE"** button
2. Wait for it to activate (takes 30 seconds)

### Step 3: Check API Key Restrictions
1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your API key
3. Click on it
4. Under "API restrictions":
   - Either select **"Don't restrict key"** (for testing)
   - OR add **"Generative Language API"** to allowed APIs

### Step 4: Check Application Restrictions
1. Under "Application restrictions"
2. Select **"None"** (for local development)
3. Click **"Save"**

## 🧪 Test Your API Key

### Option 1: Use Browser Test
1. Open: `http://localhost:3000/test-gemini.html`
2. Click each test button
3. Check results

### Option 2: Manual cURL Test
```bash
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyD4fKTP7gPWdAOZDoeQ9pno3TXc7E1-VEs" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Say hello"
      }]
    }]
  }'
```

### Expected Response:
```json
{
  "candidates": [{
    "content": {
      "parts": [{"text": "Hello!"}]
    }
  }]
}
```

### If You Get Error:
```json
{
  "error": {
    "code": 403,
    "message": "Generative Language API has not been used in project..."
  }
}
```
**→ This means you NEED to enable the API!**

## 🔑 Get a New API Key (Recommended)

If the above doesn't work:

1. **Go to**: https://aistudio.google.com/app/apikey
2. **Click**: "Create API key"
3. **Select**: Create new project (or use existing)
4. **Copy**: The new API key
5. **Update** `.env.local`:
   ```
   VITE_GEMINI_API_KEY=your_new_api_key_here
   ```
6. **Restart** dev server

## 📝 Important Notes

### For Gemini API (AI Studio):
- ✅ Free tier: 60 requests/minute
- ✅ No credit card needed
- ✅ Instant activation
- ✅ Works immediately

### For Google Cloud (Vertex AI):
- ⚠️ Requires billing account
- ⚠️ More complex setup
- ⚠️ Project configuration needed

**Use AI Studio API key** - It's simpler!

## 🎯 Quick Fix Checklist

Run through these in order:

1. [ ] Go to https://aistudio.google.com/app/apikey
2. [ ] Create a NEW API key
3. [ ] Copy the key
4. [ ] Update `.env.local`:
   ```bash
   VITE_GEMINI_API_KEY=your_new_key_here
   ```
5. [ ] Save the file
6. [ ] Restart dev server:
   ```bash
   # Stop with Ctrl+C
   npm run dev
   ```
7. [ ] Hard refresh browser (Ctrl+Shift+R)
8. [ ] Try uploading image again

## 🔍 Verify It's Working

### Test in Browser:
1. Open: http://localhost:3000/test-gemini.html
2. You should see "✅ Found" for API Key Status
3. Click "1. Test Basic API Call"
4. Should see "✅ SUCCESS!"

### If Test Works But App Doesn't:
The issue is in the app code, not the API key.

### If Test Also Fails:
The API key is the problem.

## 💡 Common Errors & Fixes

| Error | Meaning | Fix |
|-------|---------|-----|
| 403 Forbidden | API not enabled | Enable Generative Language API |
| 400 Bad Request | Invalid model name | Use gemini-1.5-flash |
| 401 Unauthorized | Wrong/invalid key | Create new API key |
| 429 Too Many Requests | Rate limit | Wait or upgrade |

## 🚀 Once Working

AfterAPI key works:
1. ✅ Dashboard predictions will load
2. ✅ Safety AI image analysis will work
3. ✅ Report generation will function
4. ✅ No more "AI Inference Error"

## 📞 Still Not Working?

### Debug Info to Collect:
1. Open browser console (F12)
2. Go to Network tab
3. Upload an image
4. Find the request to `generativelanguage.googleapis.com`
5. Check:
   - Request URL
   - Request headers
   - Response status code
   - Response body

### Share This Info:
- Status code: (200, 400, 401, 403, 429?)
- Error message from response
- Console errors

---

**Most likely fix**: Create a NEW API key from AI Studio and use that! 🎯

**Test page**: http://localhost:3000/test-gemini.html
