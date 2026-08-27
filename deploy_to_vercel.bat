@echo off
title Deploy Factual Solutions to Vercel
echo ========================================================
echo   Deploying Factual Solutions to Vercel
echo ========================================================
echo.
cd /d "%~dp0"
echo 1. Running Production Build Check...
call npm.cmd run build
if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Build failed. Please fix build issues before deploying.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo 2. Deploying to Vercel Production...
call npx.cmd -y vercel --prod

echo.
echo ========================================================
echo   Deployment completed!
echo ========================================================
pause
