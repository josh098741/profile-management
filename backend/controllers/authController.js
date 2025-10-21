import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import cloudinary from '../lib/cloudinary.js'

const generateToken = (res,userId) => {
    const token = jwt.sign({ id:userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    res.cookie("token",token,{
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export const signup = async (req,res) => {
    try{
        const { name, email, password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({ message: "All Input Fields are required" })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if(!emailRegex.test(email)){
            return res.status(400).json({ message: "Enter a valid email" })
        }

        const userExists = await User.findOne({ email })

        if(userExists){
            return res.status(400).json({ message: "User Already exists" })
        }

        const user = await User.create({ name,email,password })

        if(!user){
            return res.status(400).json({ message: "User could not be created" })
        }
        generateToken(res, user._id)

        res.status(201).json({
            message: "Signup successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            } 
        })
        
    }catch(error){
        console.log("Error in signup controller",error)
        res.status(500).json({ message: "Internal server error in Signup" })
    }
}

export const login = async (req,res) => {
    try{
        const { email,password } = req.body

        if(!email || !password){
            return res.status(400).json({ message: "All Input fields are required" })
        }

        const user = await User.findOne({ email })

        if(!user){
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const isMatch = await user.comparePassword(password)

        if(!isMatch){
            return res.status(401).json({ message: "Invalid credentials" })
        }

        generateToken(res, user._id)
        res.status(200).json({
            message: "Logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    }catch(error){
        console.log("Error in Login controller",error)
        res.status(500).json({ message: "Internal server error in Login" })
    }
}

export const logout = async (req,res) => {
    try{
        res.cookie("token", "", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0)
        })
        res.status(200).json({ message: "Logged out successfully" })
    }catch(error){
        console.error("Error in logout controller:",error)
        res.status(500).json({ message: "Internal server error in logout" })
    }
}

export const updateAvatar = async (req,res) => {
    try{
        const { avatar } = req.body

        if(!avatar){
            return res.status(400).json({ message: "avatar pic is required" })
        }

        const userId = req.user._id

        const uploadResponse = await cloudinary.uploader.upload(avatar)

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar: uploadResponse.secure_url },
            { new: true }
        )

        res.status(200).json(updatedUser)
    }catch(error){
        console.error("Error in update profile",error)
        res.status(500).json({ message: "Internal server error in update avatar" })
    }
}