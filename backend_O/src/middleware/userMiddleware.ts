

import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken"
import { JWT_SECRETE } from "../config";

declare namespace Express {
    export interface Request {
        uid?: string
    }
}



export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = await req.cookies['token']


        if (!token) {
            return res.status(500).json({
                msg: "Unauthorized Request"
            })
        }
        let verifiedToken = jwt.verify(token, JWT_SECRETE)
        if (verifiedToken) {
            interface JwtPayload {
                uid: string
            }

            const { uid } = jwt.verify(token, JWT_SECRETE) as JwtPayload

            req.uid = uid
            next(); // Call next middleware or route handler
        } else {
            return res.status(401).json({
                msg: "Unauthorized Request: Token invalid"
            });
        }
    } catch (error) {
        console.log("something went Wrong : ", error);

        return res.status(500).json({
            msg: "Unauthorized Request"
        })
    }


}