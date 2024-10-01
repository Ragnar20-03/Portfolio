import { Request, Response } from "express";
import { Profile } from "../../model/schema";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';



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


export const userUpdateAvatarController = async (req: Request, res: Response) => {
    try {
        const profileId = req.profileId;

        const profile = await Profile.findOne({ _id: profileId });

        if (!profile) {
            return res.status(404).json({ msg: "Profile not found!" });
        }

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: "No file found!" });
        }

        // Previous avatar (if it exists)
        const prevAvatar = profile.avatar;

        // Wrap the Cloudinary upload_stream in a promise
        const streamUpload = (buffer: Buffer): Promise<any> => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'uploads/avatar' },
                    (error, result) => {
                        if (error) {
                            reject(error); // Reject the promise if an error occurs
                        } else {
                            resolve(result); // Resolve the promise with the result
                        }
                    }
                );
                stream.end(buffer); // Pass the buffer (file data)
            });
        };

        // Upload the file to Cloudinary and await the result
        const result = await streamUpload(req.file.buffer);

        // Update the profile with the new avatar URL
        profile.avatar = result.secure_url;
        await profile.save(); // Save the updated profile

        // Optionally: Delete the previous avatar from Cloudinary
        if (prevAvatar) {
            const publicId = prevAvatar.split('/').pop()?.split('.')[0];
            if (publicId) {
                await cloudinary.uploader.destroy(`uploads/${publicId}`);
            }
        }

        // Return the response with the new avatar URL
        return res.json({ message: 'Upload successful', avatar: result.secure_url });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
}
