import express, { Request, Response } from "express"
import { Auth } from "../../model/schema";
import { sendOTP } from "../../services/email/sendOtp";
import { generateOTP } from "../../services/otp/generate_validate_OTP";

export const router = express.Router();

export const userAssignRegisterController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const otp = generateOTP();

    sendOTP(email, otp)
    res.json({
        msg: `OTP is sent succesfully to ${email} `
    })
}

export const userLoginController = async (req: Request, res: Response) => {

}