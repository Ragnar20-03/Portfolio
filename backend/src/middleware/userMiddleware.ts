

import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/jwt";
import { JWT_SECRETE } from "../config";



export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = await req.cookies['token']
        if (!token) {
            return res.status(500).json({
                msg: "Unauthorized Request"
            })
        }
        let verifiedToken = verifyToken(token);
        console.log("verfied token ", verifiedToken);

        if (verifiedToken && verifiedToken.uid) {
            req.uid = verifiedToken.uid || ""
            next();
        } else {
            return res.status(401).json({
                msg: "Unauthorized Request: Token invalid"
            })
        }
    } catch (error) {
        // console.log("something went Wrong : ", error);

        return res.status(500).json({
            msg: "Unauthorized Request"
        })
    }


}