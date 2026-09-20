@echo off
cd /d "%~dp0"
echo ========================================================
echo  Starting Portfolio Development Server...
echo  - Main Website:   http://localhost:5173/portfolio/
echo  - Admin Portal:   http://localhost:5173/portfolio/admin.html
echo ========================================================
echo.
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "npm install; npm run dev -- --host 0.0.0.0"
