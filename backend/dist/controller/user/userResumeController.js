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
exports.userResumeController = void 0;
const schema_1 = require("../../model/schema");
const cloudinary_1 = require("cloudinary");
const userResumeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const profileId = req.profileId;
        const profile = yield schema_1.Profile.findOne({ _id: profileId });
        if (!profile) {
            return res.status(404).json({ msg: "Profile not found!" });
        }
        if (!req.file) {
            return res.status(400).json({ msg: "No file found!" });
        }
        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ msg: "Only PDF files are allowed!" });
        }
        const prevResume = profile.resume;
        // Generate a unique public ID for the resume
        const publicId = `resume_${(_a = profile.name) === null || _a === void 0 ? void 0 : _a.split(' ')[0]}-${(_b = profile.name) === null || _b === void 0 ? void 0 : _b.split(' ')[1]}_${Date.now()}`;
        // Wrap the Cloudinary upload in a promise
        const cloudinaryUpload = (buffer, publicId) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary_1.v2.uploader.upload_stream({
                    folder: 'uploads/resumes',
                    public_id: publicId,
                    resource_type: 'raw'
                }, (error, result) => {
                    if (error)
                        reject(error);
                    else
                        resolve(result);
                });
                stream.end(buffer);
            });
        };
        // Upload the new resume
        const uploadResult = yield cloudinaryUpload(req.file.buffer, publicId);
        // Update only the resume field in the database
        yield schema_1.Profile.updateOne({ _id: profileId }, { $set: { resume: uploadResult.secure_url } });
        // Delete the previous resume from Cloudinary if it exists
        if (prevResume) {
            const prevPublicId = (_c = prevResume.split('/').pop()) === null || _c === void 0 ? void 0 : _c.split('.')[0];
            if (prevPublicId) {
                try {
                    yield cloudinary_1.v2.uploader.destroy(`uploads/resumes/${prevPublicId}`, { resource_type: 'raw' });
                    console.log(`Previous resume removed: ${prevPublicId}`);
                }
                catch (deleteError) {
                    console.error("Error deleting previous resume:", deleteError);
                }
            }
        }
        return res.json({ message: "Resume updated successfully", resume: uploadResult.secure_url });
    }
    catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: 'Server error ' });
    }
});
exports.userResumeController = userResumeController;
