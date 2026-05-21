# Clinic Management (local dev)

This workspace contains a Django backend (`clinic_management`) and a React frontend (`clinic_frontend`).

Quick start (Windows PowerShell):

1. Backend: create & activate virtualenv, install deps, run migrations, start server

```powershell
cd clinic_management
venv\Scripts\activate
pip install -r requirements.txt
venv\Scripts\python.exe manage.py migrate
venv\Scripts\python.exe manage.py runserver
```

Notes for running from workspace root (no `cd`):

```powershell
# run backend using the project's venv from the repository root
clinic_management\venv\Scripts\python.exe clinic_management\manage.py migrate
clinic_management\venv\Scripts\python.exe clinic_management\manage.py runserver
```

2. Frontend: install and run

```powershell
cd clinic_frontend
npm install
npm run dev
```

Notes:
- Backend listens on `http://127.0.0.1:8000/` and exposes APIs under `/api/...`.
- Frontend is configured to call `http://127.0.0.1:8000` for API requests.
- CORS is enabled for local development.

If you want sample data created, run:

```powershell
cd clinic_management
venv\Scripts\python.exe manage.py shell < ../scripts/create_sample_data.py
```

I'll create a simple sample-data script in `clinic_management/scripts/` to ease testing.
