import db from "../../init.js"


export const  getTokenFromID =async (tokenId)=>{
    const srch = await db.getDocument(
        process.env.dbID,
        process.env.tokenCollectionID,
        tokenId
    )

    if (!srch){
        return {
            found:false
        }
    }
    else{
        return {
            found:true,
            tokens:srch
        }
    }
} 