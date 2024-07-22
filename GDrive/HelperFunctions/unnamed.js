import { drive } from "../initDrive.js";



export const listFilesDrive = async (req,res,next)=>{
    const files = await drive.files.list({
        // pageSize:10,
        limit:10,
        fields:"user(kind,me)"
    })
    return files.data   
} 

// export const Next