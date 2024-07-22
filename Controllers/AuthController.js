import { SaveToken } from "../Appwrite-Server/Database/Auth/tokens/saveToken.js";
import AppError from "../Utils/ErrorHandler.js";
import { oauth2Client, scopes } from "../GDrive/initDrive.js";
import { UpdateAccessToken } from "../Appwrite-Server/Database/Auth/tokens/updateAccessToken.js";
import { createJWT } from "../Utils/setJWT.js";
import { config } from "dotenv";
config();

export const WithGoogle = async (req, res, next) => {
  try {
    if (req.userExist){
      throw  new AppError("User is already Loggged In",401)
    }
    const url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",

      // If you only need one scope you can pass it as a string
      scope: scopes,
    });
    res.redirect(url);
  } catch (err) {
    next(new AppError(err.message));
  }
};

export const WithGoogleCB = async (req, res, next) => {
  try {
    const { code } = req.query;
    if (!code) {
      throw new AppError("Authorization Code not recieved",403);
    }

    const { tokens } = await oauth2Client.getToken(code);
    const {userId,tokenId} = await SaveToken({ ...tokens });
    // console.log(tokens)

    oauth2Client.setCredentials(tokens);


    const jwt = createJWT({
      userId,
      tokenId
    },process.env.JWT_SECRET)

    res.cookie(process.env.JWT_NAME,jwt,{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:"strict",
      maxAge:365*24*60*60*1000
    })


    res.status(201).json({
      status: true,
      message: "Your Details are successfully stored",
    });
  } catch (err) {
    next(new AppError(err.message));
  }
};
