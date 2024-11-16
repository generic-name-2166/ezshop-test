# Ezshop test

![Preview image](https://github.com/generic-name-2166/ezshop-test/blob/main/backend/uploads/preview.png)

# How to

## Install

```powershell
cd frontend
npm install
cd ../backend
python -m venv .venv
.venv/Scripts/Activate.ps1
pip install -e .
cd ..
```

## Build

```powershell
cd frontend
npm run build
cd ../backend
fastapi run src/ezshop_test/main.py
```
