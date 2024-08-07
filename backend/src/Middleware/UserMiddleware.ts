import { NextFunction, Request, Response } from 'express'
import jwtX from 'jsonwebtoken'
import { JWT_SECRETE } from '../config/config';

declare global {
    namespace Express {
        interface Request {
            uid?: string; // or the appropriate type, e.g., number | string
        }
    }
}

const userMiddleware = (req : Request    , res : Response  , next : NextFunction) => {

    if (!req.headers.authorization )
    {
        console.log("here");
        
        return res.status(501).json({
            msg : " UAuthorized Request !"
        })
    }
    let token = req.headers.authorization.split(' ') [ 1 ] ;
    if (!token) 
    {
        return res.status(501).json({
            msg : " UAuthorized Request !"
        })
    }
    let decodedToken :any  = jwtX.verify(token , JWT_SECRETE) ; 
    if (!decodedToken) 
    {
        return res.status(501).json({
            msg : " UAuthorized Request !"
        })
    }

    req.uid = decodedToken.uid
    next () ;
    
}

 export  default userMiddleware
