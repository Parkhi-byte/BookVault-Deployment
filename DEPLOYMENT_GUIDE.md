# 🚀 Deployment Guide for BookVault

This guide will help you deploy your BookVault application using **Netlify (Frontend)** and **Render (Backend)** for free.

## 📋 Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **MongoDB Atlas Account** - For your database (free tier available)
3. **Netlify Account** - For frontend deployment
4. **Render Account** - For backend deployment

## 🔧 Step 1: Prepare Your Database

### MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. **Important**: Replace `<password>` with your actual password

## 🖥️ Step 2: Deploy Backend to Render

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy to Render
1. Go to [Render](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `bookvault-backend` (or your preferred name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### 3. Set Environment Variables
In Render dashboard, go to your service → Environment:
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A strong secret key (generate one)
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render will set this automatically)

### 4. Deploy
Click "Create Web Service" and wait for deployment.

### 5. Get Your Backend URL
Your backend will be available at: `https://your-service-name.onrender.com`

## 🌐 Step 3: Deploy Frontend to Netlify

### 1. Update API Configuration
1. Open `Frontend/src/config.js`
2. Replace `https://your-backend-name.onrender.com` with your actual Render backend URL
3. Commit and push the changes

### 2. Deploy to Netlify
1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub repository
4. Configure the build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `Frontend` (if your repo has multiple folders)

### 3. Set Environment Variables (Optional)
In Netlify dashboard → Site settings → Environment variables:
- `VITE_API_BASE_URL`: Your Render backend URL

### 4. Deploy
Click "Deploy site" and wait for deployment.

## 🔗 Step 4: Update Frontend Configuration

After getting your backend URL, update the frontend configuration:

1. **Update `Frontend/src/config.js`**:
   ```javascript
   production: {
     API_BASE_URL: 'https://your-actual-backend-name.onrender.com',
   }
   ```

2. **Update `Frontend/env.production`**:
   ```
   VITE_API_BASE_URL=https://your-actual-backend-name.onrender.com
   ```

3. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Update production API URL"
   git push origin main
   ```

4. **Trigger Netlify rebuild** (or it will auto-deploy)

## ✅ Step 5: Test Your Deployment

1. **Test Backend**: Visit `/health` endpoint on your Render URL
2. **Test Frontend**: Visit your Netlify URL
3. **Test API Calls**: Ensure frontend can communicate with backend

## 🚨 Troubleshooting

### Common Issues:

1. **CORS Errors**: Backend already has CORS configured
2. **Build Failures**: Check build logs in Netlify/Render
3. **Environment Variables**: Ensure all required variables are set
4. **Database Connection**: Verify MongoDB URI is correct

### Useful Commands:
```bash
# Check backend logs in Render
# Check frontend build logs in Netlify
# Test backend locally
cd Backend && npm start
# Test frontend locally
cd Frontend && npm run dev
```

## 🌟 Your Live URLs

- **Frontend**: `https://your-site-name.netlify.app`
- **Backend**: `https://your-service-name.onrender.com`
- **Health Check**: `https://your-service-name.onrender.com/health`

## 📝 Notes

- **Free Tier Limits**: Both services have usage limits on free plans
- **Auto-Deploy**: Both services auto-deploy on git push
- **Custom Domain**: Available on both platforms (may require paid plans)
- **SSL**: Automatically provided by both platforms

## 🆘 Need Help?

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

**Happy Deploying! 🎉**
