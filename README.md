# Personal Book Manager

A full-stack MERN app for managing your personal book collection — sign up, log in, track reading status, and filter by tags.

## Live Demo

| Service  | URL |
|----------|-----|
| Frontend | _Add after Vercel deploy_ |
| Backend  | _Add after Render deploy_ |

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, MongoDB, JWT

## Local Setup

### Backend

```bash
cd book-manager/backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

### Frontend

```bash
cd book-manager/frontend/book-manager
cp ../../frontend/.env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deployment

### 1. MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Add a database user and allow access from anywhere (`0.0.0.0/0`)
3. Copy the connection string into `MONGO_URI`

### 2. Backend — Render

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → **New → Blueprint** (or Web Service)
3. Connect the repo and use `render.yaml`, or manually set:
   - **Root Directory:** `book-manager/backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables:
   - `MONGO_URI` — your Atlas connection string
   - `JWT_SECRET` — a long random string
   - `FRONTEND_URL` — your Vercel URL (add after step 3)
5. Deploy and copy the backend URL (e.g. `https://book-manager-api.onrender.com`)

### 3. Frontend — Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import the GitHub repo
3. Set **Root Directory** to `book-manager/frontend/book-manager`
4. Add environment variable:
   - `VITE_API_URL` = `https://YOUR-RENDER-URL/api`
5. Deploy

### 4. Final step

Update `FRONTEND_URL` on Render to your Vercel URL, then redeploy the backend.

## Demo Account

```
Email: alex@demo.com
Password: demo123
```

## API Endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | `/api/auth/register` | No |
| POST | `/api/auth/login` | No |
| GET | `/api/books` | Yes |
| POST | `/api/books` | Yes |
| PUT | `/api/books/:id` | Yes |
| DELETE | `/api/books/:id` | Yes |

## Project Structure

```
book-manager/
├── backend/                 # Express API
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    └── book-manager/        # Vite + React app
        ├── src/
        └── vercel.json
```
