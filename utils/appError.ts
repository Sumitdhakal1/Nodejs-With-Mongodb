class AppError extends Error{
    statusCode:number
    status:string
    isOperational:any
    path?: string; // Make path optional with ?
    value?: any;
    constructor(message:any, statusCode:any){
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor);


    }
}

export default AppError

interface AppError extends Error{

}