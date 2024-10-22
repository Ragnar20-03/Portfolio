import { Request, Response } from "express";
import mongoose from "mongoose";
import { Profile } from "../../model/schema";

export const userGetAdminProfileController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId

        // Validate if profileId is a valid ObjectId


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