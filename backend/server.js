import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const app = express()



const PORT = process.env.PORT

const start = async () => {
    try{
        app.listen(PORT, () => {
            console.log(`Server started on PORT : ${PORT}`)
        })
    }catch(error){
        console.log("Failed to start the Server")
    }
}

start()