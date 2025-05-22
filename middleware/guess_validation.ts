import express , {Request , Response , NextFunction} from 'express';
 
export function  guess_validation(req:Request , res:Response , next: NextFunction){
    const guess= req.body();
    const guessValidNum = /^\d+$/;
    if(!guessValidNum.test(guess)){
        res.status(403).end("the guess nust be numbers only");
    }
    const digits = guess.split('');
    const uniqueDigits = new Set(digits);
    if(!( uniqueDigits.size === 4 )){
        res.status(403).end("the guess is not valid");
    }
  const guessValidSize = /^\d{4}$/;
  if(!guessValidSize.test(guess)){
    res.status(403).end("the guess nust be with 4 digits");
}

    next();
}