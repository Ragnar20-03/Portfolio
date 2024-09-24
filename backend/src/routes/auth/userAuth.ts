import express from "express"
import { userGetOtpController, userLoginController, userVerifyOtp_RegisterController } from "../../controller/auth/userAuthController";
import { M_chechAuthRegisterData } from "../../middlewares/authMiddleware";

export const authRouter = express.Router();

authRouter.post('/get-otp', userGetOtpController)
authRouter.post('/verify-otp', M_chechAuthRegisterData, userVerifyOtp_RegisterController)
authRouter.post('/login', userLoginController)