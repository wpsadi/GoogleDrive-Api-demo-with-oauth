import { Router } from "express";
import { errMiddleware } from "../Middlewares/err.middle.js";
import AppError from "../Utils/ErrorHandler.js";
import {  AboutGet, FilesList, ViewFile } from "../Controllers/DriveController.js";


const DriveRouter = Router()

// About
DriveRouter.get("/about/get",AboutGet)

// Files
DriveRouter.get("/files/list",FilesList)
DriveRouter.use("/files/get",ViewFile)


DriveRouter.use("*",(req,res,next)=>{

    next(new AppError("These Routes belong Drive Router",404))
})

// Error Middleware
DriveRouter.use(errMiddleware)
export default DriveRouter;