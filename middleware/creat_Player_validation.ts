import express , {Request , Response , NextFunction} from 'express';
 
export function creatPlayerValidation(req:Request , res:Response , next: NextFunction){
    const {userName , password , email}= req.body();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailValid.test(email)){
        res.status(403).end("the email is not valid"); 
    }
    const passValid = /^[A-Za-z0-9]{4,8}$/;
    if(!passValid.test(password)){
        res.status(403).end("the password is not valid");
    }
    next();
}

























