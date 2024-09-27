import { Request, Response } from 'express';
import { Profile } from '../../model/schema'; // Assuming you have a Profile model
import mongoose from 'mongoose';

// Controller to add education details
export const userAddEducationController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;

        // Extract education details from the request body
        const { college, std12th, school } = req.body.education;

        const newEducation = {
            college: college || {},
            std12th: std12th || {},
            school: school || {}
        };

        // Update the profile with the new education information
        const updatedProfile = await Profile.findByIdAndUpdate(
            new mongoose.Types.ObjectId(profileId),
            { $set: { education: newEducation } },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({
            msg: 'Education added successfully',
            profile: updatedProfile
        });
    } catch (error) {
        console.error('Error adding education:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
