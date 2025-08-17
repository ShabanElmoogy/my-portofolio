# Deployment Guide (Firebase Hosting + Cloud Run)

This repo hosts a monorepo with:
- `frontend/` (Vite React app)
- `backend/` (Node/Express + Prisma, SQLite for dev)

We deploy:
- Frontend to Firebase Hosting
- Backend to Cloud Run, proxied via Firebase Hosting rewrites

## Prerequisites
- Firebase CLI: `npm i -g firebase-tools` and `firebase login`
- Google Cloud CLI: https://cloud.google.com/sdk/docs/install, then `gcloud auth login`
- Ensure your Firebase project is set in `.firebaserc` (already set to `myportofolio-e504e`).

## 1) Prepare backend for Cloud Run
- Backend already listens on `process.env.PORT` and exposes routes under `/api/*`.
- Ensure environment variables are configured in Cloud Run (e.g., `DATABASE_URL` if using a hosted DB).
- For SQLite, use a hosted DB in production (e.g., Postgres on Cloud SQL or a managed DB).

## 2) Deploy backend to Cloud Run
Run from repo root:

```
gcloud config set project myportofolio-e504e
# Deploy from source
gcloud run deploy portfolio-api \
  --source backend \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NODE_ENV=production"
```

Note the service name (`portfolio-api`) and region.

## 3) Configure Hosting (already prepared)
The root `firebase.json` points `public` to `frontend/dist` and SPA rewrite to `/index.html`.

To proxy API calls to Cloud Run, add a Hosting rewrite like:

```
{
  "hosting": {
    "public": "frontend/dist",
    "rewrites": [
      { "source": "/api/**", "run": { "serviceId": "portfolio-api", "region": "us-central1" } },
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
```

> Replace `serviceId` and `region` if you used different values.

## 4) Build and deploy frontend
```
npm --prefix frontend ci
npm --prefix frontend run build
firebase deploy --only hosting
```

## Local development
- Backend: `cd backend && npm run dev` (runs at http://localhost:3000)
- Frontend: `cd frontend && npm run dev` (Vite at http://localhost:5173)
- Calls from frontend should use `/api/...` paths (same origin in production; `http://localhost:3000/api/...` in dev).

## Notes on Prisma
- Avoid SQLite in production. Use a network-accessible DB and set `DATABASE_URL` in Cloud Run.
- If you add `prisma generate` ensure it runs in your build pipeline (package.json postinstall) and migrations are applied.
