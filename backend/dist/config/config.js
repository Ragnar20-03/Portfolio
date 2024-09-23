"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_API_ENVIRONMENT_VARIABLE = exports.CLOUDINARY_API_SECRETE = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = exports.JWT_SECRETE = exports.DB_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT;
exports.DB_URL = process.env.DB_URL || "";
exports.JWT_SECRETE = process.env.JWT_SECRETE;
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRETE = process.env.CLOUDINARY_API_SECRETE;
exports.CLOUDINARY_API_ENVIRONMENT_VARIABLE = process.env.CLOUDINARY_API_ENVIRONMENT_VARIABLE;
