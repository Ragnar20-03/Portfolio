import express from 'express';

const router = express.Router();

import { userLoginController, userProjectGetController, userProjectUploadController, userRegisterController} from "../controller/userController"
import userMiddleware from "../Middleware/UserMiddleware"

router.post('/login' , userLoginController);

router.post('/register', userMiddleware ,  userRegisterController);

router.post('/project' , userMiddleware ,  userProjectUploadController )
router.get('/project' , userMiddleware ,  userProjectGetController )

export default router;
