"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extracurricular = exports.Competition = exports.Course = exports.Certification = exports.Education = exports.Project = exports.Profile = exports.Auth = void 0;
const mongoose_1 = require("mongoose");
// Define schemas for subdocuments (nested objects in separate collections)
const skillSchema = new mongoose_1.Schema({
    category: { type: String, required: false },
    skills: [{ type: String, required: false }]
});
const projectSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    technologies: [{ type: String, required: false }],
    githubLink: { type: String, required: false },
    website: { type: String },
    images: [{ type: String, required: false }]
});
// const collegeSchema = new Schema({
//     degree: String,
//     major: String,
//     school: String,
//     year: String,
//     cgpa: String,
//     courseWork: String
// });
// const std12thSchema = new Schema({
//     degree: String,
//     college: String,
//     year: String,
//     board: String,
//     percentage: String,
//     cetPercentile: String,
//     courseWork: String
// });
// const schoolSchema = new Schema({
//     degree: String,
//     school: String,
//     year: String,
//     board: String,
//     percentage: String,
//     courseWork: String
// });
const educationSchema = new mongoose_1.Schema({
    collegeName: {
        type: String,
    },
    degree: {
        type: String
    },
    place: {
        type: String,
    },
    duration: {
        type: String,
    },
    percentage: {
        type: String,
    }
});
const certificationSchema = new mongoose_1.Schema({
    logo: { type: String, required: false },
    name: { type: String, required: false },
    organization: { type: String, required: false },
    rank: { type: String },
    year: { type: String, required: false },
    preview: { type: String, required: false }
});
const courseSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    description: { type: String, required: false },
    technologies: [{ type: String, required: false }],
    tutor: { type: String, required: false },
    platform: { type: String, required: false },
    year: { type: String, required: false },
    preview: { type: String, required: false }
});
const competitionSchema = new mongoose_1.Schema({
    name: { type: String, required: false },
    date: { type: String, required: false },
    organization: { type: String, required: false },
    achievement: { type: String, required: false },
    projectSummary: { type: String, required: false },
    repoLink: { type: String, required: false },
    certificate: { type: String, required: false }
});
const extracurricularSchema = new mongoose_1.Schema({
    title: { type: String, required: false },
    role: { type: String, required: false },
    year: { type: String, required: false },
    description: { type: String, required: false }
});
// Main Profile schema with references to other collections
const profileSchema = new mongoose_1.Schema({
    avatar: { type: String, default: '#' },
    name: { type: String, required: false },
    about: { type: String, required: false },
    descriptors: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    github: { type: String, required: false },
    linkedin: { type: String, required: false },
    skills: [skillSchema], // Array of Skill subdocuments
    resume: { type: String, default: "" },
    projects: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Project' }], // Array of Project object IDs
    education: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Education' }], // Array of Education object IDs
    certifications: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Certification' }], // Array of Certification object IDs
    courses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Course' }], // Array of Course object IDs
    competitions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Competition' }], // Array of Competition object IDs
    extracurricular: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Extracurricular' }] // Array of Extracurricular object IDs
});
const authSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Profile", default: null },
    portfolioUrl: { type: String, required: false, default: "" }
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
