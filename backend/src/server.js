import express from "express"
import cookieParser from "cookie-parser"
import "dotenv/config"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/users.route.js"
import chatRoutes from "./routes/chat.route.js"



const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)


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