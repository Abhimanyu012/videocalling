import express from "express"
import "dotenv/config"
import mongoose from "mongoose"
connectDB()
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./config/db.js"

const app = express()
const PORT = process.env.PORT || 5000

app.use("/api/auth",authRoutes)


app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})