import { Response, Request } from "express";
import { Types } from "mongoose";
import AppError from "../appError";

export interface IObjectTypes {
    id: Types.ObjectId;
    token: any;
    message: string;
    res: Response;
}


export interface IUser {
    email: String,
    password: any,
    userName: string,
    fullName: String,
    bio: String,
    Photo: any,
    createdAt: String
}


export interface IAdmin {
    username: string,
    fullName: string,
    email: string
    phoneNumber: Number
    password: any
    imageCover: any
    image: any
};


export interface IError {
    statusCode: number,
    status: string,
    message: String,
    isOperational: any,
    name: any,
    stack: any,
    path: any,
    value: any
}

export interface IErrors {
    path: any,
    value: any
}

export interface IFile {
    fieldname: any;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
}

export interface IFiles {
    [fieldname: string]: IFile[];
    
}

export interface IGetUserAuthInfoRequest extends Request {
    user?: any,
    id?: any,
    buffer?: Buffer,


}


export interface filesName extends File {
    imageCover: any
    fieldname: any;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number,
    lastModified: any;
}



