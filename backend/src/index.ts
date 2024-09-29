import express, { Request, Response } from "express"
import { PORT } from "./config/dotenv";
import { connect_db } from "./config/db";
import { cloudinary_start } from "./config/cloudinary";
import { OTP } from "./services/otp/otp"
import { sendOTP } from "./services/email/sendOtp";
import { authRouter } from "./routes/auth/userAuth";
import { router as userRouter } from "./routes/user/user";
import cors from "cors"
import cookieParser from "cookie-parser";
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser here
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


app.listen(PORT, async () => {
    let instance = OTP.getInstance();
    await connect_db();
    await cloudinary_start();
    console.log(`Server Started on port number ${PORT}`);

})