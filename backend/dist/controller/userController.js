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
exports.userProjectGetController = exports.userProjectUploadController = exports.userRegisterController = exports.userLoginController = void 0;
const schema_1 = require("../model/schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Implement your login logic here
    const email = req.body.email;
    const password = req.body.password;
    try {
        const isExist = yield schema_1.UserModel.findOne({ email });
        if (!isExist) {
            return res.status(400).json({
                msg: " Account Not Found !"
            });
        }
        else {
            if (isExist.password == password) {
                let token = jsonwebtoken_1.default.sign({ uid: isExist._id }, config_1.JWT_SECRETE, {
                    expiresIn: "1d"
                });
                return res.status(200).json({
                    msg: "Login Successful",
                    token
                });
            }
        }
    }
    catch (error) {
        return res.status(500).json({ msg: "Something went wrong!" });
    }
});
exports.userLoginController = userLoginController;
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fname, lname, ph, email, address, gitLink, linkdein, threads, password } = req.body;
    try {
        // Check if the user already exists by email
        const existingUser = yield schema_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already registered" });
        }
        // Create a new user
        const newUser = yield schema_1.UserModel.create({ fname, lname, ph, email, address, gitLink, linkdein, threads, password });
        return res.status(201).json({ msg: "Registered successfully!", newUser });
    }
    catch (error) {
        console.log("error is : ", error);
        return res.status(500).json({ msg: "Something went wrong!" });
    }
});
exports.userRegisterController = userRegisterController;
const userProjectUploadController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, timeline, gitLink, liveLink, technologies, tools } = req.body;
    try {
        let userId = req.uid;
        schema_1.ProjectModel.create({ title, description, timeline, gitLink, liveLink, technologies, tools }).then((response) => {
            res.status(200).json({
                status: "success",
                msg: "Project Added Successfully !"
            });
        }).catch((error) => {
            res.status(501).json({
                status: "failed",
                msg: "Unabke to Add Project !"
            });
        });
    }
    catch (error) {
        res.status(501).json({
            status: "failed",
            msg: "Something went wrong !"
        });
    }
});
exports.userProjectUploadController = userProjectUploadController;
const userProjectGetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    schema_1.ProjectModel.find({}).then((response) => {
        res.status(200).json({
            status: "success",
            projects: response
        });
    }).catch((error) => {
        res.status(501).json({
            status: "failed",
            msg: "Something went wrong !"
        });
    });
});
exports.userProjectGetController = userProjectGetController;
