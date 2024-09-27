import { v2 as cloudinary } from 'cloudinary';

import clodiinary from "cloudinary"
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from './dotenv';

export async function cloudinary_start() {

    // Configuration
    cloudinary.config({
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
    });


    console.log(":-cloudinary Service has been started");

}