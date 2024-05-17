
 import jwt from 'jsonwebtoken'
 import {NextFunction,} from 'express'
 import dotenv from 'dotenv';
  dotenv.config({path:'./config.env'});
import AppError from './appError';
export const createSendToken = (
    userid:any,
     ) =>{
        return new Promise((resolve,reject)=>{
            const payload = {
                id:userid,
            }
            const secret = process.env.JWT_SECRET as string;
        
            const options = {
                expiresIn:process.env.JWT_EXPIRES_IN
            }
            jwt.sign(payload,secret,options,(err, token)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(token)
                }
            });
        })
    
        
}

export const decodeToken = (token:string, secret:string, next:NextFunction)=>{
    const decodeToken = jwt.verify(token ,secret,(err,payload) =>{
        if(err){
            console.log(err)
           return next( new AppError('incorrect token', 401))
        }else{
            payload
            next()
        }
    })
    return decodeToken
}

