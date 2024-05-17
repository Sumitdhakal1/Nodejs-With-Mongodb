import User from "../models/userModel";
import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import {createSendToken ,decodeToken} from "../utils/jwtToken";
import AppError from '../utils/appError'
import dotenv from 'dotenv';
import { IGetUserAuthInfoRequest } from "../utils/types/interfaces";
import {passwordValidator, isEmailValid} from '../utils/validator'
import cookie from 'cookie'
import { sendResponse} from "../utils/responseHandler";
dotenv.config();

// interface ownRequest extends Request {
//   user?: any
// }
  
export const signup = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { email, password} = req.body
    if (!email || !password) {
     return next (new AppError('please enter your email or password', 401))

    }
  
    // if(!userName){
    //   return next(new AppError('please enter your username', 401))
    // }

     if(password.length < 8){
      return next(new AppError('Password length must be greater than 8',500))
     }
    const emailError = isEmailValid(email)
    if(emailError){
      return next(new AppError(emailError, 401))
    }
     const passwordError = passwordValidator(password)
     if(passwordError){
      return next (new AppError(passwordError,401))
     }
    const newUser = await User.create({ email, password})
    // handelResponse(newUser)
    // return next(new ResponseHandle(data,status))

        res.status(201).json({
      status: 'success',
      data: {
        user: newUser

      }
    })

  } catch (error) {
    console.log(error)
  }
}

export const login = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return next(new AppError('please provide your email or password', 401))

    }
    const user = await User.findOne({ email }).select('+password')
    if(!user || !(await bcrypt.compare(password, user.password)) ){
      return next(new AppError('incorrect email or password', 401))
  }
     const token = await createSendToken(user._id);
     const id = user._id
     res.setHeader('set-Cookie',cookie.serialize('name', token as string, {
      httpOnly:true,
      maxAge: 1*1000*60,
      secure:true
     }))

     const responseObj={
      message:'login successfully',
      token,
        id,
        res
     }


 sendResponse(responseObj)

  } catch (error) {
    console.log(error)
  }
}


export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  

  if (!token) {
   return next(new AppError('You are not logged in! Please log in to get access.',404))
  }

 const data = process.env.JWT_SECRET as string
  decodeToken(token,data,next)
}


 
export const logout = async(req:Request, res:Response, next:NextFunction)=>{

 res.setHeader('set-Cookie',cookie.serialize('name', 'loggedOut', {
     httpOnly:true,
     maxAge: 0,
     secure:true
    }))
    res.status(200).json({
     message:'success'
    })

 }

export const removeCookie = async(req:Request, res:Response, next:NextFunction)=>{
const cookieName =res.clearCookie('name')

if(!cookieName){
return next(new AppError('You are not logged in!.',404))
}else{
  next()
}

}
  
