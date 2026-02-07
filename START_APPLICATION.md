# How to Start HRMS Application

## Important: Both Backend AND Frontend Must Be Running!

### Step 1: Start Backend Server (Terminal 1)
```powershell
cd backend\hrms_backend
python manage.py runserver
```
**Keep this terminal running!** Backend must stay active at `http://127.0.0.1:8000`

### Step 2: Start Frontend Server (Terminal 2)
```powershell
cd frontend
npm start
```
**Keep this terminal running!** Frontend will open at `http://localhost:3000`

### Step 3: Access Application
Open browser: `http://localhost:3000`

---

## ✅ How to Verify Everything Works

### Check Backend is Running:
Open `http://127.0.0.1:8000/api/dashboard/` in browser
- Should show: `{"total_employees":2,"total_attendance_records":1,"total_present_records":1}`

### Check Frontend is Running:
Open `http://localhost:3000`
- Dashboard should show your data

---

## 💡 Best Practice

### Option 1: Keep Terminals Open
- Don't close terminal windows
- Minimize them instead

### Option 2: Use Two Separate Terminals
- Terminal 1: Backend (always running)
- Terminal 2: Frontend (always running)

### Option 3: Use Background Process (Advanced)
```powershell
# Start backend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend\hrms_backend; python manage.py runserver"

# Start frontend in background  
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"
```

---

## 🔍 Troubleshooting

### If Dashboard Still Shows 0:

1. **Check backend is running:**
   ```powershell
   # In browser, visit:
   http://127.0.0.1:8000/api/dashboard/
   ```

2. **Check frontend API URL:**
   Frontend should connect to `http://127.0.0.1:8000/api/`

3. **Check browser console:**
   Press F12 → Console tab
   Look for errors like "Failed to fetch" or "Network Error"

4. **Verify database has data:**
   ```powershell
   cd backend\hrms_backend
   python manage.py shell -c "from employees.models import Employee, Attendance; print(f'Employees: {Employee.objects.count()}'); print(f'Attendance: {Attendance.objects.count()}')"
   ```

---

## 📊 Your Current Data Status

✓ Database exists: `backend\hrms_backend\db.sqlite3`
✓ Employees: 2
✓ Attendance: 1

**Data is persisting correctly!** You just need to keep the backend server running.
