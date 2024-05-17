import User from "../models/userModel";
import multer from "multer";
import { Request, Response, NextFunction } from 'express'
import { IGetUserAuthInfoRequest } from "../utils/types/interfaces";
import { getOne, createOne, updateOne } from './factoryHandler'
import sharp from 'sharp'
import AppError from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";

//  type DestinationCallBack =(error: Error | null, destination:string )=> void
type FileNameCallBack = (error: Error | null, filename: string) => void
//  type MulterCallBack =(error:Error | null, multerFilter:any)=> void



// export const getMe = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
//     req.params.id = req.user.id
//     next()
// }

// const multerStorage = multer.diskStorage({
//     destination: (
//         req: Request,
//         file: Express.Multer.File,
//         cb
//     ) => {
//         cb(null, 'public/img/users')
//     },
//     filename: (
//         req: IGetUserAuthInfoRequest,
//         file: Express.Multer.File,
//         cb: FileNameCallBack
//     ) => {
//         const extension = file.mimetype.split('/')[1];
//         cb(null, `user-${req.params.id}-${Date.now()}.${extension}`)
//     }
// })

const multerStorage = multer.memoryStorage()

const multerFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: any
) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! please upload only image', 400), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

// const uploadImages = upload.fields([
//     {name: 'imageCover', maxCount:1},
//     {name:'image', maxCount:3}
// ])

// upload.array('images', 5)//upload multiple image

export const uploadUserPhoto = upload.single('Photo') // it produces req.file

export const resizeUserPhoto = async (req: Request, res: Response, next: NextFunction) => {

  
    if (!req.file) {
        return res.send('data')
    }

    req.file.filename = `user-${req.params.id}-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img.users${req.file.filename}`)

    next()
}



export const updatedMe = async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.password) {
        return next(
            new AppError('This route is not for password updates. Please use /updateMyPassword.', 400)
        )
    }

    const object = req.body
    if (req.file) object.Photo = req.file.filename

    const updateUser = await User.findByIdAndUpdate(req.params.id, object, {
        new: true,
        runValidation: true
    });
    res.status(200).json({
        data: {
            user: updateUser
        }
    })
}

export const getOneUser = getOne(User)
export const createOneUser = createOne(User)
// export const updateOneUser = updateOne(User)
