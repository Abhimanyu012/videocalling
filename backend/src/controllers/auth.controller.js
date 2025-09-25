import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { upsertStreamUser } from "../utils/stream.js"

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
        });
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || ""
            })
            console.log(`Stream user Created for${newUser.fullName}`)
        }
        catch (error) {
            console.log("error creating in streamUser: ", error)
        }

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
//login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: "all the fields are required" })

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }
        // Password verification using bcrypt
        const isPasswordValid = await user.matchPassword(password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" })

        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        })
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        })
        console.log("login succesfully")
        res.status(200).json({ success: true, message: "Login successfully", user })

    } catch (error) {
        console.log("Error in login controller: ", error)
        res.status(500).json({ message: "Internal server error", error })
    }
}
//logout


export const logout = (_req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    })
    console.log("logout successfully")
    res.status(200).json({ success: true, message: "Logged out successfully" })
}

export const onboard = async (req, res) => {
    try {
        const userId = req.user._id
        const { fullName, nativeLanguage, learningLanguage, location, bio } = req.body
        if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !learningLanguage && "learningLanguage",
                    !nativeLanguage && "nativeLanguage",
                    !location && "location"
                ].filter(Boolean)
            }
            )
        }
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {
                ...req.body,
                isOnboarded: true
            },
            { new: true }
        );
        if (!updateUser) return res.status(404).json({ message: "User not found" })
        try {
            await upsertStreamUser({
                id: updateUser._id.toString(),
                fullName: updateUser.fullName,
                image: updateUser.profilePic || "",

            })
            console.log(`Stream user updated after onboarding for ${updateUser.fullName}`)
        } catch (streamError) {
            console.log("Error updating during stream user during onboarding", streamError.message)
        }


        res.status(200).json({ success: true, user: updateUser });

    }
    catch (error) {
        console.log("onboarding error: ", error)
        res.status(500).json({ message: "Internal server error" });
    }
}
