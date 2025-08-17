@echo off
echo Setting up BookVault Backend...
echo.

echo Installing dependencies...
npm install

echo.
echo Creating admin user...
npm run createAdmin

echo.
echo Starting server...
npm start

pause
