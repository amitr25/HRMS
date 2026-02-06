# HRMS Lite - Human Resource Management System

<div align="center">

![HRMS Lite](https://img.shields.io/badge/HRMS-Lite-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, GitHub-inspired HR management system built with React and Django**

[Live Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation)

</div>

---

## 📋 Project Overview

HRMS Lite is a lightweight, full-stack web application designed for efficient employee and attendance management. Built with a modern tech stack, it features a sleek **GitHub-inspired dark theme UI** with a professional sidebar navigation, card-based layout, and real-time data management capabilities.

This project was developed as a full-stack coding assignment, demonstrating expertise in:
- ✅ Modern frontend development with React
- ✅ RESTful API design with Django REST Framework
- ✅ Database modeling and validation
- ✅ Professional UI/UX design
- ✅ Error handling and user feedback
- ✅ Production-ready deployment practices

---

## ✨ Features

### 🎨 **Modern UI/UX**
- **GitHub-Inspired Design**: Dark theme with professional aesthetics
- **Sidebar Navigation**: Fixed left sidebar with icon-based navigation
- **Card-Based Layout**: Clean, organized sections with headers
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile
- **Smooth Animations**: Loading states, transitions, and hover effects
- **Real-time Feedback**: Success/error messages with auto-dismiss

### 👥 **Employee Management**
- ✅ **Add Employee**: Create new employee records with validation
  - Employee ID (unique)
  - Full Name
  - Email Address (validated format)
  - Department
- ✅ **View Employees**: Display all employees in a sortable table
- ✅ **Delete Employee**: Remove employees with confirmation dialog
- ✅ **Present Days Counter**: Shows total present days for each employee
- ✅ **Real-time Updates**: Auto-refresh after operations

### 📅 **Attendance Management**
- ✅ **Mark Attendance**: Record daily attendance with:
  - Employee selection dropdown
  - Date picker
  - Status (Present/Absent)
- ✅ **View Records**: Display all attendance with employee names
- ✅ **Date Filter**: Filter attendance records by specific date
- ✅ **Status Badges**: Color-coded Present (Green) / Absent (Red)
- ✅ **Duplicate Prevention**: No duplicate records for same employee/date

### 📊 **Dashboard Analytics**
- ✅ **4 Stat Cards** with real-time data:
  - 👥 Total Employees
  - 📝 Total Attendance Records
  - ✅ Present Count
  - 📊 Attendance Rate Percentage
- ✅ **Quick Overview**: System status and last updated time
- ✅ **Quick Actions**: Guided navigation hints

### 🛡️ **Validation & Error Handling**
- **Frontend Validation**:
  - Required field checks
  - Email format validation
  - Form state management
  - User-friendly error messages
  
- **Backend Validation**:
  - Unique Employee ID enforcement
  - Unique email enforcement
  - Valid date checks
  - Status validation (Present/Absent only)
  - Duplicate attendance prevention

- **Error Handling**:
  - Proper HTTP status codes (200, 201, 400, 404, 500)
  - Detailed field-level error messages
  - Network error handling
  - Loading and error states in UI

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **React.js** | 18.x | UI library for building interactive components |
| **JavaScript (ES6+)** | Latest | Primary programming language |
| **Axios** | 1.x | HTTP client for API communication |
| **CSS3** | - | Custom styling with GitHub color palette |
| **React Hooks** | - | State management (useState, useEffect) |

**Key Frontend Features:**
- Component-based architecture
- Functional components with hooks
- Responsive grid layouts
- Dark theme CSS variables
- Smooth animations and transitions
- Mobile-first responsive design

### **Backend**
| Technology | Version | Purpose |
|------------|---------|---------|
| **Python** | 3.8+ | Backend programming language |
| **Django** | 4.2.x | High-level web framework |
| **Django REST Framework** | 3.14.x | Building RESTful APIs |
| **django-cors-headers** | 4.0.x | Cross-Origin Resource Sharing |
| **SQLite** | 3.x | Database (development) |

**Key Backend Features:**
- RESTful API architecture
- ViewSet-based API endpoints
- Model serialization with validation
- Query parameter filtering
- Custom validation methods
- Proper HTTP status code handling

### **Database Schema**

**Employee Model:**
```python
- id (AutoField, Primary Key)
- employee_id (CharField, Unique)
- full_name (CharField)
- email (EmailField, Unique)
- department (CharField)
```

**Attendance Model:**
```python
- id (AutoField, Primary Key)
- employee (ForeignKey to Employee)
- date (DateField)
- status (CharField: Present/Absent)
- Unique constraint: (employee, date)
```

### **Development Tools**
- **npm** - Package management (Frontend)
- **pip** - Package management (Backend)
- **Git** - Version control
- **VS Code** - Code editor
- **Chrome DevTools** - Debugging

### **Deployment Stack**
- **Frontend**: Vercel / Netlify
- **Backend**: Render / Railway / Heroku
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **Version Control**: GitHub

---

## 🚀 Installation & Setup

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://python.org/)
- **Git** - [Download](https://git-scm.com/)

### **Clone Repository**
```bash
git clone https://github.com/yourusername/hrms-lite.git
cd hrms-lite
```

---

### **Backend Setup**

#### 1. Navigate to backend directory
```bash
cd backend/hrms_backend
```

#### 2. Create virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install dependencies
```bash
pip install -r ../requirements.txt
```

#### 4. Configure database (Optional)
The project uses SQLite by default. For production, update `settings.py` to use PostgreSQL.

#### 5. Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

#### 6. Start backend server
```bash
python manage.py runserver
```

✅ **Backend running at:** `http://127.0.0.1:8000/api/`

---

### **Frontend Setup**

#### 1. Navigate to frontend directory
```bash
cd frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Configure API URL (Optional)
Update `src/services/api.js` if your backend URL is different:
```javascript
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});
```

#### 4. Start frontend server
```bash
npm start
```

✅ **Frontend running at:** `http://localhost:3000`

The application will automatically open in your default browser!

---

## 📚 API Documentation

### **Base URL**
```
http://127.0.0.1:8000/api/
```

### **Endpoints**

#### **Employees**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/employees/` | List all employees |
| POST | `/employees/` | Create new employee |
| GET | `/employees/{id}/` | Get employee details |
| PUT | `/employees/{id}/` | Update employee |
| DELETE | `/employees/{id}/` | Delete employee |
| GET | `/employees/{id}/present_days/` | Get total present days |

**Example Request (POST):**
```json
{
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Engineering"
}
```

**Example Response:**
```json
{
  "id": 1,
  "employee_id": "EMP001",
  "full_name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Engineering"
}
```

#### **Attendance**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/attendance/` | List all attendance records |
| POST | `/attendance/` | Mark attendance |
| GET | `/attendance/?date=YYYY-MM-DD` | Filter by date |
| GET | `/attendance/?employee={id}` | Filter by employee |
| GET | `/attendance/{id}/` | Get specific record |
| PUT | `/attendance/{id}/` | Update attendance |
| DELETE | `/attendance/{id}/` | Delete record |

**Example Request (POST):**
```json
{
  "employee": 1,
  "date": "2026-02-07",
  "status": "Present"
}
```

**Example Response:**
```json
{
  "id": 1,
  "employee": 1,
  "employee_name": "John Doe",
  "date": "2026-02-07",
  "status": "Present"
}
```

#### **Dashboard**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/` | Get dashboard statistics |

**Example Response:**
```json
{
  "total_employees": 15,
  "total_attendance_records": 120,
  "total_present_records": 95
}
```

---

## 📂 Project Structure

```
HRMS/
├── backend/
│   ├── hrms_backend/
│   │   ├── employees/
│   │   │   ├── migrations/
│   │   │   ├── __init__.py
│   │   │   ├── admin.py
│   │   │   ├── apps.py
│   │   │   ├── models.py          # Employee & Attendance models
│   │   │   ├── serializers.py     # API serializers with validation
│   │   │   ├── views.py           # ViewSets and API logic
│   │   │   ├── urls.py            # URL routing
│   │   │   └── tests.py
│   │   ├── hrms_backend/
│   │   │   ├── __init__.py
│   │   │   ├── asgi.py
│   │   │   ├── settings.py        # Django configuration
│   │   │   ├── urls.py            # Main URL configuration
│   │   │   └── wsgi.py
│   │   ├── db.sqlite3             # SQLite database
│   │   └── manage.py              # Django management script
│   └── requirements.txt           # Python dependencies
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   │   ├── Dashboard.jsx      # Dashboard with stats
│   │   │   ├── EmployeeForm.jsx   # Add employee form
│   │   │   ├── EmployeeList.jsx   # Employee table
│   │   │   ├── AttendanceForm.jsx # Mark attendance form
│   │   │   └── AttendanceList.jsx # Attendance records
│   │   ├── services/
│   │   │   └── api.js             # Axios API configuration
│   │   ├── App.js                 # Main app component
│   │   ├── App.css                # GitHub-inspired styles
│   │   ├── index.js               # React entry point
│   │   └── index.css              # Global styles
│   ├── package.json               # Node dependencies
│   └── README.md
├── .gitignore
├── README.md                      # This file
├── DEPLOYMENT.md                  # Deployment guide
└── TESTING_GUIDE.md               # Testing checklist
```

---

## 🎨 UI Design Highlights

### **Color Palette (GitHub-Inspired)**
```css
--bg-primary: #0d1117      /* Main background */
--bg-secondary: #161b22    /* Cards & sidebar */
--bg-tertiary: #21262d     /* Hover states */
--border-default: #30363d  /* Borders */

--text-primary: #e6edf3    /* Primary text */
--text-secondary: #7d8590  /* Secondary text */

--accent-blue: #58a6ff     /* Links & active states */
--accent-green: #3fb950    /* Success & present */
--accent-purple: #bc8cff   /* Stats */
--accent-orange: #ff9963   /* Stats */
--accent-red: #f85149      /* Error & absent */
```

### **Key Design Features**
- 🌑 **Dark Theme**: Professional GitHub-style dark mode
- 📱 **Responsive**: Mobile-first design approach
- 🎯 **Accessible**: High contrast ratios, clear labels
- ⚡ **Fast**: Optimized CSS, minimal dependencies
- 🎨 **Consistent**: Unified color scheme and spacing

---

## ✅ Features Checklist

### **Core Requirements**
- [x] Add new employee (with validation)
- [x] View all employees
- [x] Delete employee (with confirmation)
- [x] Mark daily attendance
- [x] View attendance records
- [x] RESTful API endpoints
- [x] Database persistence (SQLite/PostgreSQL)
- [x] Server-side validation
- [x] Client-side validation
- [x] Error handling with proper status codes

### **Bonus Features**
- [x] Filter attendance by date
- [x] Display total present days per employee
- [x] Dashboard with statistics
- [x] Attendance rate calculation
- [x] Real-time data refresh

### **UI/UX Enhancements**
- [x] Professional GitHub-inspired design
- [x] Sidebar navigation
- [x] Loading states
- [x] Empty states with guidance
- [x] Success/error notifications
- [x] Smooth animations
- [x] Responsive layout
- [x] Card-based components

---

## 🧪 Testing

### **Manual Testing**
Follow the complete testing guide in [TESTING_GUIDE.md](TESTING_GUIDE.md)

**Quick Test:**
```bash
# 1. Start backend
cd backend/hrms_backend
python manage.py runserver

# 2. Start frontend (in new terminal)
cd frontend
npm start

# 3. Open http://localhost:3000
# 4. Test all CRUD operations
```

### **API Testing**
Use tools like Postman, cURL, or browser:
```bash
# Test GET endpoint
curl http://127.0.0.1:8000/api/employees/

# Test POST endpoint
curl -X POST http://127.0.0.1:8000/api/employees/ \
  -H "Content-Type: application/json" \
  -d '{"employee_id":"EMP001","full_name":"Test User","email":"test@example.com","department":"IT"}'
```

---

## 🚀 Deployment

### **Quick Deployment Guide**

#### **Frontend (Vercel)**
1. Push code to GitHub
2. Import project to Vercel
3. Set build settings:
   - **Framework**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add environment variable:
   - `REACT_APP_API_URL` = Your backend URL

#### **Backend (Render)**
1. Push code to GitHub
2. Create new Web Service on Render
3. Set settings:
   - **Environment**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend/hrms_backend && gunicorn hrms_backend.wsgi:application`
4. Add environment variables as needed

📖 **Detailed deployment instructions:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📝 Assumptions & Limitations

### **Assumptions**
- Single admin user (no authentication required per assignment)
- Employees can be deleted (no soft delete/archiving)
- Attendance can be marked retrospectively
- Department is free-text field
- No limit on number of employees

### **Current Limitations**
- ❌ No user authentication/authorization
- ❌ No role-based access control
- ❌ No leave management
- ❌ No payroll features
- ❌ No reporting/export functionality
- ❌ No email notifications
- ❌ No audit logs

### **Future Enhancements**
- 🔜 User authentication & authorization
- 🔜 Role-based access (Admin, Manager, Employee)
- 🔜 Leave management system
- 🔜 Advanced reporting & analytics
- 🔜 Data export (CSV, PDF)
- 🔜 Email notifications
- 🔜 Employee self-service portal
- 🔜 Department master data
- 🔜 Bulk operations
- 🔜 Attendance calendar view

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Design inspired by GitHub's modern dark theme UI
- Built as a full-stack coding assignment
- Thanks to the Django and React communities

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ using React & Django

</div>
