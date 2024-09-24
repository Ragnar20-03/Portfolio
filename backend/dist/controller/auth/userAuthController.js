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
exports.router = express_1.default.Router();
let otpInstance = otp_1.OTP.getInstance();
const userGetOtpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let current_otp;
        if (otpInstance) {
            current_otp = yield otpInstance.generateOTP(email);
        }
        else {
            return res.status(500).json({
                msg: "OTP insatnce is null !"
            });
        }
        yield (0, sendOtp_1.sendOTP)(email, current_otp);
        res.json({
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
                msg: "All Feilds Are required !"
            });
        }
        if (otpInstance === null || otpInstance === void 0 ? void 0 : otpInstance.validateOtp(email, otp)) {
            let hashedPassword = yield bcrypt_1.default.hash(password, 10);
            let query = schema_1.Auth.create({ email, password: hashedPassword });
            return res.status(200).json({
                otp_msg: "success",
                msg: "Registration Succesfull !"
            });
        }
        return res.status(401).json({
            otp_msg: "Invalid OTP !"
        });
    }
    catch (error) {
        console.log("error is : ", error);
        return res.status(500).json({
            msg: "Something went wrong !"
        });
    }
});
exports.userVerifyOtp_RegisterController = userVerifyOtp_RegisterController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.userLoginController = userLoginController;
