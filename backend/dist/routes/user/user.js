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
const userCourseController_1 = require("../../controller/user/userCourseController");
const userCertificationController_1 = require("../../controller/user/userCertificationController");
const userCompetitionController_1 = require("../../controller/user/userCompetitionController");
const userExtracurricularController_1 = require("../../controller/user/userExtracurricularController");
exports.router = express_1.default.Router();
exports.router.get('/details/:profileId', userProfileController_1.userGetProfileDetailsController);
exports.router.put('/updateProfile', userMiddleware_1.M_userTokenMiddleware, userProfileController_1.userUpdateProfileController);
exports.router.put('/updateAvatar', userMiddleware_1.M_userTokenMiddleware, cloudinary_1.upload.single('file'), userProfileController_1.userUpdateAvatarController);
// --------------------------------------------------------------------------------------------------------
// Project
exports.router.post('/addProject', userMiddleware_1.M_userTokenMiddleware, userProjectController_1.userAddProjectController);
exports.router.put('/updateProject/:projectId', userMiddleware_1.M_userTokenMiddleware, userProjectController_1.userUpdateProjectController);
exports.router.put('/projectImages/:projectId', userMiddleware_1.M_userTokenMiddleware, cloudinary_1.upload.array('images', 3), userProjectController_1.userProjectImageController);
// --------------------------------------------------------------------------------------------------------
// education
exports.router.post('/addEducation', userMiddleware_1.M_userTokenMiddleware, userEducationController_1.userAddEducationController);
exports.router.put('/updateEducation/:educationId', userMiddleware_1.M_userTokenMiddleware, userEducationController_1.userUpdateEducationController);
// --------------------------------------------------------------------------------------------------------
// Course
exports.router.post('/addCourse', userMiddleware_1.M_userTokenMiddleware, userCourseController_1.userAddCourseController);
exports.router.post('/updateCourse/:courseId', userMiddleware_1.M_userTokenMiddleware, userCourseController_1.userUpdateCourseController);
exports.router.put('/addCoursePreview/:courseId', userMiddleware_1.M_userTokenMiddleware, cloudinary_1.upload.single('file'), userCourseController_1.userAddPreviewController);
// --------------------------------------------------------------------------------------------------------
// Certification
exports.router.post('/addCertification', userMiddleware_1.M_userTokenMiddleware, userCertificationController_1.userAddCertificationController);
exports.router.put('/updateCertification/:certificationId', userMiddleware_1.M_userTokenMiddleware, userCertificationController_1.userUpdateCertificationController);
exports.router.put('/addCertificationPreview/:certificationId', userMiddleware_1.M_userTokenMiddleware, cloudinary_1.upload.single('file'), userCertificationController_1.userCertificationPreviewController);
// router.put('/addCoursePreview/:courseId', M_userTokenMiddleware, upload.single('file'), userAddPreviewController)
// --------------------------------------------------------------------------------------------------------
// Competition
exports.router.post('/addCompetition', userMiddleware_1.M_userTokenMiddleware, userCompetitionController_1.userAddCompetitionController);
exports.router.put('/updateCompetition/:competitionId', userMiddleware_1.M_userTokenMiddleware, userCompetitionController_1.userUpdateCompetitionController);
exports.router.put('/addCompetitionPreview/:competitionId', userMiddleware_1.M_userTokenMiddleware, cloudinary_1.upload.single('file'), userCompetitionController_1.userCompetitionPreviewController);
// --------------------------------------------------------------------------------------------------------
// Extracurricular
exports.router.post('/addExtracurricular', userMiddleware_1.M_userTokenMiddleware, userExtracurricularController_1.userAddExtraCurricularController);
exports.router.put('/updateExtracurricular/:extracurricularId', userMiddleware_1.M_userTokenMiddleware, userExtracurricularController_1.userUpdateExtracurricular);
// router.put('/addCompetitionPreview/:competitionId', M_userTokenMiddleware, upload.single('file'), userCompetitionPreviewController)
// --------------------------------------------------------------------------------------------------------
// resume 
exports.router.post('/resume', userMiddleware_1.M_userTokenMiddleware, cloudinary_1.upload.single('file'), userResumeController_1.userResumeController);
