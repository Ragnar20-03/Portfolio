import express from "express"
import { userAssignRegisterController } from "../../controller/auth/userAuthController";

export const authRouter = express.Router();

authRouter.post('/register', userAssignRegisterController)