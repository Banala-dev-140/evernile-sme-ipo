# Production Configuration Guide

## 🚀 For VPS Deployment (72.60.96.212:8013)

### 1. **Stop Development Server**
If you're running `npm run dev`, stop it and use the built version instead.

### 2. **Use Built Frontend**
```bash
# Build the frontend
npm run build

# Serve the built files (Option 1 - Simple)
npx serve -s dist -l 3000

# Serve the built files (Option 2 - Production)
# Use nginx or your preferred web server
```

### 3. **Environment Variables**
The frontend is now configured to use:
- **Primary**: `VITE_EMAIL_API_URL=http://72.60.96.212:8013` (from .env)
- **Fallback**: `http://72.60.96.212:8013` (hardcoded in emailService.ts)

### 4. **Verify Configuration**
Check that your frontend is calling the correct endpoint:
- ✅ Should call: `http://72.60.96.212:8013/api/send-assessment-report`
- ❌ Should NOT call: `http://localhost:3001/api/send-assessment-report`

## 🔧 Troubleshooting

### If Still Calling Localhost:
1. **Clear Browser Cache**: Hard refresh (Ctrl+F5 or Cmd+Shift+R)
2. **Check Build**: Ensure you're using the built version, not dev server
3. **Environment**: Verify .env file is in the root directory
4. **Restart**: Restart your web server after changes

### Development vs Production:
- **Development** (`npm run dev`): May still use localhost
- **Production** (`npm run build` + serve): Uses VPS endpoint
