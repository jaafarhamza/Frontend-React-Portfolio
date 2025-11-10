# 🚀 Complete Vercel Deployment Guide

## Prerequisites Checklist

- [x] Backend deployed on Render: `https://backend-graphql-portfolio.onrender.com`
- [x] Frontend code ready in this repository
- [x] Git repository initialized
- [x] Node.js installed (v18+)

## Method 1: Vercel CLI Deployment (Recommended)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
- Choose your preferred login method (GitHub, GitLab, Bitbucket, or Email)

### Step 3: Deploy
```bash
# Navigate to your project directory
cd Frontend-React-Portfolio

# Deploy to production
vercel --prod
```

### Step 4: Follow CLI Prompts
```
? Set up and deploy "Frontend-React-Portfolio"? [Y/n] Y
? Which scope do you want to deploy to? [Your Account]
? Link to existing project? [y/N] N
? What's your project's name? frontend-react-portfolio
? In which directory is your code located? ./
```

### Step 5: Verify Deployment
- CLI will provide your deployment URL
- Visit the URL to verify your site is live

---

## Method 2: Git Integration (Automatic Deployments)

### Step 1: Push to GitHub
```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for deployment"

# Add remote repository
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Set Environment Variables
In Vercel dashboard → Settings → Environment Variables:
```
VITE_API_URL = https://backend-graphql-portfolio.onrender.com
VITE_ENV = production
VITE_ENCRYPTION_KEY = your-secure-production-encryption-key-2025
```

### Step 4: Deploy
- Click "Deploy"
- Wait for build to complete

---

## Method 3: Using Deployment Script

### Windows:
```bash
deploy-vercel.bat
```

### Linux/Mac:
```bash
chmod +x deploy-vercel.sh
./deploy-vercel.sh
```

---

## Post-Deployment Configuration

### Step 1: Update Domain References
After getting your Vercel URL (e.g., `https://your-app-name.vercel.app`):

1. **Update `index.html`**:
   ```html
   <!-- Replace all instances of https://yourportfolio.com/ -->
   <meta property="og:url" content="https://your-app-name.vercel.app/" />
   <meta name="twitter:url" content="https://your-app-name.vercel.app/" />
   <link rel="canonical" href="https://your-app-name.vercel.app/" />
   ```

2. **Update `public/robots.txt`**:
   ```
   Sitemap: https://your-app-name.vercel.app/sitemap.xml
   ```

3. **Update `public/sitemap.xml`**:
   ```xml
   <loc>https://your-app-name.vercel.app/</loc>
   <loc>https://your-app-name.vercel.app/projects</loc>
   <loc>https://your-app-name.vercel.app/skills</loc>
   <loc>https://your-app-name.vercel.app/experience</loc>
   ```

### Step 2: Configure Backend CORS
Update your backend to allow your Vercel domain:
```javascript
// In your backend CORS configuration
const corsOptions = {
  origin: [
    'https://your-app-name.vercel.app',
    'http://localhost:3000' // for development
  ],
  credentials: true
};
```

### Step 3: Test Your Deployment
1. Visit your Vercel URL
2. Test all routes: `/`, `/projects`, `/skills`, `/experience`
3. Test admin login: `/admin/login`
4. Verify API connection in browser console
5. Test responsive design on mobile

---

## Custom Domain Setup (Optional)

### Step 1: Add Custom Domain
1. Go to Vercel dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `yourportfolio.com`)

### Step 2: Configure DNS
Add these DNS records to your domain provider:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

### Step 3: Update All References
Replace `your-app-name.vercel.app` with your custom domain in:
- `index.html`
- `robots.txt`
- `sitemap.xml`
- Backend CORS configuration

---

## Troubleshooting

### Build Fails
```bash
# Check build locally
npm run build

# Check for TypeScript errors
npm run lint
```

### Environment Variables Not Working
1. Verify variables are set in Vercel dashboard
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

### API Connection Issues
1. Verify backend URL is accessible
2. Check CORS configuration in backend
3. Verify environment variables in Vercel

### 404 on Refresh
- Vercel should handle this automatically with `vercel.json`
- Verify `vercel.json` rewrites configuration

---

## Monitoring & Analytics

### Step 1: Enable Analytics
1. Go to Vercel dashboard → Your Project → Analytics
2. Enable Web Analytics

### Step 2: Performance Monitoring
- Monitor Core Web Vitals
- Check function execution times
- Review deployment logs

---

## Automatic Deployments

Once connected to Git:
- **Production**: Push to `main` branch
- **Preview**: Push to any other branch
- **Rollback**: Use Vercel dashboard to rollback to previous deployment

---

## Security Checklist

- [x] Environment variables secured
- [x] API endpoints protected
- [x] CORS properly configured
- [x] No sensitive data in client code
- [x] HTTPS enabled (automatic with Vercel)

---

## Final Verification

✅ **Deployment successful when:**
- Site loads at your Vercel URL
- All routes work correctly
- API calls connect to backend
- Admin login functions
- Mobile responsive
- SEO meta tags display correctly
- No console errors

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vitejs.dev/guide/
- **React Router**: https://reactrouter.com/

---

**🎉 Your portfolio is now live on Vercel!**