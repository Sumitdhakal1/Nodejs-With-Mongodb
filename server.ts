import app from './index'
import mongoose from 'mongoose'
 import {connectToMongooseDB} from './database/database'
import {config as dotenvConfig} from 'dotenv'
dotenvConfig({path:'./config.env'})
const port = process.env.PORT || 3006

const DB = (process.env.DATABASE as string)

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });
  


async function startServer(){
    await  connectToMongooseDB()
    app.listen(port,()=>{
        console.log(`app is running in port ${port}`)
    }
    )

}

process.on('unhandledRejection', (err:any) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
  });

startServer()