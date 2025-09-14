import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body
    try {
        if (!email || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" })
        }
        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailregex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists ,please use a different one "
            })
        }
        const idx = Math.floor(Math.random() * 100 + 1)
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: randomAvatar
        })

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        })
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        res.status(201).json({ success: true, message: "User created successfully", user: newUser })

    } catch (error) {
        console.log("Error in signup controller")
        res.status(500).json({ message: "Internal server error" })
    }
}
export const login = (_req, res) => {
    res.send("this login controller")
}
export const logout = (_req, res) => {
    res.send("this logout controller")
}
