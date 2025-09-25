import dotenv from "dotenv";
dotenv.config(); 
import express from "express"

import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"


const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)

// Connect to database first, then start server
const startServer = async () => {
    try {
        await connectDb()
        app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        })
    } catch (error) {
        console.error("Failed to start server:", error)
        process.exit(1)
    }
}

startServer()