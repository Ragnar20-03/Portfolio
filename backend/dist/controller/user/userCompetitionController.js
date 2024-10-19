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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCompetitionController = void 0;
const schema_1 = require("../../model/schema");
const userCompetitionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profileId = req.profileId;
        // Extract the competition details from the request body
        const { name, date, organization, achievement, projectSummary, repoLink, certificate } = req.body;
        // Validate if profileId exists
        const profile = yield schema_1.Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }
        // Create a new competition
        const newCompetition = {
            name,
            date,
            organization,
            achievement,
            projectSummary,
            repoLink,
            certificate: certificate || "#" // Default to "#" if certificate link is not provided
        };
        // Add the new competition to the profile's competitions array
        yield schema_1.Profile.findByIdAndUpdate(profileId, {
            $push: { competitions: newCompetition }
        }, { new: true });
        return res.status(200).json({
            message: 'Competition added successfully',
            competition: newCompetition
        });
    }
    catch (error) {
        console.error('Error adding competition:', error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
});
exports.userCompetitionController = userCompetitionController;
