import { getUserIdentity } from "../Google/getIdentity.js"
import AppError from "../Utils/ErrorHandler.js"

export const getUser = async (req,res,next)=>{
 try{
    const user = await getUserIdentity({
        access_token:req.creds.access_token,
    })
    res.json({
        status:true,
        statusCode:200,
        message:"User Found",
        data:user
    } || {
        status:false,
        statusCode:404,
        message:"User not found"
    })
 }
 catch(err){
    next(new AppError(err.message))
 }
}