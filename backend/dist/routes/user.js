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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const conn_1 = require("../models/conn");
const zod_1 = require("../services/zod");
const jwt_1 = require("../services/jwt");
const urlName_1 = require("../services/urlName");
exports.router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
                res.cookie('token', (0, jwt_1.createToken)({ email: res1.email }));
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
}));
exports.router.get('/details/:url_name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        conn_1.User.findOne({ url_name: req.params.url_name }).then((res1) => {
            res.status(200).json({
                details: res1
            });
        });
    }
    catch (error) {
        // console.log("Error is  :", error);
        res.status(500).json({
            msg: "Something went wrong !"
        });
    }
}));
exports.router.get(`/projects/:email`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        conn_1.User.findOne({
            email: req.params.email
        }).then((res1) => {
            res.status(200).json({
                data: res1
            });
        });
    }
    catch (error) {
    }
}));
