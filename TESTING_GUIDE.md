# HRMS Lite - Local Testing Guide

## ✅ Servers Started Successfully!

Your application should now be running at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://127.0.0.1:8000/api/

## 📋 Testing Checklist

### 1. Dashboard Testing
- [ ] Dashboard loads without errors
- [ ] Shows "0" for all counters initially
- [ ] No loading errors in browser console

### 2. Employee Management Testing

#### Add Employee (Success Cases)
- [ ] Add employee with valid data:
  - Employee ID: `EMP001`
  - Full Name: `John Doe`
  - Email: `john.doe@example.com`
  - Department: `Engineering`
- [ ] Success message appears (green)
- [ ] Form clears after submission
- [ ] Employee appears in employee list
- [ ] Dashboard counter updates to 1 employee

#### Add More Employees
- [ ] Add `EMP002` - Jane Smith - `jane@example.com` - HR
- [ ] Add `EMP003` - Bob Wilson - `bob@example.com` - Marketing
- [ ] All employees appear in the list

#### Add Employee (Error Cases)
- [ ] Try adding duplicate Employee ID (should show error)
- [ ] Try adding duplicate email (should show error)
- [ ] Try adding with invalid email format (should show error)
- [ ] Try submitting with empty fields (should show validation error)

#### Delete Employee
- [ ] Click delete button on any employee
- [ ] Confirmation dialog appears
- [ ] Click OK - employee is removed
- [ ] Success message appears
- [ ] Employee list updates
- [ ] Dashboard counter decreases

### 3. Attendance Management Testing

#### Mark Attendance (Success Cases)
- [ ] Select an employee from dropdown
- [ ] Select today's date
- [ ] Select "Present"
- [ ] Click "Mark Attendance"
- [ ] Success message appears (green)
- [ ] Form clears
- [ ] Attendance appears in records list with employee name
- [ ] Dashboard "Attendance" counter increases
- [ ] Dashboard "Present" counter increases

#### Mark More Attendance
- [ ] Mark another employee as "Absent" for today
- [ ] Mark attendance for yesterday (different date)
- [ ] All records appear in the list

#### Mark Attendance (Error Cases)
- [ ] Try marking duplicate attendance (same employee, same date)
- [ ] Should show error message
- [ ] Try submitting without selecting employee (should fail)
- [ ] Try submitting without selecting date (should fail)

### 4. Bonus Features Testing

#### Filter Attendance by Date
- [ ] Select a date in the date filter
- [ ] Only attendance for that date appears
- [ ] Click "Clear Filter"
- [ ] All attendance records appear again

#### Present Days Counter
- [ ] Check employee list
- [ ] Each employee shows badge with present days count
- [ ] Add more present attendance for an employee
- [ ] Counter updates correctly

### 5. UI/UX Features Testing

#### Loading States
- [ ] Refresh page - see loading indicators
- [ ] Forms show "Adding..." / "Submitting..." while processing

#### Error Messages
- [ ] All errors appear as styled red messages
- [ ] Messages auto-dismiss after 5 seconds
- [ ] Field-level errors are descriptive

#### Success Messages
- [ ] All success operations show green messages
- [ ] Messages auto-dismiss after 5 seconds

#### Empty States
- [ ] Clear all data if possible
- [ ] Empty states show helpful messages
- [ ] Guide user on what to do next

### 6. API Testing (Backend)

Open these URLs in your browser or Postman:

#### GET Requests
- [ ] http://127.0.0.1:8000/api/employees/ - List all employees
- [ ] http://127.0.0.1:8000/api/attendance/ - List all attendance
- [ ] http://127.0.0.1:8000/api/dashboard/ - Dashboard stats
- [ ] http://127.0.0.1:8000/api/attendance/?date=2026-02-06 - Filter by date

#### Check Response Format
- [ ] JSON responses are properly formatted
- [ ] Attendance includes `employee_name` field
- [ ] All required fields are present

### 7. Responsive Design Testing
- [ ] Resize browser window
- [ ] Layout adjusts properly
- [ ] Forms remain usable
- [ ] Tables are readable

### 8. Browser Console Testing
- [ ] Open browser DevTools (F12)
- [ ] Check Console tab - no errors
- [ ] Check Network tab - API calls return 200/201
- [ ] No CORS errors

## 🐛 Common Issues & Solutions

### Frontend doesn't load
**Solution**: Check if the frontend terminal shows any errors. Try running `npm install` again.

### API calls fail with network error
**Solution**: Make sure backend server is running on port 8000. Check the backend terminal for errors.

### CORS errors
**Solution**: Verify that `django-cors-headers` is installed and configured in Django settings.

### Database errors
**Solution**: Delete `db.sqlite3` and run migrations again:
```bash
cd backend/hrms_backend
python manage.py migrate
```

### Port already in use
**Solution**: 
- For frontend (port 3000): Kill the process or use a different port
- For backend (port 8000): Check if another Django server is running

## 📊 Expected Results After Full Testing

After completing all tests, you should have:
- ✅ Multiple employees in the system
- ✅ Various attendance records (Present & Absent)
- ✅ Dashboard showing accurate counts
- ✅ All features working smoothly
- ✅ No errors in console
- ✅ Professional UI appearance

## 🎯 Production Readiness Checklist

Before deploying, ensure:
- [ ] All core features work without errors
- [ ] All bonus features work correctly
- [ ] Error handling is working properly
- [ ] UI is clean and professional
- [ ] Loading states appear appropriately
- [ ] Forms validate correctly
- [ ] Delete operations ask for confirmation
- [ ] No console errors
- [ ] Backend returns proper HTTP status codes
- [ ] README.md is complete
- [ ] Code is clean and well-organized

## 🚀 Next Steps

Once local testing is complete:
1. **Push to GitHub** - Create a repository and push your code
2. **Deploy Backend** - Follow DEPLOYMENT.md for Render/Railway
3. **Deploy Frontend** - Follow DEPLOYMENT.md for Vercel/Netlify
4. **Update README** - Add live URLs
5. **Final Testing** - Test the deployed application
6. **Submit** - Share your live URLs and GitHub link

---

**Happy Testing!** 🎉

If everything works correctly, you're ready to deploy! 🚀
