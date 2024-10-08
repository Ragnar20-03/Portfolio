"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const userProfileController_1 = require("../../controller/user/userProfileController");
const userMiddleware_1 = require("../../middlewares/userMiddleware");
const userProjectController_1 = require("../../controller/user/userProjectController");
const userEducationController_1 = require("../../controller/user/userEducationController");
const cloudinary_1 = require("../../config/cloudinary");
const userResumeController_1 = require("../../controller/user/userResumeController");
exports.router = express_1.default.Router();
exports.router.get('/details/:profileId', userProfileController_1.userGetProfileDetailsController);
exports.router.put('/updateProfile', userMiddleware_1.M_userTokenMiddleware, userProfileController_1.userUpdateProfileController);
exports.router.put('/updateAvatar', userMiddleware_1.M_userTokenMiddleware, cloudinary_1.upload.single('file'), userProfileController_1.userUpdateAvatarController);
// --------------------------------------------------------------------------------------------------------
// Project
exports.router.post('/addProject', userMiddleware_1.M_userTokenMiddleware, userProjectController_1.userAddProjectController);
exports.router.put('/updateProject/:projectId', userMiddleware_1.M_userTokenMiddleware, userProjectController_1.userUpdateProjectController);
exports.router.put('/images/:projectId', userMiddleware_1.M_userTokenMiddleware, cloudinary_1.upload.array('images', 3), userProjectController_1.userProjectImageController);
// --------------------------------------------------------------------------------------------------------
// education
exports.router.post('/addEducation', userMiddleware_1.M_userTokenMiddleware, userEducationController_1.userAddEducationController);
// --------------------------------------------------------------------------------------------------------
// resume 
exports.router.post('/resume', userMiddleware_1.M_userTokenMiddleware, cloudinary_1.upload.single('file'), userResumeController_1.userResumeController);
