import { Request, Response } from "express";
import { Profile, Project } from "../../model/schema";
import mongoose from "mongoose";
import { uploadAvatar, uploadImage } from "../../services/cloudinary";


export const userAddProjectController = async (req: Request, res: Response) => {
    try {
        const authId = req.authId;
        const profileId = req.profileId;

        // Extract the project details from the request body
        const { name, description, technologies, githubLink, website, images } = req.body;

        // Validate if profileId exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }


        // Create a new project
        const newProject = await Project.create({
            name,
            description,
            technologies,
            githubLink,
            website,
            images: []
        });

        // Add the new project's ID to the profile's projects array
        await Profile.findByIdAndUpdate(profileId, {
            $push: { projects: newProject._id }
        });

        return res.status(200).json({
            message: 'Project added successfully',
            project: newProject
        });
    } catch (error) {
        console.log("error is : ", error);
        res.status(500).json({
            msg: "Something went wrong !"
        });
    }
}

export const userUpdateProjectController = async (req: Request, res: Response) => {

    try {
        let profileId = req.profileId
        let { projectId } = req.params


        if (!profileId) return res.status(400).json({
            msg: "Profile Id is required !"
        })
        const profile = await Profile.findById(profileId);
        if (!profile || !profile.projects.includes(new mongoose.Types.ObjectId(projectId))) {
            return res.status(400).json({ msg: "Profile or Project not Found" })
        }

        const { name, description, technologies, githubLink, website, images } = req.body;
        const updateFields: Partial<{
            name: string;
            description: string;
            technologies: string[];
            githubLink: string;
            website: string;
            images: string[];
        }> = {};

        if (name) updateFields.name = name;
        if (description) updateFields.description = description;
        if (technologies && Array.isArray(technologies)) updateFields.technologies = technologies;
        if (githubLink) updateFields.githubLink = githubLink;
        if (website) updateFields.website = website;
        if (images && Array.isArray(images)) updateFields.images = images;

        // Find and update the project in the Project collection
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            { $set: updateFields },
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }

        return res.status(200).json({
            message: 'Project updated successfully',
            project: updatedProject
        });

    }
    catch (error) {
        console.error('Error updating project:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const userProjectImageController = async (req: Request, res: Response) => {
    res.status(200).json({
        msg: "This route is pending "
    })
}

