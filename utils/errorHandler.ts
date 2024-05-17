import { NextFunction, Request, Response } from "express";
import { IError,IErrors} from "./types/interfaces";
import AppError from "./appError";


const handleCastErrorDB= (err:any) =>{
    const message = `Invalid ${err.path}: ${err.value}.`;
   return new AppError(message, 404)

}

const handelValidationError =(err:any)=>{
    // const errors = Object.values(err.errors).map((el:any)=>el.message) 
    // const message = `Invalid input data. ${errors.join('. ')}`;
    const message ='error'
    return new AppError(message,400)
}

const sendDevError = (err:any, req: Request, res: Response) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status:err.status,
            message: err.message,
            stack: err.stack
        })
    }
}

const sendProdError = (err:any,res: Response) => {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status:err.status,
                message: err.message
            })
        }
        console.log('error',err)

        return res.status(500).json({
            message:'something went wrong',
            err:err.message
        })
    
}


export const globalErrorHandler = (err:any,req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') { 
        sendDevError(err, req, res)
    }
else if(process.env.NODE_ENV === 'production'){
   let error ={...err}
   error.message = err.message;
   if(error.name === 'CastError') error = handleCastErrorDB(error)
   if(error.name === 'ValidationError') error = handelValidationError(error)
 sendProdError(error, res)


  }


}

