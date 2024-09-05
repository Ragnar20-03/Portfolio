import express, { Request, Router, Response } from "express"
export const router = express.Router();
import { register } from "../types/schema";
import { User } from "../db/conn";

router.post('/register', async (req: Request, res: Response) => {
    const registerdData: register = req.body
    User.create(registerdData).then((response) => {
        res.json({
            msg: "success !"
        })
    })
})

