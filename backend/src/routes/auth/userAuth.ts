import express from "express"
import { userGetOtpController, userVerifyOtp_RegisterController } from "../../controller/auth/userAuthController";

export const authRouter = express.Router();

authRouter.post('/get-otp', userGetOtpController)
authRouter.post('/verify-otp', userVerifyOtp_RegisterController)
