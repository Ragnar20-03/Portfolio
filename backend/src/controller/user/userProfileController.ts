import { Request, Response } from "express";
import { Auth, Profile } from "../../model/schema";
import mongoose from "mongoose";


interface Skill {
    category?: string;
    skills: string[];
}

// Define an interface for updatable profile fields
interface UpdateableProfileFields {
    avatar?: string;
    name?: string;
    about?: string;
    descriptors?: string;
    email?: string;
    github?: string;
    linkedin?: string;
    skills?: Skill[]; // Array of Skill objects
}

export const userGetProfileDetailsController = async (req: Request, res: Response) => {
    try {
        const profileId = req.params.profileId;

        // Validate if profileId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(profileId)) {
            return res.status(400).json({ msg: 'Invalid Profile ID' });
        }

        // Fetch the user's profile and populate the necessary fields
        const userProfile = await Profile.findById(profileId)
            .populate('projects')        // Populate the projects array
            .populate('education')       // Populate the education array
            .populate('certifications')  // Populate the certifications array
            .populate('courses')         // Populate the courses array
            .populate('competitions')    // Populate the competitions array
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
        })
    }
}

export const userUpdateProfileController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId; // Assuming profileId is set in the request object

        // Fields that can be updated directly in the profile schema
        const allowedFields: (keyof UpdateableProfileFields)[] = ['avatar', 'name', 'about', 'descriptors', 'email', 'github', 'linkedin', 'skills'];

        // Create an object with only the allowed fields from the request body
        const updateFields = allowedFields.reduce<UpdateableProfileFields>((acc, field) => {
            if (field in req.body) {
                if (field === 'skills' && Array.isArray(req.body[field])) {
                    // Ensure skills is an array of Skill objects
                    acc[field] = req.body[field].filter((skill: unknown): skill is Skill => {
                        if (typeof skill === 'object' && skill !== null) {
                            const { category, skills } = skill as Skill;
                            return typeof category === 'string' && Array.isArray(skills) && skills.every(s => typeof s === 'string');
                        }
                        return false;
                    });
                } else {
                    acc[field] = req.body[field];
                }
            }
            return acc;
        }, {});

        // Update the profile
        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            profile: updatedProfile
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

