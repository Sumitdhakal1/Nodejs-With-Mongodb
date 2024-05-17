import mongoose from 'mongoose'
import {IAdmin} from '../utils/types/interfaces'
import { NextFunction } from 'express';

const adminSchema = new mongoose.Schema<IAdmin>({
   username:{
     type:String,
     unique:true,
     required:[true,'this field cannot be empty']
   },
   password:{
   type:String,
   minlength:[8,'password must be minimum of 8 characters'],
   maxlength:[20,'password must be maxLength of 20 characters']
   },
   fullName:{
    type:String,
   },
   email:{
    type:String,
    unique:true
   },
   phoneNumber:{
    type:Number,
    unique:true
   },imageCover:{
     type:String
   },image:[String]
});


// adminSchema.pre(/^find/, function(next){
//   this.populate().populate({
//     path:'user'
//   })
// })
const User = mongoose.model('admin', adminSchema);

export default User;