import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/jwt";


export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = await req.cookies['token']
        if (!token) {
            return res.status(500).json({
                msg: "Unauthorized Request"
            })
        }
        next();
    } catch (error) {
        // console.log("something went Wrong : ", error);

        return res.status(500).json({
            msg: "Unauthorized Request"
        })
    }


}