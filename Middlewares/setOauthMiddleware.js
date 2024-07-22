import { getUserFromID } from "../Appwrite-Server/Database/Auth/getUserFromID.js"
import { UpdateAccessToken } from "../Appwrite-Server/Database/Auth/tokens/updateAccessToken.js"
import { oauth2Client } from "../GDrive/initDrive.js"
import AppError from "../Utils/ErrorHandler.js"

export const setOAuth = async (req,res,next)=>{
    if (!req.userExist){
        next(new AppError("This should not happen. If you are seeing this message this means that the server is misconfigured. What happend ? :The JWT token somehow got verified but it is either not present or I don't fully understand when this would exactly happen"))
    }
    const {userId} = req.user
    const userInfo = await getUserFromID(userId)

    if (!userInfo.found){
        next(new AppError("User doesn't exist. Kindly Login Again"))
    }
    const credentials = await UpdateAccessToken(userId)

    req.creds = credentials
    oauth2Client.setCredentials({
        ...credentials
    })
    next()
}