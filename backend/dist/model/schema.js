"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extracurricular = exports.Competition = exports.Course = exports.Certification = exports.Education = exports.Project = exports.Profile = exports.Auth = void 0;
const mongoose_1 = require("mongoose");
// Define schemas for subdocuments (nested objects in separate collections)
const skillSchema = new mongoose_1.Schema({
    category: { type: String, required: true },
    skills: [{ type: String, required: true }]
});
const projectSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    githubLink: { type: String, required: true },
    website: { type: String },
    images: [{ type: String, required: true }]
});
const collegeSchema = new mongoose_1.Schema({
    degree: { type: String, required: true },
    major: { type: String, required: true },
    school: { type: String, required: true },
    year: { type: String, required: true },
    cgpa: { type: String, required: true },
    courseWork: { type: String, required: true }
});
const std12thSchema = new mongoose_1.Schema({
    degree: { type: String, required: true },
    college: { type: String, required: true },
    year: { type: String, required: true },
    board: { type: String, required: true },
    percentage: { type: String, required: true },
    cetPercentile: { type: String },
    courseWork: { type: String, required: true }
});
const schoolSchema = new mongoose_1.Schema({
    degree: { type: String, required: true },
    school: { type: String, required: true },
    year: { type: String, required: true },
    board: { type: String, required: true },
    percentage: { type: String, required: true },
    courseWork: { type: String, required: true }
});
const educationSchema = new mongoose_1.Schema({
    college: { type: collegeSchema, required: true },
    std12th: std12thSchema,
    school: schoolSchema
});
const certificationSchema = new mongoose_1.Schema({
    logo: { type: String, required: true },
    name: { type: String, required: true },
    organization: { type: String, required: true },
    rank: { type: String },
    year: { type: String, required: true },
    preview: { type: String, required: true }
});
const courseSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    tutor: { type: String, required: true },
    platform: { type: String, required: true },
    year: { type: String, required: true },
    preview: { type: String, required: true }
});
const competitionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    organization: { type: String, required: true },
    achievement: { type: String, required: true },
    projectSummary: { type: String, required: true },
    repoLink: { type: String, required: true },
    certificate: { type: String, required: true }
});
const extracurricularSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    role: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true }
});
// Main Profile schema with references to other collections
const profileSchema = new mongoose_1.Schema({
    avatar: { type: String, default: '#' },
    name: { type: String, required: true },
    about: { type: String, required: true },
    descriptors: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    github: { type: String, required: true },
    linkedin: { type: String, required: true },
    skills: [skillSchema], // Array of Skill subdocuments
    projects: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Project' }], // Array of Project object IDs
    education: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Education' }], // Array of Education object IDs
    certifications: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Certification' }], // Array of Certification object IDs
    courses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Course' }], // Array of Course object IDs
    competitions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Competition' }], // Array of Competition object IDs
    extracurricular: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Extracurricular' }] // Array of Extracurricular object IDs
});
const authSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    profileId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Profile", default: null }
});
// Models for separate collections
exports.Auth = (0, mongoose_1.model)("Auth", authSchema);
exports.Profile = (0, mongoose_1.model)('Profile', profileSchema);
exports.Project = (0, mongoose_1.model)('Project', projectSchema);
exports.Education = (0, mongoose_1.model)('Education', educationSchema);
exports.Certification = (0, mongoose_1.model)('Certification', certificationSchema);
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
exports.Competition = (0, mongoose_1.model)('Competition', competitionSchema);
exports.Extracurricular = (0, mongoose_1.model)('Extracurricular', extracurricularSchema);
