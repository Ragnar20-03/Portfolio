import express, { Request, Router, Response } from "express"
export const router = express.Router();

import { Iproject, Project, User } from "../models/conn";
import { validateUser } from "../services/zod"
import { createToken, verifyToken } from "../services/jwt";
import { userMiddleware } from "../middleware/userMiddleware";
import { generateUrlName } from "../services/urlName";

router.post('/register', async (req: Request, res: Response) => {

    const registerdData = req.body


    User.find({ email: registerdData.email }).then((res1) => {
        console.log("res1 : ", res1);

        if (res1.length == 0) {
            console.log("inside if");

            User.create(validateUser(registerdData, "register")).then((res2) => {
                let url_name = generateUrlName(res2.email, res2._id || 999)
                User.updateOne(
                    { _id: res2._id },                 // Find the user by _id
                    { $set: { url_name: url_name } },   // Update the url_name field
                ).then((res3) => {
                    if (res3.acknowledged) {
                        res.status(501).json({
                            status: "success",
                            msg: "Account  registerd with Succesfull !",
                            url: `http://localhost:5100/${url_name}`
                        })
                    }

                });

            }).catch((err2) => {
                console.log("err2 is : ", err2);

                res.status(501).json({
                    msg: "Phone Number Must be Unique !"
                })
            })
        }
        else {
            res.status(501).json({
                status: "failed",
                msg: "Account already registerd with this email !"
            })

        }
    }).catch((err1) => {
        console.log("Something went wrong :  ", err1);
    })

})

router.post('/login', async (req: Request, res: Response) => {
    const loginData = req.body
    const validatedData = validateUser(loginData, "login");
    console.log("logindata Is : ", loginData);


    User.findOne({ email: validatedData?.email }).then((res1) => {
        if (res1 == null) {
            res.json({
                msg: "  Account Not Fount !"
            })
        }
        else {
            console.log("res1 is : ", res1);
            if (res1.password == validatedData?.password) {
                res.cookie('token', createToken({ email: res1.email, uid: res1.id }))
                res.status(200).json({

                    msg: "account Login Suucesfull !"
                })
            }
            else {
                res.status(501).json({
                    msg: "Password Mismatch !"
                })
            }
        }
    }).catch((err1) => {
        console.log("something went Wrong !");
        res.status(500).json({
            msg: " Something went wrong !"
        })
    })

})

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

router.get("/addProject", userMiddleware, async (req, res) => {
    const projectData: Iproject = {
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        url: req.body.url,
        technologies: req.body.technologies,
        images: req.body.images,
        github: req.body.github
    }
    console.log("Project data is : ", projectData);

    User.findOne({
        id: req.userID
    }).then((res1) => {
        if (!res1) {

        }
    })


})