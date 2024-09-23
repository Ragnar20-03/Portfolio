import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { CLOUDINARY_API_ENVIRONMENT_VARIABLE, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRETE, CLOUDINARY_CLOUD_NAME } from './config';

// Configure Cloudinary
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRETE
});

// Configure multer for local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/tmp/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json())

// Endpoint to handle image upload
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads',
        });

        // Delete the local file
        fs.unlinkSync(req.file.path);

        res.json({
            message: 'File uploaded successfully',
            fileUrl: result.secure_url,
            fileId: result.public_id
        });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        res.status(500).json({ error: 'Error uploading file' });
    }
});

function getPublicIdFromUrl(url: string): string | null {
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Endpoint to handle image deletion
app.delete('/delete-image', async (req, res) => {
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
        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result === 'ok') {
            res.json({ message: 'Image deleted successfully' });
        } else {
            res.status(404).json({ error: 'Image not found or already deleted' });
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        res.status(500).json({ error: 'Error deleting image' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});