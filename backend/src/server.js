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




const corsOptions = {
  origin: 'https://videocalling-frontend-eight.vercel.app', // Your frontend origin
  credentials: true, // Allow cookies and authentication headers
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));


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