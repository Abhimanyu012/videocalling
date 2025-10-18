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

// CORS configuration



const allowedOrigins = [
  "https://videocalling-frontend-eight.vercel.app",
  "http://localhost:5173"
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
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