import express, { Request, Router, Response } from "express"
export const router = express.Router();
import jwt, { JwtPayload } from "jsonwebtoken"

interface IDecode {
    uid: string | JwtPayload
    email: string | JwtPayload

}

import { IProject, Project, User } from "../models/conn";
import { validateUser } from "../services/zod"
import { createToken } from "../services/jwt";
import { userMiddleware } from "../middleware/userMiddleware";
import { generateUrlName } from "../services/urlName";
import { JWT_SECRETE } from "../config";
import { userAddProjectController, userGetProjectsController, userLoginController, userRegisterController } from "../controller/userController";

router.post('/register', userRegisterController)

router.post('/login', userLoginController)

router.get('/details/:url_name', async (req, res) => {
    try {
        User.findOne({ url_name: req.params.url_name }).then((res1) => {
            res.status(200).json({
                details: res1
            })
        })
    } catch (error) {
        // console.log("Error is  :", error);

        res.status(500).json({
            msg: "Something went wrong !"
        })
    }
})

router.get(`/projects/:url_name`, async (req, res) => {
    try {
        User.findOne({

        }).then((res1) => {
            res.status(200).json({
                data: res1
            })
        })
    } catch (error) {

    }
})

router.get('/projects', userMiddleware, userGetProjectsController)

router.get("/addProject", userMiddleware, userAddProjectController)