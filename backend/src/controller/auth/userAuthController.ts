import express, { Request, Response } from "express"
import { sendOTP } from "../../services/email/sendOtp";
import { OTP } from "../../services/otp/otp"
import bcrypt from "bcrypt"
import { BCRYPT_SALT } from "../../config/dotenv";
import { Auth } from "../../model/schema";


export const router = express.Router();
let otpInstance = OTP.getInstance()


export const userGetOtpController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        let current_otp;
        if (otpInstance) {
            current_otp = await otpInstance.generateOTP(email);
        }
        else {
            return res.status(500).json({
                msg: "OTP insatnce is null !"
            })
        }
        await sendOTP(email, current_otp)
        res.json({
            msg: `OTP is sent succesfully to ${email} `
        })
    }
    catch (err) {
        // console.log("error is : ", err);

        return res.status(500).json({
            msg: "Something went wrong !"

        })
    }
}

export const userVerifyOtp_RegisterController = async (req: Request, res: Response) => {
    try {
        const { email, password, otp } = req.body;
        if (!email || !password || !otp) {
            return res.status(401).json({
                msg: "All Feilds Are required !"
            })
        }
        if (otpInstance?.validateOtp(email, otp)) {
            let hashedPassword = await bcrypt.hash(password, 10)

            let query = Auth.create({ email, password: hashedPassword })
            return res.status(200).json({
                otp_msg: "success",
                msg: "Registration Succesfull !"
            })
        }
        return res.status(401).json({
            otp_msg: "Invalid OTP !"
        })
    } catch (error) {
        console.log("error is : ", error);

        return res.status(500).json({
            msg: "Something went wrong !"
        })
    }
}

export const userLoginController = async (req: Request, res: Response) => {

}