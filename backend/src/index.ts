import express, { Request, Response } from "express"
import { PORT } from "./config/dotenv";
import { connect_db } from "./config/db";
import { cloudinary_start } from "./config/cloudinary";
import { userRouter } from "./routes/user/user"
import { sendOTP } from "./services/email/sendOtp";
import { authRouter } from "./routes/auth/userAuth";
const app = express();
app.use(express.json())
app.use('/api/auth', authRouter)

app.get('/otp', async (req, res) => {
    await sendOTP("ap7827681@gmail.com", "OTP Validation ", "45678", "no text")
    res.json({
        msg: "mail sent successfully!"
    })
})

app.post('/verify-otp', async (req: Request, res: Response) => {
    if (req.body.otp == 45678) {
        return res.status(200).json({
            msg: "Otp is valid !"
        })

    }
    return res.status(500).json({
        msg: "Invalid OTP !"
    })
})
app.listen(PORT, async () => {
    await connect_db();
    await cloudinary_start();
    console.log(`Server Started on port number ${PORT}`);

})