@echo off
echo Starting BookVault Project...
echo.

echo Starting Backend Server...
cd Backend
start "Backend Server" cmd /k "npm start"
cd ..

echo.
echo Starting Frontend Development Server...
cd Frontend
start "Frontend Dev Server" cmd /k "npm run dev"
cd ..

echo.
echo Both servers are starting up...
echo Backend will be available at: http://localhost:4000
echo Frontend will be available at: http://localhost:5173 (or similar)
echo.
echo Press any key to close this window...
pause >nul
