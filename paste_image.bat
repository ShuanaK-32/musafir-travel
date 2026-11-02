@echo off
setlocal
echo ========================================================
echo   Musafir Travels - Quick Clipboard Image Saver
echo ========================================================
echo.
echo Make sure you have copied an image to your clipboard
echo (via screenshot, Snipping Tool, or Right-Click -> 'Copy Image').
echo.
set /p imgname="Enter image name (e.g. my_bus.png) or press ENTER for auto-timestamp: "
python paste_image.py %imgname%
echo.
pause
