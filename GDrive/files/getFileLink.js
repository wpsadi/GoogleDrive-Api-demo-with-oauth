import { drive } from "../initDrive.js";


export const FilesViewDrive = async (fileId)=>{

    const file = await drive.files.get({
        fileId: fileId,
        fields: '*',
      });
    return file .data

}