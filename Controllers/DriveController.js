import { AboutGetDrive } from "../GDrive/About/get.js";
import { FilesViewDrive } from "../GDrive/files/getFileLink.js";
import { FilesListDrive } from "../GDrive/files/list.js";
import AppError from "../Utils/ErrorHandler.js";

// About
export const AboutGet = async (req, res, next) => {
  try {
    const { fields } = req.query || {
      fields: "*",
    };
    const result = await AboutGetDrive(fields);
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "About Drive",
      data: result,
    });
  } catch (err) {
    next(new AppError(err.message));
  }
};

// Files

//List
export const FilesList = async (req, res, next) => {
  try {
    const nextPage = req.query.next || "";
    const limit = req.query.limit || 10;


    const result = await FilesListDrive(nextPage, limit);
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Files List",
      data: result,
    });
  } catch (err) {
    next(new AppError(err.message));
  }
};

// Get File
export const ViewFile = async (req, res, next) => {
  try {
    const { fileId } = req.query ;
    if (!fileId){
        throw new Error("fileId is required")
    }
    const result = await FilesViewDrive(fileId);
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "File Details",
      data: {
        fileView:`https://drive.usercontent.google.com/download?id=${fileId}&export=view`,
        ...result
      },
    });
  } catch (err) {
    next(new AppError(err.message));
  }
};
