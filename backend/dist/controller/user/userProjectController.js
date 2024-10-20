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
exports.userRemoveProjectImageController = exports.userProjectImageController = exports.userUpdateProjectController = exports.userAddProjectController = void 0;
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
    var _a, _b;
    try {
        const profileId = req.profileId; // Get the profile ID from middleware
        const projectId = req.params.projectId; // Get the project ID from request params
        // Validate if the projectId is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ message: 'Invalid Project ID' });
        }
        // Find the profile by profileId and populate projects
        const profile = yield schema_1.Profile.findById(profileId).populate('projects');
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found!' });
        }
        // Check if the projectId is associated with the profile using includes
        const isProjectAssociated = profile.projects.some(p => p._id.toString() === projectId);
        if (!isProjectAssociated) {
            return res.status(403).json({ message: 'This project is not associated with your profile!' });
        }
        // Use find to get the specific project details
        const project = yield schema_1.Project.findById(new mongoose_1.default.Types.ObjectId(projectId));
        // Validate the existing number of images
        if (!project) {
            return res.status(404).json({
                msg: "project Not Found !"
            });
        }
        const existingImageCount = project.images.length;
        const newImageCount = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.length) || 0;
        if (newImageCount > 3) {
            return res.status(400).json({ msg: "You cant upload more than 3 images" });
        }
        // Check if the new images exceed the limit of 3    
        // Array to store uploaded image URLs
        const uploadedImages = [];
        if (req.files) {
            let index = 0;
            for (const file of req.files) {
                if (index == 3) {
                    break;
                }
                // Validate file type
                const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
                if (!allowedMimeTypes.includes(file.mimetype)) {
                    return res.status(400).json({ message: 'Only image files (JPEG, PNG, WebP) are allowed!' });
                }
                // Generate a unique public ID for the image using project ID and current timestamp
                const publicId = `project_${projectId}_${Date.now()}`;
                const existingImageUrl = project.images.find(image => image.includes(publicId));
                if (existingImageUrl) {
                    // If image exists, do not upload again
                    uploadedImages.push(existingImageUrl);
                    continue; // Skip to the next file
                }
                // Upload the image to Cloudinary
                const uploadResult = yield (0, cloudinary_1.uploadProjectImage)(file.buffer, publicId);
                // Remove old images if necessary (to maintain only 3 images)
                if (existingImageCount + uploadedImages.length > 3) {
                    const imageToRemove = project.images.shift(); // Remove the oldest image from the array
                    if (imageToRemove) {
                        const imagePublicId = (_b = imageToRemove.split('/').pop()) === null || _b === void 0 ? void 0 : _b.split('.')[0];
                        if (imagePublicId) {
                            yield (0, cloudinary_1.removeProjectImage)(imagePublicId); // Remove the image from Cloudinary
                        }
                        // Also remove the image from the project's images array
                        yield schema_1.Project.findByIdAndUpdate(projectId, { $pull: { images: imageToRemove } }, // Remove the old image URL from the images array
                        { new: true });
                    }
                }
                // Add the newly uploaded image URL to the array
                uploadedImages.push(uploadResult.secure_url);
            }
            // Update the project images using MongoDB's $push
            yield schema_1.Project.findByIdAndUpdate(projectId, { $push: { images: { $each: uploadedImages } } }, { new: true });
            return res.status(200).json({
                message: 'Project images updated successfully',
                images: project.images.concat(uploadedImages), // Return the updated images list
            });
        }
        else {
            return res.status(400).json({ message: 'No images provided' });
        }
    }
    catch (error) {
        console.error('Error updating project images:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.userProjectImageController = userProjectImageController;
const userRemoveProjectImageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.userRemoveProjectImageController = userRemoveProjectImageController;
