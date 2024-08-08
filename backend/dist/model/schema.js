"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = exports.UserModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const config_1 = require("../config/config");
// Connect to MongoDB
mongoose_1.default.connect(config_1.MONGO_URL)
    .then(() => {
    console.log("Mongodb Atlas Connection Successful!");
})
    .catch((e) => {
    console.error("Error in connecting with Mongodb Atlas", e);
});
// Create User schema
const userSchema = new mongoose_1.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    ph: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    threads: { type: String, required: true },
    address: { type: String, required: true },
    gitLink: { type: String, required: true },
    linkedin: { type: String, required: true },
    profileUrl: { type: String },
});
// Create Project schema
const projectSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    timeline: { type: String, required: true },
    gitLink: { type: String, required: true },
    liveLink: { type: String, required: true },
    technologies: { type: [String] },
    tools: { type: [String] },
});
// Create User and Project models
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
exports.ProjectModel = (0, mongoose_1.model)('Project', projectSchema);
