@echo off
title Ecobank WealthAI Studio - Production AI Backend & Demo Server
echo ======================================================================
echo    ECOBANK WEALTH MANAGEMENT PLATFORM - GENUINE ML DEMO SYSTEM
echo    Powered by FastAPI, Uvicorn, and Scikit-Learn (0.8789 ROC-AUC)
echo ======================================================================
echo Loading 23,524-record African Financial Inclusion Dataset...
echo Loading trained Scikit-Learn GradientBoosting Pipeline (.joblib)...
echo.

cd /d "%~dp0"
python server.py

pause
