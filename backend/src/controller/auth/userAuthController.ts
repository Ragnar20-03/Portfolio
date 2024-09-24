import express, { Request, Response } from "express"
import { Auth } from "../../model/schema";

export const router = express.Router();

export const userRegisterController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const query = await Auth.create({
        email, password
    })
    res.json({
        query
    })
}

export const userLoginController = async (req: Request, res: Response) => {

}