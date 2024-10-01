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
exports.upload = exports.cloudinary_start = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = require("./dotenv");
function cloudinary_start() {
    return __awaiter(this, void 0, void 0, function* () {
        // Configuration
        cloudinary_1.v2.config({
            cloud_name: dotenv_1.CLOUDINARY_CLOUD_NAME,
            api_key: dotenv_1.CLOUDINARY_API_KEY,
            api_secret: dotenv_1.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
        });
        console.log(":-cloudinary Service has been started");
    });
}
exports.cloudinary_start = cloudinary_start;
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
