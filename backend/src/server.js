import express from "express"
import cookieParser from "cookie-parser"
import "dotenv/config"
import cors from "cors"
import path, { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import { connectDB } from "./config/db.js"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/users.route.js"
import chatRoutes from "./routes/chat.route.js"



const app = express()
const PORT = process.env.PORT || 5000

// CORS configuration - Allow both local and production frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://videocalling-frontend-one.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean) // Remove undefined values

console.log('🔒 Allowed CORS origins:', allowedOrigins)

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log('❌ CORS blocked for origin:', origin)
      callback(new Error(`Not allowed by CORS: ${origin}`))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}))


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)

if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.join(__dirname, "../../frontend/dist")
  app.use(express.static(frontendDistPath))
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"))
  })
}



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  });