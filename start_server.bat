@echo off
echo ========================================================
echo   Starting Musafir Travels Server on Port 5000...
echo ========================================================
echo.
start http://localhost:5000/frontend/pages/index.html
python server.py
pause
