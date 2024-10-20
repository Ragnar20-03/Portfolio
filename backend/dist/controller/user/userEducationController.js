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
exports.userUpdateEducationController = exports.userAddEducationController = void 0;
const schema_1 = require("../../model/schema"); // Assuming you have a Profile model
const mongoose_1 = __importDefault(require("mongoose"));
// Controller to add education details
const userAddEducationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.profileId;
        // Extract education details from the request body
        const { collegeName, degree, place, duration, percentage } = req.body;
        const newEducation = {
            collegeName, degree, place, duration, percentage
        };
        // Update the profile with the new education information
        const addEducation = yield schema_1.Education.create(newEducation);
        if (addEducation) {
            console.log("Addeducation is : ", addEducation);
            const updatedProfile = yield schema_1.Profile.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(profileId), { $push: { education: addEducation._id } }, { new: true });
            if (!updatedProfile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            return res.status(200).json({
                msg: 'Education added successfully',
                updatedEducation: addEducation
            });
        }
        else {
            res.status(500).json({ message: 'Unable to add Education' });
        }
    }
    catch (error) {
        console.error('Error adding education:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.userAddEducationController = userAddEducationController;
const userUpdateEducationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.profileId; // Get the profile ID from request (assuming it's set in middleware)
        const educationId = req.params.educationId; // Get the education ID from request params
        // Extract education details from the request body
        const { collegeName, degree, place, duration, percentage } = req.body;
        // Validate the profile exists
        const profile = yield schema_1.Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        // Check if the educationId is associated with the profile
        const isEducationAssociated = profile.education.includes(new mongoose_1.default.Types.ObjectId(educationId));
        if (!isEducationAssociated) {
            return res.status(403).json({ message: 'This education entry is not associated with your profile' });
        }
        // Prepare the updated education object
        const updatedData = {
            collegeName,
            degree,
            place,
            duration,
            percentage
        };
        // Update the education document with new data
        const updatedEducation = yield schema_1.Education.findByIdAndUpdate(educationId, { $set: updatedData }, { new: true });
        if (!updatedEducation) {
            return res.status(404).json({ message: 'Education not found' });
        }
        return res.status(200).json({
            message: 'Education updated successfully',
            education: updatedEducation
        });
    }
    catch (error) {
        console.error('Error updating education:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.userUpdateEducationController = userUpdateEducationController;
