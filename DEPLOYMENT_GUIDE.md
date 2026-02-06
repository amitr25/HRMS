# Deployment Guide - HRMS Application

## Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Push your code to GitHub

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset**: Create React App
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `build` (default)
   
3. **Set Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api/
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy your frontend
   - You'll get a URL like: `https://your-app.vercel.app`

---

## Backend Deployment (Render)

### Prerequisites
- GitHub account
- Render account (sign up at render.com)
- Push your code to GitHub

### Steps:

1. **Create a New Web Service on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure service:
     - **Name**: `hrms-backend`
     - **Region**: Choose closest to your users
     - **Branch**: `main`
     - **Root Directory**: `backend`
     - **Runtime**: Python 3
     - **Build Command**: `./build.sh`
     - **Start Command**: `cd hrms_backend && gunicorn hrms_backend.wsgi:application --bind 0.0.0.0:$PORT`

2. **Set Environment Variables**
   In Render dashboard → Environment:
   ```
   SECRET_KEY=<generate-a-secure-random-key>
   DEBUG=False
   ALLOWED_HOSTS=your-app.onrender.com
   CORS_ALLOWED_ORIGINS=https://your-app.vercel.app,http://localhost:3000
   DATABASE_URL=<postgresql-connection-string>
   PORT=10000
   ```

3. **Create PostgreSQL Database (Optional but Recommended)**
   - In Render dashboard, click "New +" → "PostgreSQL"
   - Name: `hrms-db`
   - Copy the "Internal Database URL"
   - Add to backend environment variables as `DATABASE_URL`

4. **Update Django Settings for PostgreSQL** (if using PostgreSQL)
   The settings are already configured to use environment variables.

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend
   - You'll get a URL like: `https://your-backend.onrender.com`

---

## Final Steps

### 1. Update Frontend Environment Variable
After backend is deployed, update Vercel environment variable:
```
REACT_APP_API_URL=https://your-backend.onrender.com/api/
```

### 2. Update Backend CORS Settings
Update Render environment variable:
```
CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
```

### 3. Test Your Deployment
- Visit your Vercel URL: `https://your-app.vercel.app`
- Test all features (Employee CRUD, Attendance)
- Check browser console for any errors

---

## Important Security Notes

### Generate Secure Secret Key
For production, generate a secure SECRET_KEY:
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Environment Variables Checklist
- ✅ Never commit `.env` files to Git
- ✅ Set `DEBUG=False` in production
- ✅ Use strong SECRET_KEY
- ✅ Configure ALLOWED_HOSTS properly
- ✅ Set CORS_ALLOWED_ORIGINS to your frontend URL only

---

## Troubleshooting

### Backend Issues
- **500 Error**: Check Render logs for errors
- **Database Error**: Ensure migrations ran successfully
- **CORS Error**: Verify CORS_ALLOWED_ORIGINS includes your frontend URL

### Frontend Issues
- **API Connection Failed**: Verify REACT_APP_API_URL is correct
- **404 on Refresh**: Vercel.json routing is configured correctly
- **Build Failed**: Check build logs in Vercel dashboard

---

## Useful Commands

### Local Testing
```bash
# Frontend
cd frontend
npm start

# Backend
cd backend/hrms_backend
python manage.py runserver
```

### Check Deployment Status
- Vercel: Check deployments tab in dashboard
- Render: Check events tab in dashboard

---

## Auto-Deployment
Both Vercel and Render support automatic deployments:
- Push to GitHub main branch → Automatic deployment
- Pull requests → Preview deployments (Vercel)

---

## Database Backup (Render PostgreSQL)
```bash
# Create backup
pg_dump -h <host> -U <user> -d <database> > backup.sql

# Restore backup
psql -h <host> -U <user> -d <database> < backup.sql
```

---

## Support URLs
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Django Deployment: https://docs.djangoproject.com/en/stable/howto/deployment/

---

**Your HRMS application is now ready for deployment! 🚀**
