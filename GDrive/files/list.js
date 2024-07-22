import { drive } from "../initDrive.js";


export const FilesListDrive = async (nextPageToken="",limit=10)=>{
    const files = await drive.files.list({
        
        pageSize:limit,
        pageToken:nextPageToken
    })
    return files.data

}