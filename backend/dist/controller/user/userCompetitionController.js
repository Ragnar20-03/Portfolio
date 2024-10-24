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
exports.userCompetitionPreviewController = exports.userUpdateCompetitionController = exports.userAddCompetitionController = void 0;
const schema_1 = require("../../model/schema");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("../../services/cloudinary");
const userAddCompetitionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.profileId;
        // Extract competition details from the request body
        const { name, date, organization, achievement, projectSummary, repoLink } = req.body;
        // Validate if the profile exists
        const profile = yield schema_1.Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }
        // Validate necessary fields
        if (!name || !date || !organization) {
            return res.status(400).json({ message: 'Name, Date, and Organization are required!' });
        }
        // Create a new competition object
        const newCompetitionData = {
            name,
            date,
            organization,
            achievement: achievement || '', // Optional field, default to empty if not provided
            projectSummary: projectSummary || '', // Optional field
            repoLink: repoLink || '', // Optional field
            certificate: '#', // Default certificate if none provided
        };
        //first add the newCompetition to Competition schema 
        // then 
        // Add the new competition to the profile's competitions array
        let newCompetition = yield schema_1.Competition.create(newCompetitionData);
        if (!newCompetition) {
            return res.status(200).json({
                msg: "failed to add new Data in Competition Schema !"
            });
        }
        yield schema_1.Profile.findByIdAndUpdate(profileId, {
            $push: { competitions: newCompetition }
        });
        return res.status(200).json({
            message: 'Competition added successfully',
            competition: newCompetition
        });
    }
    catch (error) {
        console.error('Error adding competition:', error);
        res.status(500).json({
            message: 'Something went wrong!'
        });
    }
});
exports.userAddCompetitionController = userAddCompetitionController;
const userUpdateCompetitionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profileId = req.profileId;
        let competitionId = req.params.competitionId;
        if (!mongoose_1.default.Types.ObjectId.isValid(competitionId)) {
            return res.status(400).json({
                msg: "Competition Id is not valid !"
            });
        }
        let profile = yield schema_1.Profile.findById(profileId);
        if (!profile) {
            return res.status(400).json({
                msg: " PRofile Not Found !"
            });
        }
        // Check if the competition is associated with the profile
        let isCompetitionAssociated = yield profile.competitions.includes(new mongoose_1.default.Types.ObjectId(competitionId));
        if (!isCompetitionAssociated) {
            return res.status(400).json({
                msg: "UnAuthorized Request",
                desc: " Respective Cometition is not associated with the Respective Profile !"
            });
        }
        const { name, date, organization, achievement, projectSummary, repoLink } = req.body;
        let updatedCompetition = yield schema_1.Competition.findByIdAndUpdate(competitionId, {
            name, date, organization, achievement, projectSummary, repoLink
        }, { new: true });
        if (!updatedCompetition) {
            return res.status(400).json({
                msg: "Competition Not Found "
            });
        }
        return res.status(200).json({
            msg: "Competition Updated Succesfully !",
            updatedCompetition
        });
    }
    catch (error) {
        // console.log("Error is : ", error);
        return res.status(500).json({
            msg: "Internal Server Error "
        });
    }
});
exports.userUpdateCompetitionController = userUpdateCompetitionController;
const userCompetitionPreviewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        let profileId = req.profileId;
        let competitionId = req.params.competitionId;
        console.log("reqched !");
        if (!mongoose_1.default.Types.ObjectId.isValid(competitionId)) {
            return res.status(400).json({
                msg: "CompetitoinID is not valid"
            });
        }
        let profile = yield schema_1.Profile.findById(profileId);
        if (!profile) {
            return res.status(400).json({
                msg: "Profile Not Found !"
            });
        }
        const competition = yield schema_1.Competition.findById(new mongoose_1.default.Types.ObjectId(competitionId));
        if (!competition) {
            return res.status(404).json({ message: 'Competition not found!' });
        }
        let isAssociated = profile.competitions.includes(new mongoose_1.default.Types.ObjectId(competitionId));
        if (!isAssociated) {
            return res.status(400).json({
                msg: "UnAuthorized Request !",
                desc: "Respective course is not associated with the Respective profile "
            });
        }
        if (!req.file) {
            if (competition.certificate) {
                const prevPublicId = (_a = competition.certificate.split('/').pop()) === null || _a === void 0 ? void 0 : _a.split('.')[0]; // Extract public ID from the URL
                if (prevPublicId) {
                    yield (0, cloudinary_1.removeCompetitionCertificate)(prevPublicId);
                }
                yield schema_1.Competition.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(competitionId), { $set: { certificate: "#" } }, { new: true });
                return res.status(200).json({
                    msg: "Certificate Removed Succsesfully !"
                });
            }
            else {
                yield schema_1.Competition.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(competitionId), { $set: { certificate: "#" } }, { new: true });
                return res.status(200).json({
                    msg: "Certificate Removed Succsesfully !"
                });
            }
        }
        else {
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedMimeTypes.includes(req.file.mimetype)) {
                return res.status(400).json({ message: 'Invalid file type! Only images (JPEG, PNG, WebP) are allowed.' });
            }
            // If the competition already has a certificate, delete the old one from cloud storage
            if (competition.certificate) {
                const prevPublicId = (_b = competition.certificate.split('/').pop()) === null || _b === void 0 ? void 0 : _b.split('.')[0];
                if (prevPublicId) {
                    yield (0, cloudinary_1.removeCompetitionCertificate)(prevPublicId); // Function to remove the certificate from cloud storage
                }
            }
            // Generate a unique public ID for the new certificate using competition ID and current timestamp
            const publicId = `competitionCertificate_${(_c = profile.name) === null || _c === void 0 ? void 0 : _c.split(' ')[0]}_${competitionId}_${Date.now()}`;
            // Upload the new file to cloud storage (assuming you're using Cloudinary or a similar service)
            const uploadResult = yield (0, cloudinary_1.uploadCompetitionCertificate)(req.file.buffer, publicId);
            // Update the competition with the new certificate URL
            const updatedCompetition = yield schema_1.Competition.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(competitionId), { $set: { certificate: uploadResult.secure_url } }, { new: true });
            return res.status(200).json({
                message: 'Competition certificate updated successfully',
                competition: updatedCompetition
            });
        }
    }
    catch (error) {
        // console.log("error is : ", error);
        return res.status(500).json({
            msg: "Something Went Wrong !"
        });
    }
});
exports.userCompetitionPreviewController = userCompetitionPreviewController;
