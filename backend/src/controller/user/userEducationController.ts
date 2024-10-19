import { Request, Response } from 'express';
import { Education, Profile } from '../../model/schema'; // Assuming you have a Profile model
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
        const addEducation = await Education.create(newEducation);
        if (addEducation) {
            console.log("Addeducation is : ", addEducation);
            const updatedProfile = await Profile.findByIdAndUpdate(
                new mongoose.Types.ObjectId(profileId),
                { $set: { education: addEducation } },
                { new: true, runValidators: true }
            );

            if (!updatedProfile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            return res.status(200).json({
                msg: 'Education added successfully',
                profile: updatedProfile
            });
        }
        else {
            res.status(500).json({ message: 'Failed' });
        }


    } catch (error) {
        console.error('Error adding education:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const userUpdateEducationController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;  // Get the profile ID from request (assuming it's set in middleware)
        const educationId = req.params.educationId


        // Extract education details from the request body
        const { college, std12th, school } = req.body.education;

        // Validate the profile exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Prepare the updated education object
        const updatedData = {
            college: college || {},
            std12th: std12th || {},
            school: school || {}
        };


        let updateEducation = await Education.findByIdAndUpdate(educationId, { $set: updatedData }, { new: true })


        // Update the education details of the profile


        if (!updateEducation) {
            return res.status(404).json({ message: 'Failed to update profile' });
        }

        return res.status(200).json({
            msg: 'Education updated successfully',
            profile: updateEducation
        });

    } catch (error) {
        console.error('Error updating education:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
