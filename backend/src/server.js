import express from "express"
import cookieParser from "cookie-parser"
import "dotenv/config"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/auth.route.js"
import usersRoutes from "./routes/users.route.js"


const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/users", usersRoutes)


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
  connectDB()
})