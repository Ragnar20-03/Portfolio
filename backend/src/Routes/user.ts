import express from 'express';
import UserModel from '../model/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRETE } from '../config/config';
const router = express.Router();

import { userLoginController, userRegisterController} from "../controller/userController"
import userMiddleware from "../Middleware/UserMiddleware"

router.post('/login' , userLoginController);

router.post('/register', userMiddleware ,  userRegisterController);

export default router;
