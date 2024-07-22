import { Router } from "express";
import { WithGoogle, WithGoogleCB } from "../Controllers/AuthController.js";
import { accountJWTexist } from "../Middlewares/jwt.middleware.js";
import { errMiddleware } from "../Middlewares/err.middle.js";
import AppError from "../Utils/ErrorHandler.js";

const authRouter = Router();

authRouter.get("/with/google", accountJWTexist(false),WithGoogle);
authRouter.get("/cb/google", WithGoogleCB);

authRouter.use("*",(req,res,next)=>{

    next(new AppError("These Routes belong Auth Router",404))
})

// Error Middleware
authRouter.use(errMiddleware)


export default authRouter;
