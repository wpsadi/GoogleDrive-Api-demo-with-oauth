import { Query } from "node-appwrite"
import db from "../init.js"

export const  getUserFromEmail =async (email)=>{
    const srch = await db.listDocuments(
        process.env.dbID,
        process.env.userCollectionID,
        [Query.equal("email",email),Query.limit(1)]
    )

    if (srch.total===0){
        return {
            found:false
        }
    }
    else{
        return {
            found:true,
            user:srch.documents[0]
        }
    }
} 