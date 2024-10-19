import { Request, Response } from "express";
import { Profile } from "../../model/schema";

export const userCompetitionController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;

        // Extract the competition details from the request body
        const { name, date, organization, achievement, projectSummary, repoLink, certificate } = req.body;

        // Validate if profileId exists
        const profile = await Profile.findById(profileId);
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
            certificate: certificate || "#"  // Default to "#" if certificate link is not provided
        };

        // Add the new competition to the profile's competitions array
        await Profile.findByIdAndUpdate(profileId, {
            $push: { competitions: newCompetition }
        }, { new: true });

        return res.status(200).json({
            message: 'Competition added successfully',
            competition: newCompetition
        });
    } catch (error) {
        console.error('Error adding competition:', error);
        return res.status(500).json({
            message: 'Server error'
        });
    }
};
