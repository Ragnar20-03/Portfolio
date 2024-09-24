"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../../controller/auth/userAuthController");
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/get-otp', userAuthController_1.userGetOtpController);
exports.authRouter.post('/verify-otp', userAuthController_1.userVerifyOtp_RegisterController);
