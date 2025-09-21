import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({
                message: "Unathorized - No token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({
                message: "Unathorize - Inavlid token"
            })
        }
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(401).json({
                message: "Unatathorize - User is not found"
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log("Error is protect route middlleware", error)
    }
}