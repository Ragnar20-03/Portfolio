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
exports.removeProjectImage = exports.uploadProjectImage = exports.removeCompetitionCertificate = exports.uploadCompetitionCertificate = exports.removeCertificationPreview = exports.uploadCertificatePreview = exports.removeCoursePreview = exports.uploadCousePreview = exports.uploadImage = exports.removeResume = exports.uploadResume = exports.removeAvatar = exports.uploadAvatar = void 0;
const cloudinary_1 = require("cloudinary");
// Wrap the Cloudinary upload in a promise
const uploadAvatar = (buffer, publicId) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'uploads/avatar',
            public_id: publicId,
            overwrite: true,
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        stream.end(buffer);
    });
};
exports.uploadAvatar = uploadAvatar;
const removeAvatar = (prevPublicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary_1.v2.uploader.destroy(`uploads/avatar/${prevPublicId}`);
        console.log(`Previous avatar removed: ${prevPublicId}`);
    }
    catch (deleteError) {
        console.error("Error deleting previous avatar:", deleteError);
    }
});
exports.removeAvatar = removeAvatar;
const uploadResume = (buffer, publicId) => {
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
exports.uploadResume = uploadResume;
const removeResume = (prevPublicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary_1.v2.uploader.destroy(`uploads/resumes/${prevPublicId}`, { resource_type: 'raw' });
        console.log(`Previous resume removed: ${prevPublicId}`);
    }
    catch (deleteError) {
        console.error("Error deleting previous resume:", deleteError);
    }
});
exports.removeResume = removeResume;
const uploadImage = (buffer, publicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({
                folder: 'uploads/project_images',
                public_id: publicId,
                overwrite: true,
            }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
            stream.end(buffer);
        });
    }
    catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
});
exports.uploadImage = uploadImage;
const uploadCousePreview = (buffer, publicId) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'uploads/course',
            public_id: publicId,
            overwrite: true,
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        stream.end(buffer);
    });
};
exports.uploadCousePreview = uploadCousePreview;
const removeCoursePreview = (prevPublicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary_1.v2.uploader.destroy(`uploads/course/${prevPublicId}`);
        console.log(`Previous avatar removed: ${prevPublicId}`);
    }
    catch (deleteError) {
        console.error("Error deleting previous avatar:", deleteError);
    }
});
exports.removeCoursePreview = removeCoursePreview;
const uploadCertificatePreview = (buffer, publicId) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'uploads/certificate',
            public_id: publicId,
            overwrite: true,
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        stream.end(buffer);
    });
};
exports.uploadCertificatePreview = uploadCertificatePreview;
const removeCertificationPreview = (prevPublicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary_1.v2.uploader.destroy(`uploads/certificate/${prevPublicId}`);
        console.log(`Previous avatar removed: ${prevPublicId}`);
    }
    catch (deleteError) {
        console.error("Error deleting previous avatar:", deleteError);
    }
});
exports.removeCertificationPreview = removeCertificationPreview;
const uploadCompetitionCertificate = (buffer, publicId) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'uploads/competition',
            public_id: publicId,
            overwrite: true,
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        stream.end(buffer);
    });
};
exports.uploadCompetitionCertificate = uploadCompetitionCertificate;
const removeCompetitionCertificate = (prevPublicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary_1.v2.uploader.destroy(`uploads/competition/${prevPublicId}`);
        console.log(`Previous avatar removed: ${prevPublicId}`);
    }
    catch (deleteError) {
        console.error("Error deleting previous avatar:", deleteError);
    }
});
exports.removeCompetitionCertificate = removeCompetitionCertificate;
const uploadProjectImage = (buffer, publicId) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'uploads/project',
            public_id: publicId,
            overwrite: true,
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        stream.end(buffer);
    });
};
exports.uploadProjectImage = uploadProjectImage;
const removeProjectImage = (prevPublicId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cloudinary_1.v2.uploader.destroy(`uploads/project/${prevPublicId}`);
        console.log(`Previous avatar removed: ${prevPublicId}`);
    }
    catch (deleteError) {
        console.error("Error deleting previous avatar:", deleteError);
    }
});
exports.removeProjectImage = removeProjectImage;
