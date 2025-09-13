# Videocalling MERN Skeleton

A minimal MERN stack template to kickstart your videocalling app development.

## Project Structure

```
videocalling/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   └── config/
│   ├── src/index.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── hooks/
    │   ├── context/
    │   ├── services/
    │   ├── utils/
    │   └── styles/
    ├── index.html
    ├── src/main.jsx
    └── .
```

## Getting Started

### Backend (Node.js 18+)

```bash
npm init -y
npm install express mongoose cors dotenv zod jsonwebtoken bcryptjs morgan
npm install --save-dev nodemon
# Copy .env.example to .env and configure your environment variables
npm run dev
```

### Frontend (Vite + React)

```bash
npm create vite@latest . -- --template react
npm install
npm run dev
```

> **Note:**  
> Set `CORS_ORIGIN` in your backend `.env` file to match your Vite dev server URL.

