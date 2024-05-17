import dotenv from 'dotenv'
dotenv.config({path:'./config.env'})
import mongoose from 'mongoose';


const url = process.env.DATABASE as string



let client:any;
export const connectToMongooseDB = async ()=>{
    if(!client){
        try{
          mongoose.connection.on('connected',()=>console.log('connected to mongoose Database successfully'));
          mongoose.connection.on('disconnected',()=>console.log('disconnected from mongoose Database'));
          mongoose.connection.on('reconnected', () => console.log('reconnected to mongoose Database'));
          mongoose.connection.on('disconnecting', () => console.log('disconnecting from mongoose Database'));

           client = await mongoose.connect(url)

        

        }catch(error){
         console.log(error)
        }
    }
    return client
}

export const getConnectedClient = () => client

