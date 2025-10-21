import express from 'express'
import { signup, login, logout, updateAvatar } from '../controllers/authController.js'
import { protectRoute } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile", protectRoute, updateAvatar)

router.get("/check", protectRoute, (req,res) => {
    res.status(200).json({ 
        message: "Protect route functional",
        user: req.user 
    })
})

export default router