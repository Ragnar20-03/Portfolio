"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGetProjectsController = exports.userAddProjectController = exports.userLoginController = exports.userRegisterController = void 0;
const conn_1 = require("../models/conn");
const zod_1 = require("../services/zod");
const urlName_1 = require("../services/urlName");
const jwt_1 = require("../services/jwt");
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const registerdData = req.body;
    conn_1.User.find({ email: registerdData.email }).then((res1) => {
        console.log("res1 : ", res1);
        if (res1.length == 0) {
            console.log("inside if");
            conn_1.User.create((0, zod_1.validateUser)(registerdData, "register")).then((res2) => {
                let url_name = (0, urlName_1.generateUrlName)(res2.email, res2._id || 999);
                conn_1.User.updateOne({ _id: res2._id }, // Find the user by _id
                { $set: { url_name: url_name } }).then((res3) => {
                    if (res3.acknowledged) {
                        res.status(501).json({
                            status: "success",
                            msg: "Account  registerd with Succesfull !",
                            url: `http://localhost:5100/${url_name}`
                        });
                    }
                });
            }).catch((err2) => {
                console.log("err2 is : ", err2);
                res.status(501).json({
                    msg: "Phone Number Must be Unique !"
                });
            });
        }
        else {
            res.status(501).json({
                status: "failed",
                msg: "Account already registerd with this email !"
            });
        }
    }).catch((err1) => {
        console.log("Something went wrong :  ", err1);
    });
});
exports.userRegisterController = userRegisterController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    const validatedData = (0, zod_1.validateUser)(loginData, "login");
    console.log("logindata Is : ", loginData);
    conn_1.User.findOne({ email: validatedData === null || validatedData === void 0 ? void 0 : validatedData.email }).then((res1) => {
        if (res1 == null) {
            res.json({
                msg: "  Account Not Fount !"
            });
        }
        else {
            console.log("res1 is : ", res1);
            if (res1.password == (validatedData === null || validatedData === void 0 ? void 0 : validatedData.password)) {
                res.cookie('token', (0, jwt_1.createToken)({ email: res1.email, uid: res1.id }));
                res.status(200).json({
                    msg: "account Login Suucesfull !"
                });
            }
            else {
                res.status(501).json({
                    msg: "Password Mismatch !"
                });
            }
        }
    }).catch((err1) => {
        console.log("something went Wrong !");
        res.status(500).json({
            msg: " Something went wrong !"
        });
    });
});
exports.userLoginController = userLoginController;
const userAddProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectData = {
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            description: req.body.description,
            url: req.body.url,
            technologies: req.body.technologies,
            images: req.body.images,
            github: req.body.github
        };
        console.log("Project data is : ", projectData);
        let token = req.cookies['token'];
        let uid = req.uid;
        conn_1.User.findOne({
            _id: uid
        }).then((res1) => {
            if (!res1) {
                return res.status(400).json({
                    msg: "User not found !"
                });
            }
            else {
                conn_1.Project.create(projectData).then((res2) => {
                    console.log("res2 : ", res2);
                    conn_1.User.updateOne({ _id: res1._id }, { $push: { projects: res2._id } }).then((updatedResult) => {
                        res.status(200).json({
                            updatedResult
                        });
                    });
                });
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Sometihng Went Wrong !"
        });
    }
});
exports.userAddProjectController = userAddProjectController;
const userGetProjectsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    conn_1.User.findOne({
        _id: req.uid
    }).then((res1) => {
        if (res1) {
            conn_1.Project.find().then((res3) => {
                res.status(200).json({
                    res3
                });
            });
        }
    });
});
exports.userGetProjectsController = userGetProjectsController;
