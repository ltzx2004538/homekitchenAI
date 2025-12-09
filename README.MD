# HomeKitchenAI Monorepo

This repository contains both the backend (Node.js/Express) and frontend (Next.js) for HomeKitchenAI.

## Structure
- `fe/` — Next.js frontend (TypeScript, Tailwind, Sass)
- Backend files in root (`server.ts`, `routes/`, etc.)

## Running Locally

### 1. Start Backend
```bash
npm install
npm run dev
```
Backend runs on port defined in `.env` (default: 3001).

### 2. Start Frontend
```bash
cd fe
npm install
npm run dev
```
Frontend runs on port 3001 or 3000 (Next.js default).

## API
- Backend endpoint: `POST /api/recipe`
- Frontend connects to backend for recipe generation

## Development Notes
- CORS is enabled for local API calls.
- Update `.env` for backend secrets and port.
- Use `src/pages`, `src/components`, `src/styles` in frontend for modular code.

---
See individual README files in `fe/` and root for more details.
