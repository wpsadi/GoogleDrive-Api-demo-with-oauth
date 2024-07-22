import { google } from "googleapis";
import { config } from "dotenv";
import { oauth2Client } from "../GDrive/initDrive.js";
import AppError from "../Utils/ErrorHandler.js";
config();

// const clientID = process.env.YOUR_CLIENT_ID

export const getUserIdentity = async ({ access_token }) => {
  if (!access_token) {
    throw new Error("Access Token not recieved while fethcing User Profile");
  }
  
  oauth2Client.setCredentials({
    access_token: access_token,
  });


  // Create the oauth2 service
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const userInfo = await oauth2.userinfo.get();

  return userInfo.data;
};
