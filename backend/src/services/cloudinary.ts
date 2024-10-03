import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Wrap the Cloudinary upload in a promise

export const uploadAvatar = (buffer: Buffer, publicId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'uploads/avatar',
                public_id: publicId,
                overwrite: true,

            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(buffer);
    });
};

export const removeAvatar = async (prevPublicId: string | any) => {
    try {
        await cloudinary.uploader.destroy(`uploads/avatar/${prevPublicId}`);
        console.log(`Previous avatar removed: ${prevPublicId}`);
    } catch (deleteError) {
        console.error("Error deleting previous avatar:", deleteError);
    }
}

export const uploadResume = (buffer: Buffer, publicId: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'uploads/resumes',
                public_id: publicId,
                resource_type: 'raw'
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        stream.end(buffer);
    });
};

export const removeResume = async (prevPublicId: string) => {
    try {
        await cloudinary.uploader.destroy(`uploads/resumes/${prevPublicId}`, { resource_type: 'raw' });
        console.log(`Previous resume removed: ${prevPublicId}`);
    } catch (deleteError) {
        console.error("Error deleting previous resume:", deleteError);
    }
}

export const uploadImage = async (buffer: Buffer, publicId: string) => {
    try {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'uploads/project_images',
                    public_id: publicId,
                    overwrite: true,

                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            stream.end(buffer);
        });
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error)
        throw error
    }
}
