import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

import connectDB from './lib/db.js'
import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(cors({
    origin: "https://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT

const start = async () => {
    try{
        await connectDB(MONGO_URI)
        app.listen(PORT, () => {
            console.log(`Server started on PORT : ${PORT}`)
        })
    }catch(error){
        console.log("Failed to start the Server")
    }
}

start()