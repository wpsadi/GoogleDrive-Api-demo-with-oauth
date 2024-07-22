import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRouter from "./Routes/authRoutes.js";
import { errMiddleware } from "./Middlewares/err.middle.js";
import userInfoRouter from "./Routes/UserInfoRoutes.js";
import { accountJWTexist } from "./Middlewares/jwt.middleware.js";
import { setOAuth } from "./Middlewares/setOauthMiddleware.js";
import DriveRouter from "./Routes/DriveRoutes.js";
import DriveHelpRouter from "./Routes/DriveHelp.js";

const app = express();

// Default Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}))
app.use(cookieParser())


// Routes
app.get("/",(req,res)=>{
    res.send("Hello World from Drive API tutorial")
})
app.use("/auth",authRouter)
app.use("/user",userInfoRouter)
app.use("/drive",accountJWTexist(true),setOAuth,DriveRouter)
app.use("/help/drive",DriveHelpRouter)



// Universal route
app.use("*",(req,res)=>{
    res.send("You are on the universal page")
})

// Error Middleware
app.use(errMiddleware)

export default app;
