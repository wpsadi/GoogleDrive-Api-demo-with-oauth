import { oauth2Client, scopes } from "../../../../GDrive/initDrive.js";
import db from "../../init.js";

export const UpdateAccessToken =async  (userId)=>{
    try{
        const userCred = await db.getDocument(
            process.env.dbID,
            process.env.userCollectionID,
            userId
        )
        
        const tokens = userCred.tokens
        const { refresh_token,expiry_date } = tokens // getting the refresh tokn though its not needed but since we have it, won't make a difference


        // check for expiry
      
        if(Date.now() < new Date(expiry_date).getTime()){
            return {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token,
                expiry_date: new Date(expiry_date).getTime(),
                token_type:tokens.token_type,
                scope:(tokens.scope).join(" "),
                id_token:userCred.googleIdentityTokens.id_token
            }
        }




        oauth2Client.setCredentials(tokens)
        const newTokens = await oauth2Client.refreshAccessToken();
        const { credentials } = newTokens;

        // Updating the values in the database
        await db.updateDocument(
            process.env.dbID,
            process.env.tokenCollectionID,
            userCred.tokens["$id"],
            {
                ...{
                    access_token:credentials.access_token,
                    refresh_token:credentials.refresh_token,
                    token_type:credentials.token_type
                },
                scope:credentials.scope.split(" "),
                expiry_date:new Date(credentials.expiry_date).toISOString(),
                googleIdentityTokens:userCred.googleIdentityTokens["$id"],
                users:userId
            }
        )

        await db.updateDocument(
            process.env.dbID,
            process.env.googleIdentityTokenCollectionID,
            userCred.googleIdentityTokens["$id"],
            {
                id_token:userCred.googleIdentityTokens.id_token,
                users:userId,
                tokens:tokens["$id"]
            }
        )

        return credentials
    }
    catch(err){
        throw new Error(`Unable to get access token : ${err.message}`)
    }

}

