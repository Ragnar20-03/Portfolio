import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.PORT
export const DB_URL = process.env.DB_URL || ""
export const JWT_SECRETE: any = process.env.JWT_SECRETE
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRETE = process.env.CLOUDINARY_API_SECRETE
export const CLOUDINARY_API_ENVIRONMENT_VARIABLE = process.env.CLOUDINARY_API_ENVIRONMENT_VARIABLE
