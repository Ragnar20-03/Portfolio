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
exports.userLoginController = exports.userVerifyOtp_RegisterController = exports.userGetOtpController = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const sendOtp_1 = require("../../services/email/sendOtp");
const otp_1 = require("../../services/otp/otp");
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema_1 = require("../../model/schema");
const jwt_1 = require("../../services/jwt");
let bcrypt_salt = 10;
exports.router = express_1.default.Router();
let otpInstance = otp_1.OTP.getInstance();
const userGetOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email) {
            return res.status(401).json({
                msg: "Email is required for sending otp !"
            });
        }
        const { email, password } = req.body;
        let current_otp;
        if (otpInstance) {
            current_otp = yield otpInstance.generateOTP(email);
        }
        // this case is very rare !
        else {
            return res.status(500).json({
                msg: "OTP insatnce is null !"
            });
        }
        yield (0, sendOtp_1.sendOTP)(email, current_otp);
        return res.json({
            msg: `OTP is sent succesfully to ${email} `
        });
    }
    catch (err) {
        // console.log("error is : ", err);
        return res.status(500).json({
            msg: "Something went wrong !"
        });
    }
});
exports.userGetOtpController = userGetOtpController;
const userVerifyOtp_RegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, otp } = req.body;
        if (!email || !password || !otp) {
            return res.status(401).json({
                msg: "All fields are required!"
            });
        }
        if (otpInstance === null || otpInstance === void 0 ? void 0 : otpInstance.validateOtp(email, otp)) {
            const hashedPassword = yield bcrypt_1.default.hash(password, bcrypt_salt);
            // Create user in Auth collection
            const newUser = yield schema_1.Auth.create({ email, password: hashedPassword });
            // Create an empty profile for the user
            const newProfile = {
                avatar: '#', // Default avatar
                name: '', // Default empty name
                about: '', // Default empty about
                descriptors: '', // Default empty descriptors
                email, // Email from the registration
                github: '', // Default empty GitHub
                linkedin: '', // Default empty LinkedIn
                skills: [], // Default empty skills array
                projects: [], // Default empty projects array
                education: [], // Default empty education array
                certifications: [], // Default empty certifications array
                courses: [], // Default empty courses array
                competitions: [], // Default empty competitions array
                extracurricular: [] // Default empty extracurricular array
            };
            const createdProfile = yield schema_1.Profile.create(newProfile); // Create profile in Profile collection
            // Update the Auth document with the profile ID
            newUser.profileId = createdProfile._id; // Set profileId to the new profile's ID
            yield newUser.save(); // Save the updated Auth document
            let token = (0, jwt_1.createToken)(newUser._id.toString());
            return res.status(200).json({
                otp_msg: "success",
                msg: "Registration Successful!",
                token
            });
        }
        return res.status(401).json({
            otp_msg: "Invalid OTP!"
        });
    }
    catch (error) {
        console.log("error is :  ", error);
        return res.status(500).json({
            msg: "Something went wrong!"
        });
    }
});
exports.userVerifyOtp_RegisterController = userVerifyOtp_RegisterController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(401).json({
                msg: "All Feilds Are required !"
            });
        }
        let query = yield schema_1.Auth.findOne({ email: req.body.email });
        if (query) {
            let isPasswordValid = yield bcrypt_1.default.compare(req.body.password, query.password);
            if (isPasswordValid) {
                return res.status(200).json({
                    msg: "Login Successful ! "
                });
            }
            return res.status(401).json({
                msg: "password Mismatch !"
            });
        }
        else {
            return res.status(400).json({
                msg: "User Not Found !"
            });
        }
    }
    catch (error) {
        console.log("error is : ", error);
        return res.status(500).json({
            msg: "something went wrong !"
        });
    }
});
exports.userLoginController = userLoginController;
