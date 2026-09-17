@echo off
cd /d "%~dp0"
echo Starting portfolio dev server...
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "npm install; npm run dev -- --host 0.0.0.0"
