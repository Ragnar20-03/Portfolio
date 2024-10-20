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
exports.userUpdateExtracurricular = exports.userAddExtraCurricularController = void 0;
const schema_1 = require("../../model/schema");
const mongoose_1 = __importDefault(require("mongoose"));
const userAddExtraCurricularController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profileId = req.profileId;
        const { title, role, year, description } = req.body;
        let findProfile = yield schema_1.Profile.findById(profileId);
        if (!findProfile) {
            return res.status(404).json({
                msg: "Profile Not Found !"
            });
        }
        let newExtracurricular = yield schema_1.Extracurricular.create({
            title: title || "#",
            role: role || "#",
            year: year || "#",
            description: description || "#"
        });
        if (!newExtracurricular) {
            return res.status(400).json({
                msg: "Unable to add Extracurricular !"
            });
        }
        else {
            const updateProfile = yield schema_1.Profile.findByIdAndUpdate(profileId, {
                $push: { extracurricular: newExtracurricular._id }
            }, { new: true });
            if (updateProfile) {
                return res.status(200).json({
                    msg: "Extracurricular Add Succesfully !"
                });
            }
            else {
                res.status(500).json({
                    msg: "extracurricular add Failed"
                });
            }
        }
    }
    catch (error) {
        console.log("error is : ", error);
        return res.status(500).json({
            msg: "Internal Server Error !"
        });
    }
});
exports.userAddExtraCurricularController = userAddExtraCurricularController;
const userUpdateExtracurricular = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.profileId; // Get the profile ID from the request (assuming it's set in middleware)
        const extracurricularId = req.params.extracurricularId; // Get the extracurricular ID from request params
        // Extract extracurricular details from the request body
        const { title, role, year, description } = req.body;
        // Validate if the profile exists
        const profile = yield schema_1.Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        // Check if the extracurricular ID is associated with the profile
        const isExtracurricularAssociated = profile.extracurricular.includes(new mongoose_1.default.Types.ObjectId(extracurricularId));
        if (!isExtracurricularAssociated) {
            return res.status(403).json({ message: 'This extracurricular activity is not associated with your profile' });
        }
        // Prepare the updated extracurricular data
        const updatedData = {
            title,
            role,
            year,
            description
        };
        // Update the extracurricular document with new data
        const updatedExtracurricular = yield schema_1.Extracurricular.findByIdAndUpdate(extracurricularId, { $set: updatedData }, { new: true, runValidators: true } // Return the updated document and validate the new data
        );
        if (!updatedExtracurricular) {
            return res.status(404).json({ message: 'Extracurricular activity not found' });
        }
        return res.status(200).json({
            message: 'Extracurricular activity updated successfully',
            extracurricular: updatedExtracurricular
        });
    }
    catch (error) {
        console.error('Error updating extracurricular activity:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.userUpdateExtracurricular = userUpdateExtracurricular;
