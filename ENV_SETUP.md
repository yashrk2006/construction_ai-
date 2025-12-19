# 🔐 Environment Variables Setup

## Required API Keys

This project requires a **Google Gemini API Key** to function.

### How to Get Your API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### Setup Instructions

1. **Copy the example file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`**:
   ```bash
   # Open with your favorite editor
   nano .env.local
   # or
   code .env.local
   ```

3. **Add your API key**:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Save and restart dev server**:
   ```bash
   npm run dev
   ```

## ⚠️ Security Warning

**NEVER commit `.env.local` to Git!**

- ✅ `.env.local` is already in `.gitignore`
- ✅ Use `.env.example` for documentation only
- ✅ Keep your API keys private
- ❌ Never share your `.env.local` file
- ❌ Never push to public repositories

## Environment Variables Used

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API Key | Yes |

## Troubleshooting

### API Key Not Working?

1. Check if `.env.local` exists in the root directory
2. Verify the variable name is exactly `VITE_GEMINI_API_KEY`
3. Restart the development server
4. Clear browser cache

### Still Not Working?

```bash
# Check if env file is being read
echo $VITE_GEMINI_API_KEY

# Restart server
npm run dev
```

## For Production

For production deployment:

1. **Vercel/Netlify**: Add environment variable in dashboard
2. **Docker**: Use secrets management
3. **Kubernetes**: Use ConfigMaps/Secrets
4. **Traditional hosting**: Server environment variables

## License

This configuration is part of BuildSmart AI project.
