import { drive } from "../initDrive.js";



export const AboutGetDrive = async (fields="*")=>{
 

    const result = await drive.about.get({
        fields:fields || "*"
    })
    return result.data   
}

export const AboutGetDriveHelp = async (req,res,next)=>{
    res.status(200).json({
        status:true,
        statusCode:200,
        message:"About Drive",
        data:{
            fields:{
                type:"string",
                description:"Selector specifying a subset of fields to include in the response.",
                example:"user(kind,me)",
                default:"*",
                values:"user, storageQuota, importFormats, exportFormats, maxUploadSize",
                instruction:"Pass it in the query parameter and iwill be direcly placesd in the arguments eg: `/get?fields=user, storageQuota, importFormats, exportFormats, maxUploadSize`"

            }
        }
    })  
}