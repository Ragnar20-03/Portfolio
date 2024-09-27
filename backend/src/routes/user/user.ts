import express from "express";

import { userGetProfileDetailsController, userUpdateProfileController } from "../../controller/user/userProfileController";
import { M_userTokenMiddleware } from "../../middlewares/userMiddleware";
import { userAddProjectController, userUpdateProjectController } from "../../controller/user/userProjectController";
import { userAddEducationController } from "../../controller/user/userEducationController";


export const router = express.Router();

router.get('/details/:profileId', userGetProfileDetailsController)
router.put('/updateProfile', M_userTokenMiddleware, userUpdateProfileController)
// ------------------------------------------------------------------------------
router.post('/addProject', M_userTokenMiddleware, userAddProjectController)
router.put('/updateProject/:projectId', M_userTokenMiddleware, userUpdateProjectController)
// ------------------------------------------------------------------------------

router.post('/addEducation', M_userTokenMiddleware, userAddEducationController)