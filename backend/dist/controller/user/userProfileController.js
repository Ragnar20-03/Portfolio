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
exports.userUpdateProfileController = exports.userGetDetailsController = void 0;
const schema_1 = require("../../model/schema");
const mongoose_1 = __importDefault(require("mongoose"));
const userGetDetailsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.userGetDetailsController = userGetDetailsController;
const userUpdateProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.userUpdateProfileController = userUpdateProfileController;
