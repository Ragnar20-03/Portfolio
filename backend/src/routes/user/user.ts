import express from "express";

import { userGetDetailsController } from "../../controller/user/userProfileController";

export const router = express.Router();

router.get('/details/:profileId', userGetDetailsController)
router.post('/updateProfile',)