# Quick Deployment Steps

## 1. Frontend (Vercel) - 5 minutes ⚡

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com) → New Project
   - Import your GitHub repo
   - **Root Directory**: `frontend`
   - Add Environment Variable:
     ```
     REACT_APP_API_URL=https://your-backend.onrender.com/api/
     ```
   - Deploy! ✅

---

## 2. Backend (Render) - 10 minutes ⚡

1. **Deploy on Render**
   - Visit [render.com](https://render.com) → New Web Service
   - Connect your GitHub repo
   - **Root Directory**: `backend`
   - **Build Command**: `./build.sh`
   - **Start Command**: `cd hrms_backend && gunicorn hrms_backend.wsgi:application --bind 0.0.0.0:$PORT`

2. **Add Environment Variables** in Render:
   ```
   SECRET_KEY=<generate-with-command-below>
   DEBUG=False
   ALLOWED_HOSTS=your-app.onrender.com
   CORS_ALLOWED_ORIGINS=https://your-app.vercel.app
   ```

3. **Generate SECRET_KEY**:
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

4. **Optional: Add PostgreSQL**
   - Create PostgreSQL database in Render
   - Add to environment variables:
     ```
     DATABASE_URL=<postgresql-connection-string>
     ```

---

## 3. Final Configuration

### Update Frontend Environment (Vercel)
After backend deploys, update `REACT_APP_API_URL`:
```
REACT_APP_API_URL=https://YOUR-BACKEND.onrender.com/api/
```
(Replace YOUR-BACKEND with your actual Render URL)

### Update Backend CORS (Render)
```
CORS_ALLOWED_ORIGINS=https://YOUR-FRONTEND.vercel.app
```
(Replace YOUR-FRONTEND with your actual Vercel URL)

---

## URLs after Deployment

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API**: `https://your-backend.onrender.com/api/`
- **Admin**: `https://your-backend.onrender.com/admin/`

---

## Testing Deployment

1. Visit your frontend URL
2. Try adding an employee
3. Check attendance features
4. Verify CRUD operations work

---

## Auto-Deployment ✨

Both platforms auto-deploy when you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push
```

✅ Vercel redeploys frontend  
✅ Render redeploys backend

---

## Need Help?

See full guide: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

**Deployment time: ~15 minutes total! 🚀**
