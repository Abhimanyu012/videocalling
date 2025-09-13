# Videocalling - MERN Skeleton

This repo contains a minimal MERN folder structure ready to build a videocalling app.

## Structure
- backend/ — Express + MongoDB
  - src/{controllers,routes,models,middlewares,services,utils,validations,config}
  - src/index.js (server bootstrap)
  - .env.example
- frontend/ — React (Vite-ready)
  - src/{components,pages,hooks,context,services,utils,styles}
  - index.html, src/main.jsx
  - .env.example

## Quick start
Backend (Node 18+):
- npm init -y
- npm i express mongoose cors dotenv zod jsonwebtoken bcryptjs morgan
- npm i -D nodemon
- Create .env from .env.example and run dev script

Frontend (Vite + React):
- npm create vite@latest . -- --template react
- npm i
- npm run dev

Update CORS_ORIGIN in backend .env to match Vite dev URL.
