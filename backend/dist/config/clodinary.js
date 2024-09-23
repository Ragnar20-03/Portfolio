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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: config_1.CLOUDINARY_CLOUD_NAME,
    api_key: config_1.CLOUDINARY_API_KEY,
    api_secret: config_1.CLOUDINARY_API_SECRETE
});
// Configure multer for local storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Endpoint to handle image upload
app.post('/upload', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        // Upload file to Cloudinary
        const result = yield cloudinary_1.v2.uploader.upload(req.file.path, {
            folder: 'uploads',
        });
        // Delete the local file
        fs_1.default.unlinkSync(req.file.path);
        res.json({
            message: 'File uploaded successfully',
            fileUrl: result.secure_url,
            fileId: result.public_id
        });
    }
    catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
}));
function getPublicIdFromUrl(url) {
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
// Endpoint to handle image deletion
app.delete('/delete-image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { imageUrl } = req.body;
    if (!imageUrl) {
        return res.status(400).json({ error: 'Image URL is required' });
    }
    const publicId = getPublicIdFromUrl(imageUrl);
    console.log("Public id  is : ", publicId);
    if (!publicId) {
        return res.status(400).json({ error: 'Invalid Cloudinary URL' });
    }
    try {
        // Delete the image from Cloudinary
        const result = yield cloudinary_1.v2.uploader.destroy(publicId);
        if (result.result === 'ok') {
            res.json({ message: 'Image deleted successfully' });
        }
        else {
            res.status(404).json({ error: 'Image not found or already deleted' });
        }
    }
    catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        res.status(500).json({ error: 'Error deleting image' });
    }
}));
// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
