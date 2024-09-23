import express, { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure the uploads directory exists
const UPLOADS_DIR = 'uploads';
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR);
}

// Set up storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR); // Destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filter for validation (optional)
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Create Multer instance
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5 MB
    },
    fileFilter
});

// Initialize Express app
const app = express();

// Route for file upload
app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
    if (req.file) {
        res.send({
            message: 'File uploaded successfully!',
            file: req.file
        });
    } else {
        res.status(400).send({ message: 'No file uploaded.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
