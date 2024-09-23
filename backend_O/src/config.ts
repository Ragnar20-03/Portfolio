import dotenv from "dotenv"
dotenv.config();

export const PORT = process.env.PORT
export const DB_URL = process.env.DB_URL || ""
export const JWT_SECRETE: any = process.env.JWT_SECRETE 
