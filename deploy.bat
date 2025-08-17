@echo off
echo ========================================
echo    BookVault Deployment Helper
echo ========================================
echo.

echo Step 1: Checking if git is initialized...
if not exist ".git" (
    echo Git repository not found. Initializing...
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo.
    echo Please set up your remote repository and push:
    echo git remote add origin YOUR_GITHUB_REPO_URL
    echo git push -u origin main
    echo.
    pause
    exit
)

echo Git repository found!
echo.

echo Step 2: Checking current status...
git status
echo.

echo Step 3: Adding all changes...
git add .
echo.

echo Step 4: Committing changes...
git commit -m "Prepare for deployment - %date% %time%"
echo.

echo Step 5: Pushing to remote...
git push
echo.

echo ========================================
echo    Deployment Preparation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Deploy backend to Render: https://render.com
echo 2. Deploy frontend to Netlify: https://netlify.com
echo 3. Update API URLs in config files
echo 4. Test your live website!
echo.
echo See DEPLOYMENT_GUIDE.md for detailed instructions.
echo.
pause
