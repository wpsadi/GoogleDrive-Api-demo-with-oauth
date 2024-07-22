import { config } from "dotenv"
import AppError from "../Utils/ErrorHandler.js";
import { verifyJWT } from "../Utils/setJWT.js";
config();

export const accountJWTexist = (raiseErr=true)=>{
    return (req,_,next)=>{

        const jwt = req.cookies[process.env.JWT_NAME]
        if(!jwt){
            req.userExist = false
            if(raiseErr){
                return next(new AppError("You are not Logged In",400))
            }
            
        }
        req.userExist = true
        try{
            const payload = verifyJWT(jwt,process.env.JWT_SECRET)
            req.user = payload
        }
        catch(err){
            req.userExist = false
            if (raiseErr){
                return next(new AppError("JWT token verification failed",401))
            }
        }
        
        next()
    }


}