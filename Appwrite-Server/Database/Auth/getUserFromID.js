import db from "../init.js"

export const  getUserFromID =async (userId)=>{
    const srch = await db.getDocument(
        process.env.dbID,
        process.env.userCollectionID,
        userId
    )

    if (!srch){
        return {
            found:false
        }
    }
    else{
        return {
            found:true,
            user:srch
        }
    }
} 