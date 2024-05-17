 import {NextFunction, Request, Response} from 'express'


import {IObjectTypes} from './types/interfaces' 

export const sendResponse = (obj:IObjectTypes)=>{

    const {message,token,id,res}= obj;
    return res.json({
        message:message,
        id:id,
        token:token
    })
}

 //generic typescript
//   export function loginResponse<ElementType>(token:ElementType, id:ElementType){
//         return{
//       message:'login successfully',
//       token:123,
//         id:true,
        
//      }
//     }