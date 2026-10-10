# SkillBridge

SkillBridge connects NGOs with skilled volunteers: NGOs post opportunities, volunteers find and apply to them.

## Project structure

```
SkillBridge_Team1/
├── package.json          # root scripts to run both apps together
├── backend/              # Express + MongoDB REST API (port 5000)
│   ├── .env.example      # copy to .env and fill in
│   └── src/
│       ├── index.js      # entry: loads env, connects DB, starts server
│       ├── app.js        # express app, middleware, route mounting
│       ├── controllers/
│       ├── db/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       └── utils/
└── frontend/             # React + Vite client (port 3000)
    ├── .env.example      # copy to .env
    ├── vite.config.ts    # proxies /api -> http://localhost:5000
    └── src/
        ├── components/
        ├── pages/
        └── services/api.js   # axios instance (uses VITE_API_BASE_URL)
```

## Setup

1. Install dependencies for the root, backend, and frontend:

   ```bash
   npm run install:all
   ```

2. Create the env files from the templates:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

   Fill in `MONGODB_URI` and the token secrets in `backend/.env`. Never commit `.env` files.

3. Run both apps:

   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000 (health check: `/api/test`)

## Scripts (from the repo root)

| Script                 | What it does                          |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start backend and frontend together   |
| `npm run dev:backend`  | Start only the backend (nodemon)      |
| `npm run dev:frontend` | Start only the frontend (Vite)        |
| `npm run build`        | Production build of the frontend      |
| `npm start`            | Start the backend without nodemon     |

## Environment variables

**backend/.env**: `PORT`, `CORS_ORIGIN`, `MONGODB_URI`, `ACCESS_TOKEN_SECRET`, `ACCESS_TOKEN_EXPIRY`, `REFRESH_TOKEN_SECRET`, `REFRESH_TOKEN_EXPIRY`

**frontend/.env**: `VITE_API_BASE_URL`. Defaults to `/api/v1`, which the Vite dev server proxies to the backend. For a deployed backend, set it to the full URL.

The original UI design is available on [Figma](https://www.figma.com/design/mZXqFE0WvwxonSAS5UBbXM/SkillBridge-Volunteer-Platform).
