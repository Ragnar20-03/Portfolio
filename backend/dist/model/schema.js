"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const SkillSchema = new mongoose_1.Schema({
    category: { type: String }, // Not required
    skills: [{ type: String }], // Not required
});
const ProjectSchema = new mongoose_1.Schema({
    name: { type: String }, // Not required
    description: { type: String }, // Not required
    technologies: [{ type: String }], // Not required
    githubLink: { type: String }, // Not required
    website: { type: String }, // Not required
    images: [{ type: String }], // Not required
});
const EducationDetailSchema = new mongoose_1.Schema({
    degree: { type: String }, // Not required
    major: { type: String }, // Not required
    school: { type: String }, // Not required
    year: { type: String }, // Not required
    cgpa: { type: String }, // Not required
    board: { type: String }, // Not required
    percentage: { type: String }, // Not required
    cetPercentile: { type: String }, // Not required
    courseWork: { type: String }, // Not required
});
const CertificationSchema = new mongoose_1.Schema({
    logo: { type: String }, // Not required
    name: { type: String }, // Not required
    organization: { type: String }, // Not required
    rank: { type: String }, // Not required
    year: { type: String }, // Not required
    preview: { type: String }, // Not required
});
const CourseSchema = new mongoose_1.Schema({
    name: { type: String }, // Not required
    description: { type: String }, // Not required
    technologies: [{ type: String }], // Not required
    tutor: { type: String }, // Not required
    platform: { type: String }, // Not required
    year: { type: String }, // Not required
    preview: { type: String }, // Not required
});
const CompetitionSchema = new mongoose_1.Schema({
    name: { type: String }, // Not required
    date: { type: String }, // Not required
    organization: { type: String }, // Not required
    achievement: { type: String }, // Not required
    projectSummary: { type: String }, // Not required
    repoLink: { type: String }, // Not required
    certificate: { type: String }, // Not required
});
const ExtracurricularSchema = new mongoose_1.Schema({
    title: { type: String }, // Not required
    role: { type: String }, // Not required
    year: { type: String }, // Not required
    description: { type: String }, // Not required
});
// Define the main User schema
const UserSchema = new mongoose_1.Schema({
    avatar: { type: String }, // Not required
    name: { type: String }, // Not required
    about: { type: String }, // Not required
    descriptors: { type: String }, // Not required
    email: { type: String }, // Not required
    github: { type: String }, // Not required
    linkedin: { type: String }, // Not required
    skills: [SkillSchema], // Not required
    projects: [ProjectSchema], // Not required
    education: {
        college: EducationDetailSchema, // Not required
        std12th: EducationDetailSchema, // Not required
        school: EducationDetailSchema, // Not required
    },
    certifications: [CertificationSchema], // Not required
    courses: [CourseSchema], // Not required
    competitions: [CompetitionSchema], // Not required
    extracurricular: [ExtracurricularSchema], // Not required
});
// Create and export the model
exports.User = mongoose_2.default.model('User', UserSchema);
