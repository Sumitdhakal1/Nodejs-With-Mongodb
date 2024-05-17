import express from "express";
import cors from 'cors'
import userRoute from './routes/userRoute'
import  adminRoute from  './routes/adminRoute'
import {globalErrorHandler} from './utils/errorHandler'
import AppError from "./utils/appError";
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({
  origin:'http://localhost:5173',
  methods:["GET","POST","PUT","DELETE"],
 allowedHeaders:["Content-type", "Authorization"],

}))

app.use('/api',userRoute)
app.use('/api', adminRoute)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  

app.use(globalErrorHandler)

export default app