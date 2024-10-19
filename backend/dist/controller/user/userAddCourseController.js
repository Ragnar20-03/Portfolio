"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAddPreviewController = exports.userUpdateCourseController = exports.userAddCourseController = void 0;
const schema_1 = require("../../model/schema");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("../../services/cloudinary");
const userAddCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authId = req.authId; // Assuming you're using middleware to get authId
        const profileId = req.profileId; // Assuming you're using middleware to get profileId
        // Extract the course details from the request body
        const { name, description, technologies, tutor, platform, year, preview } = req.body;
        // Validate if profileId exists
        const profile = yield schema_1.Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }
        // Create a new course
        const newCourse = yield schema_1.Course.create({
            name,
            description,
            technologies,
            tutor,
            platform,
            year,
            preview,
        });
        // Add the new course's ID to the profile's courses array
        yield schema_1.Profile.findByIdAndUpdate(profileId, {
            $push: { courses: newCourse._id }
        });
        return res.status(200).json({
            message: 'Course added successfully',
            course: newCourse
        });
    }
    catch (error) {
        console.log('Error adding course:', error);
        res.status(500).json({
            msg: 'Something went wrong!'
        });
    }
});
exports.userAddCourseController = userAddCourseController;
const userUpdateCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profileId = req.profileId;
    const courseId = req.params.courseId;
    // validation for courseId ( mongoose object id is valid or not ? : pending )
    try {
        const profileId = req.profileId;
        const courseId = req.params.courseId;
        // Validate if profileId exists
        const profile = yield schema_1.Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }
        // Check if the course is associated with the profile
        const isCourseAssociated = profile.courses.includes(new mongoose_1.default.Types.ObjectId(courseId));
        if (!isCourseAssociated) {
            return res.status(403).json({ message: 'This course is not associated with your profile' });
        }
        // Extract the updated course details from the request body
        const { name, description, technologies, tutor, platform, year, preview } = req.body;
        // Update the course details
        const updatedCourse = yield schema_1.Course.findByIdAndUpdate(courseId, {
            name,
            description,
            technologies,
            tutor,
            platform,
            year,
            preview,
        }, { new: true, runValidators: true } // Options to return the updated document and validate the fields
        );
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        return res.status(200).json({
            message: 'Course updated successfully',
            course: updatedCourse,
        });
    }
    catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});
exports.userUpdateCourseController = userUpdateCourseController;
const userAddPreviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const profileId = req.profileId;
        const courseId = req.params.courseId;
        // Validate if the courseId is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(courseId)) {
            return res.status(400).json({ message: 'Invalid Course ID' });
        }
        // Find the profile by profileId
        const profile = yield schema_1.Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }
        // Check if the course is associated with the profile
        const courseObjectId = new mongoose_1.default.Types.ObjectId(courseId);
        const isCourseAssociated = profile.courses.includes(courseObjectId);
        if (!isCourseAssociated) {
            return res.status(403).json({ message: 'This course is not associated with your profile' });
        }
        // Find the course to check for an existing preview
        const course = yield schema_1.Course.findById(courseObjectId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found!' });
        }
        // If no file is provided, remove the existing preview if it exists
        if (!req.file) {
            if (course.preview) {
                const prevPublicId = (_a = course.preview.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0]; // Extract public ID from the URL
                if (prevPublicId) {
                    yield (0, cloudinary_1.removeCoursePreview)(prevPublicId); // Function to remove the preview from cloud storage
                }
                // Remove the preview from the database
                yield schema_1.Course.findByIdAndUpdate(courseObjectId, { $set: { preview: "#" } }, // Removes the 'preview' field
                { new: true });
                return res.status(200).json({ message: "Preview removed successfully!" });
            }
        }
        else {
            // Validate the uploaded file if a file is provided
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: 'Invalid file type! Only images (JPEG, PNG, WebP) are allowed.' });
            }
            // If the course already has a preview, delete the old one from cloud storage
            if (course.preview) {
                const prevPublicId = (_b = course.preview.split('/').pop()) === null || _b === void 0 ? void 0 : _b.split('.')[0];
                if (prevPublicId) {
                    yield (0, cloudinary_1.removeCoursePreview)(prevPublicId); // Function to remove the preview from cloud storage
                }
            }
            // Generate a unique public ID for the new preview using course ID and current timestamp
            const publicId = `coursePreview_${(_c = profile.name) === null || _c === void 0 ? void 0 : _c.split(' ')[0]}_${courseId}_${Date.now()}`;
            // Upload the new file to cloud storage (assuming you're using Cloudinary or a similar service)
            const uploadResult = yield (0, cloudinary_1.uploadCousePreview)(req.file.buffer, publicId);
            // Update the course with the new preview URL
            const updatedCourse = yield schema_1.Course.findByIdAndUpdate(courseObjectId, { $set: { preview: uploadResult.secure_url } }, { new: true });
            return res.status(200).json({
                message: 'Course preview updated successfully',
                course: updatedCourse
            });
        }
    }
    catch (error) {
        console.error('Error updating course preview:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.userAddPreviewController = userAddPreviewController;
