import { Router } from "express";
import AppError from "../Utils/ErrorHandler.js";
import { errMiddleware } from "../Middlewares/err.middle.js";
import { accountJWTexist } from "../Middlewares/jwt.middleware.js";
import { getUser } from "../Controllers/UserInfoController.js";
import { setOAuth } from "../Middlewares/setOauthMiddleware.js";

const userInfoRouter = Router()

userInfoRouter.get("/info",accountJWTexist(true),setOAuth,getUser)


userInfoRouter.use("*",(req,res,next)=>{
    next(new AppError("These Routes belong UserInfo Router",404));
})

// Error Middleware
userInfoRouter.use(errMiddleware)


export default userInfoRouter;