import { getAll, createOne, updateOne, getOne } from './factoryHandler'
import Admin from '../models/adminModel'
import User from '../models/userModel';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import AppError from '../utils/appError';
import sharp from 'sharp';
import { IFiles, IGetUserAuthInfoRequest} from '../utils/types/interfaces'



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

export const multerImage = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'image', maxCount: 3 }
])

export const resizeMulterImage = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const files =req.files as IFiles
  if (!files || !files.imageCover)  return next()
  req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(files.imageCover[0].buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/admin${req.body.imageCover}`);

  req.body.image = []
 files.images.map(async(file, i) => {

      const filename = `user-${req.params.id}-${Date.now()}-${i++}.jpeg`;
      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/admin${filename}`);
      req.body.image.push(filename)
    })




  next()

}





export const getAllUser = getAll(User)
export const getOneUser = getOne(User)
export const createOneAdmin = createOne(Admin)
export const updateOneAdmin = updateOne(Admin)




export const getAllUserFromName = async (req: Request, res: Response) => {
  try {
    const users = await User.find(req.query)
    res.status(200).json({ users })
  } catch (error) {
    console.log('error', error)
  }
}



