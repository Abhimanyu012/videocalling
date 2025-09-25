import express from 'express'
import { User } from '../models/user.model.js'
const router = express.Router()

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router;