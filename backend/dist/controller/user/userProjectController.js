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
exports.userProjectImageController = exports.userUpdateProjectController = exports.userAddProjectController = void 0;
const schema_1 = require("../../model/schema");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("../../services/cloudinary");
const userAddProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authId = req.authId;
        const profileId = req.profileId;
        // Extract the project details from the request body
        const { name, description, technologies, githubLink, website, images } = req.body;
        // Validate if profileId exists
        const profile = yield schema_1.Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'User Profile not found' });
        }
        // Create a new project
        const newProject = yield schema_1.Project.create({
            name,
            description,
            technologies,
            githubLink,
            website,
            images: []
        });
        // Add the new project's ID to the profile's projects array
        yield schema_1.Profile.findByIdAndUpdate(profileId, {
            $push: { projects: newProject._id }
        });
        return res.status(200).json({
            message: 'Project added successfully',
            project: newProject
        });
    }
    catch (error) {
        console.log("error is : ", error);
        res.status(500).json({
            msg: "Something went wrong !"
        });
    }
});
exports.userAddProjectController = userAddProjectController;
const userUpdateProjectController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let profileId = req.profileId;
        let { projectId } = req.params;
        if (!profileId)
            return res.status(400).json({
                msg: "Profile Id is required !"
            });
        const profile = yield schema_1.Profile.findById(profileId);
        if (!profile || !profile.projects.includes(new mongoose_1.default.Types.ObjectId(projectId))) {
            return res.status(400).json({ msg: "Profile or Project not Found" });
        }
        const { name, description, technologies, githubLink, website, images } = req.body;
        const updateFields = {};
        if (name)
            updateFields.name = name;
        if (description)
            updateFields.description = description;
        if (technologies && Array.isArray(technologies))
            updateFields.technologies = technologies;
        if (githubLink)
            updateFields.githubLink = githubLink;
        if (website)
            updateFields.website = website;
        if (images && Array.isArray(images))
            updateFields.images = images;
        // Find and update the project in the Project collection
        const updatedProject = yield schema_1.Project.findByIdAndUpdate(projectId, { $set: updateFields }, { new: true, runValidators: true } // Return the updated document
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
});
exports.userUpdateProjectController = userUpdateProjectController;
const userProjectImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectId = req.params.projectId;
        const profileId = req.profileId;
        const files = req.files;
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No images provided' });
        }
        const project = yield schema_1.Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        // Upload new images to Cloudinary
        const uploadedImages = yield Promise.all(files.map(file => (0, cloudinary_1.uploadAvatar)(file.buffer, `project_${projectId}_${Date.now()}_${file.originalname}`)));
        // Combine existing images with new uploaded images
        const updatedImages = [...project.images, ...uploadedImages];
        // Update the project with new images
        const updatedProject = yield schema_1.Project.findByIdAndUpdate(projectId, { $set: { images: updatedImages } }, { new: true });
        if (!updatedProject) {
            return res.status(404).json({ message: 'Project not found after update' });
        }
        return res.status(200).json({
            message: 'Project images updated successfully',
            images: updatedProject.images
        });
    }
    catch (error) {
        console.error('Error handling project images:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.userProjectImageController = userProjectImageController;
