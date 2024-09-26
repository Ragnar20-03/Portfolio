import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "../config/dotenv";
import { Certificate } from "crypto";

export interface extendRequest extends Request {
    authId?: any,
    profileId?: any
}

export const M_userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.cookies['token'];
        let verifiedToken = <JwtPayload>jwt.verify(token, JWT_SECRET);
        if (verifiedToken) {
            req.authId = verifiedToken.authId
            req.profileId = verifiedToken.profileId;
            next();
        } else {
            return res.status(401).json({ msg: "UnAuthorized Request !" });
        }
    } catch (error) {
        console.log("error is : ", error);
        return res.status(500).json({
            msg: "Unauthorized Request !"
        })

    }
}