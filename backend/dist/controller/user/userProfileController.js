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
exports.userUpdateAvatarController = exports.userUpdateProfileController = exports.userGetProfileDetailsController = void 0;
const schema_1 = require("../../model/schema");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("cloudinary");
const userGetProfileDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.params.profileId;
        // Validate if profileId is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(profileId)) {
            return res.status(400).json({ msg: 'Invalid Profile ID' });
        }
        // Fetch the user's profile and populate the necessary fields
        const userProfile = yield schema_1.Profile.findById(profileId)
            .populate('projects') // Populate the projects array
            .populate('education') // Populate the education array
            .populate('certifications') // Populate the certifications array
            .populate('courses') // Populate the courses array
            .populate('competitions') // Populate the competitions array
            .populate('extracurricular') // Populate the extracurricular array
            .exec();
        // If the profile is not found
        if (!userProfile) {
            return res.status(404).json({ msg: 'USer not found!' });
        }
        // Return the populated user profile details
        return res.status(200).json({
            userProfile
        });
    }
    catch (error) {
        console.log("error is  : ", error);
        return res.status(500).json({
            msg: "Something went wrong !"
        });
    }
});
exports.userGetProfileDetailsController = userGetProfileDetailsController;
const userUpdateProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.profileId; // Assuming profileId is set in the request object
        // Fields that can be updated directly in the profile schema
        const allowedFields = ['avatar', 'name', 'about', 'descriptors', 'email', 'github', 'linkedin', 'skills'];
        // Create an object with only the allowed fields from the request body
        const updateFields = allowedFields.reduce((acc, field) => {
            if (field in req.body) {
                if (field === 'skills' && Array.isArray(req.body[field])) {
                    // Ensure skills is an array of Skill objects
                    acc[field] = req.body[field].filter((skill) => {
                        if (typeof skill === 'object' && skill !== null) {
                            const { category, skills } = skill;
                            return typeof category === 'string' && Array.isArray(skills) && skills.every(s => typeof s === 'string');
                        }
                        return false;
                    });
                }
                else {
                    acc[field] = req.body[field];
                }
            }
            return acc;
        }, {});
        // Update the profile
        const updatedProfile = yield schema_1.Profile.findByIdAndUpdate(profileId, { $set: updateFields }, { new: true, runValidators: true });
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({
            message: 'Profile updated successfully',
            profile: updatedProfile
        });
    }
    catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.userUpdateProfileController = userUpdateProfileController;
const userUpdateAvatarController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const profileId = req.profileId;
        const profile = yield schema_1.Profile.findOne({ _id: profileId });
        if (!profile) {
            return res.status(404).json({ msg: "Profile not found!" });
        }
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: "No file found!" });
        }
        // Previous avatar (if it exists)
        const prevAvatar = profile.avatar;
        // Wrap the Cloudinary upload_stream in a promise
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary_1.v2.uploader.upload_stream({ folder: 'uploads/avatar' }, (error, result) => {
                    if (error) {
                        reject(error); // Reject the promise if an error occurs
                    }
                    else {
                        resolve(result); // Resolve the promise with the result
                    }
                });
                stream.end(buffer); // Pass the buffer (file data)
            });
        };
        // Upload the file to Cloudinary and await the result
        const result = yield streamUpload(req.file.buffer);
        // Update the profile with the new avatar URL
        profile.avatar = result.secure_url;
        yield profile.save(); // Save the updated profile
        // Optionally: Delete the previous avatar from Cloudinary
        if (prevAvatar) {
            const publicId = (_a = prevAvatar.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0];
            if (publicId) {
                yield cloudinary_1.v2.uploader.destroy(`uploads/${publicId}`);
            }
        }
        // Return the response with the new avatar URL
        return res.json({ message: 'Upload successful', avatar: result.secure_url });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});
exports.userUpdateAvatarController = userUpdateAvatarController;
