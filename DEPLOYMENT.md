# HRMS Lite - Deployment Guide

This guide will help you deploy the HRMS Lite application to production.

## 🚀 Backend Deployment (Render)

### Prerequisites
- GitHub account
- Render account (free tier available at render.com)

### Steps

1. **Prepare Django for Production**

   Update `backend/hrms_backend/hrms_backend/settings.py`:
   
   ```python
   import os
   
   # Add to ALLOWED_HOSTS
   ALLOWED_HOSTS = ['*']  # Or specify your domain
   
   # Update CORS settings
   CORS_ALLOW_ALL_ORIGINS = True  # For development
   # For production, use:
   # CORS_ALLOWED_ORIGINS = [
   #     "https://your-frontend-domain.vercel.app",
   # ]
   
   # Database configuration for production
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.sqlite3',
           'NAME': BASE_DIR / 'db.sqlite3',
       }
   }
   # For PostgreSQL (recommended for production):
   # DATABASES = {
   #     'default': {
   #         'ENGINE': 'django.db.backends.postgresql',
   #         'NAME': os.environ.get('DB_NAME'),
   #         'USER': os.environ.get('DB_USER'),
   #         'PASSWORD': os.environ.get('DB_PASSWORD'),
   #         'HOST': os.environ.get('DB_HOST'),
   #         'PORT': os.environ.get('DB_PORT', '5432'),
   #     }
   # }
   ```

2. **Create a build script**

   Create `backend/build.sh`:
   ```bash
   #!/usr/bin/env bash
   
   pip install -r requirements.txt
   python hrms_backend/manage.py collectstatic --no-input
   python hrms_backend/manage.py migrate
   ```

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

4. **Deploy on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `hrms-lite-backend`
     - Environment: `Python 3`
     - Build Command: `pip install -r backend/requirements.txt`
     - Start Command: `cd backend/hrms_backend && gunicorn hrms_backend.wsgi:application`
   - Add environment variables if needed
   - Click "Create Web Service"

5. **Note your Backend URL**
   - Example: `https://hrms-lite-backend.onrender.com`

## 🌐 Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (free tier available at vercel.com)

### Steps

1. **Update API Base URL**

   Update `frontend/src/services/api.js`:
   ```javascript
   import axios from "axios";
   
   const API = axios.create({
     baseURL: process.env.REACT_APP_API_URL || "https://hrms-lite-backend.onrender.com/api/",
   });
   
   export default API;
   ```

2. **Create Production Build Locally (Optional)**
   ```bash
   cd frontend
   npm run build
   ```

3. **Deploy to Vercel**

   **Option A: Using Vercel CLI**
   ```bash
   npm install -g vercel
   cd frontend
   vercel login
   vercel --prod
   ```

   **Option B: Using Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - Framework Preset: `Create React App`
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Add Environment Variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://hrms-lite-backend.onrender.com/api/`
   - Click "Deploy"

4. **Note your Frontend URL**
   - Example: `https://hrms-lite.vercel.app`

## 🔧 Alternative Deployment Options

### Backend Alternatives

1. **Railway**
   - Similar to Render
   - Good free tier
   - Easy PostgreSQL integration

2. **Heroku**
   - Requires credit card for free tier
   - Good documentation
   - Procfile needed: `web: cd backend/hrms_backend && gunicorn hrms_backend.wsgi`

3. **PythonAnywhere**
   - Free tier available
   - Good for Django apps
   - Manual configuration needed

### Frontend Alternatives

1. **Netlify**
   - Similar to Vercel
   - Good free tier
   - Automatic SSL
   - Build settings:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/build`

2. **GitHub Pages**
   - Free hosting
   - Requires `gh-pages` package
   - Add to package.json: `"homepage": "https://username.github.io/hrms-lite"`

## 📋 Post-Deployment Checklist

- [ ] Backend is accessible via HTTPS
- [ ] Frontend is accessible via HTTPS
- [ ] CORS is properly configured
- [ ] Database migrations are run
- [ ] API endpoints are working
- [ ] Frontend can communicate with backend
- [ ] All features are working:
  - [ ] Add employee
  - [ ] View employees
  - [ ] Delete employee
  - [ ] Mark attendance
  - [ ] View attendance
  - [ ] Filter attendance by date
  - [ ] Dashboard shows correct stats

## 🐛 Troubleshooting

### Common Issues

1. **CORS Error**
   - Update `CORS_ALLOWED_ORIGINS` in Django settings
   - Make sure django-cors-headers is installed

2. **Database Connection Error**
   - Check database credentials
   - Ensure database is created
   - Run migrations

3. **Static Files Not Loading**
   - Run `python manage.py collectstatic`
   - Check STATIC_ROOT and STATIC_URL settings

4. **API Not Responding**
   - Check backend logs
   - Verify API base URL in frontend
   - Check network tab in browser DevTools

5. **Build Failures**
   - Check build logs
   - Verify all dependencies are in requirements.txt/package.json
   - Check Python/Node version compatibility

## 📝 Environment Variables Reference

### Backend (Optional)
- `SECRET_KEY` - Django secret key
- `DEBUG` - Set to `False` in production
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` - Database credentials (if using PostgreSQL)
- `ALLOWED_HOSTS` - Comma-separated list of allowed hosts

### Frontend
- `REACT_APP_API_URL` - Backend API base URL

## 🔐 Security Considerations

1. **For Production:**
   - Set `DEBUG = False` in Django settings
   - Use strong `SECRET_KEY`
   - Use PostgreSQL instead of SQLite
   - Configure specific `ALLOWED_HOSTS`
   - Use specific `CORS_ALLOWED_ORIGINS` instead of `CORS_ALLOW_ALL_ORIGINS`
   - Enable HTTPS (usually automatic with Vercel/Render)
   - Add authentication if needed

2. **Environment Variables:**
   - Never commit sensitive data to Git
   - Use environment variables for secrets
   - Different configs for dev/staging/production

## 📞 Support

If you encounter any issues during deployment:
1. Check the platform-specific documentation
2. Review application logs
3. Verify environment variables
4. Test API endpoints using Postman or curl

---

**Happy Deploying!** 🚀
