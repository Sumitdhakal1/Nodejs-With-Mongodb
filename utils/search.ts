import {getAll, createOne, updateOne, getOne} from '../controller/factoryHandler'
import Admin from '../models/adminModel'
import User from '../models/userModel';
import { NextFunction, Request,Response } from 'express';
// import AppError from '../utils/appError';
// export const getAllUserFromName = async(req:Request,res:Response, next:NextFunction)=>{
//     try{
//           const user = await User.find({ 
//             "$or":[{userName:{$regex:req.params.key || '', $options:'i'}}]
      
//           })
//           if(user.length == 0){
//             return next (new AppError('No user found',404))
//           }
  
//           res.status(200).json({
            
//               user
//           })
//     }catch(error){
//       console.log('error', error)
//     }
//   }

  // export const getAllUserFromName = async(req:Request,res:Response)=>{
//   try{
//         const {search} = req.query
//         if (!search || typeof search !== 'string' || search.trim() === '') {
//             return res.status(400).json({ message: 'Invalid search term' });
//           }
      
//         const escapedSearchTerm =search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
//         console.log(search)
//         const user = await User.find({userName:{$regex:new RegExp(escapedSearchTerm, 'i')}})

//         res.status(200).json({
//             user
//         })
//   }catch(error){
//     console.log('error', error)
//   }
// }

// export const getAllUserFromName = async(req:Request,res:Response)=>{
//   try{
//         const keyword = req.query.keyword
//         const users = await User.aggregate([{$match:{email:keyword}}])
//           res.status(200).json({users})
//   }catch(error){
//     console.log('error', error)
//   }
// }


// export const getAllUserFromName = async(req:Request,res:Response)=>{
//   try{
//         const keyword = req.query
//         const users = await User.aggregate([{$match:{email:keyword}}])
//           res.status(200).json({users})
//   }catch(error){
//     console.log('error', error)
//   }
// }
