import { Request, Response } from "express";
import { IProject, Project, User } from "../models/conn";
import { validateUser } from "../services/zod";
import { generateUrlName } from "../services/urlName";
import { createToken } from "../services/jwt";
import { JwtPayload } from "jsonwebtoken";
import { JWT_SECRETE } from "../config";
import jwt from "jsonwebtoken"

export const userRegisterController = async (req: Request, res: Response) => {
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
}


export const userLoginController = async (req: Request, res: Response) => {
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

}

export const userAddProjectController = async (req: Request, res: Response) => {
    try {
        const projectData: IProject = {
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
        let token = req.cookies['token'];
        let uid = req.uid

        User.findOne({
            _id: uid
        }).then((res1) => {
            if (!res1) {
                return res.status(400).json({
                    msg: "User not found !"
                })
            }
            else {
                Project.create(projectData).then((res2: any) => {
                    console.log("res2 : ", res2);
                    User.updateOne({ _id: res1._id }, { $push: { projects: res2._id } }).then((updatedResult: any) => {
                        res.status(200).json({
                            updatedResult
                        })
                    })
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Sometihng Went Wrong !"
        })
    }
}

export const userGetProjectsController = async (req: Request, res: Response) => {
    User.findOne({
        _id: req.uid
    }).then((res1) => {
        if (res1) {
            Project.find().then((res3) => {
                res.status(200).json({
                    res3
                })
            })
        }
    })
}