"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../../controller/auth/userAuthController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
exports.authRouter = express_1.default.Router();
exports.authRouter.post('/get-otp', userAuthController_1.userGetOtpController);
exports.authRouter.post('/verify-otp', authMiddleware_1.M_chechAuthRegisterData, userAuthController_1.userVerifyOtp_RegisterController);
exports.authRouter.post('/login', userAuthController_1.userLoginController);
