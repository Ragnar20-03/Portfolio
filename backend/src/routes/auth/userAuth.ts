import express from "express"
import { userRegisterController } from "../../controller/auth/userAuthController";

export const authRouter = express.Router();

authRouter.post('/register', userRegisterController)