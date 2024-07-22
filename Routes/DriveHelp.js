import { Router } from "express";
import { errMiddleware } from "../Middlewares/err.middle.js";
import AppError from "../Utils/ErrorHandler.js";
import { AboutGetDriveHelp } from "../GDrive/About/get.js";


const DriveHelpRouter = Router()

// About
DriveHelpRouter.get("/about/get",AboutGetDriveHelp)



DriveHelpRouter.use("*",(req,res,next)=>{
    next(new AppError("These Routes belong Drive helper Router",404))
})

// Error Middleware
DriveHelpRouter.use(errMiddleware)
export default DriveHelpRouter;