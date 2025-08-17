# 🚀 Quick Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] MongoDB Atlas database set up
- [ ] GitHub repository ready
- [ ] All code committed and pushed
- [ ] Environment variables prepared

## 🔥 Quick Deploy Commands

### 1. Prepare Code
```bash
# Run the deployment helper
deploy.bat

# Or manually:
git add .
git commit -m "Deploy to production"
git push origin main
```

### 2. Deploy Backend (Render)
1. Go to [render.com](https://render.com)
2. New Web Service → Connect GitHub repo
3. Set environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Strong secret key
   - `NODE_ENV`: production
4. Deploy and get your URL

### 3. Deploy Frontend (Netlify)
1. Go to [netlify.com](https://netlify.com)
2. New site from Git → Connect GitHub repo
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Base directory: `Frontend`
4. Deploy

### 4. Update API URLs
1. Update `Frontend/src/config.js` with your Render backend URL
2. Commit and push changes
3. Netlify will auto-redeploy

## 🌐 Your Live URLs
- **Frontend**: `https://your-site.netlify.app`
- **Backend**: `https://your-service.onrender.com`

## 🚨 Common Issues
- **Build fails**: Check package.json scripts
- **API errors**: Verify backend URL in config
- **CORS issues**: Backend has CORS enabled
- **Database**: Ensure MongoDB Atlas is accessible

## 📞 Need Help?
- Check `DEPLOYMENT_GUIDE.md` for detailed steps
- Render logs: Service dashboard → Logs
- Netlify logs: Site dashboard → Deploys

---
**Time to deploy: ~15-20 minutes** ⏱️
