import { Schema, model } from 'mongoose';

// Define schemas for subdocuments (nested objects in separate collections)
const skillSchema = new Schema({
    category: { type: String, required: true },
    skills: [{ type: String, required: true }]
});

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    githubLink: { type: String, required: true },
    website: { type: String },
    images: [{ type: String, required: true }]
});

const collegeSchema = new Schema({
    degree: { type: String, required: true },
    major: { type: String, required: true },
    school: { type: String, required: true },
    year: { type: String, required: true },
    cgpa: { type: String, required: true },
    courseWork: { type: String, required: true }
});

const std12thSchema = new Schema({
    degree: { type: String, required: true },
    college: { type: String, required: true },
    year: { type: String, required: true },
    board: { type: String, required: true },
    percentage: { type: String, required: true },
    cetPercentile: { type: String },
    courseWork: { type: String, required: true }
});

const schoolSchema = new Schema({
    degree: { type: String, required: true },
    school: { type: String, required: true },
    year: { type: String, required: true },
    board: { type: String, required: true },
    percentage: { type: String, required: true },
    courseWork: { type: String, required: true }
});

const educationSchema = new Schema({
    college: { type: collegeSchema, required: true },
    std12th: std12thSchema,
    school: schoolSchema
});

const certificationSchema = new Schema({
    logo: { type: String, required: true },
    name: { type: String, required: true },
    organization: { type: String, required: true },
    rank: { type: String },
    year: { type: String, required: true },
    preview: { type: String, required: true }
});

const courseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String, required: true }],
    tutor: { type: String, required: true },
    platform: { type: String, required: true },
    year: { type: String, required: true },
    preview: { type: String, required: true }
});

const competitionSchema = new Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    organization: { type: String, required: true },
    achievement: { type: String, required: true },
    projectSummary: { type: String, required: true },
    repoLink: { type: String, required: true },
    certificate: { type: String, required: true }
});

const extracurricularSchema = new Schema({
    title: { type: String, required: true },
    role: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true }
});

// Main Profile schema with references to other collections
const profileSchema = new Schema({
    avatar: { type: String, default: '#' },
    name: { type: String, required: true },
    about: { type: String, required: true },
    descriptors: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    github: { type: String, required: true },
    linkedin: { type: String, required: true },
    skills: [skillSchema], // Array of Skill subdocuments
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }], // Array of Project object IDs
    education: [{ type: Schema.Types.ObjectId, ref: 'Education' }], // Array of Education object IDs
    certifications: [{ type: Schema.Types.ObjectId, ref: 'Certification' }], // Array of Certification object IDs
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // Array of Course object IDs
    competitions: [{ type: Schema.Types.ObjectId, ref: 'Competition' }], // Array of Competition object IDs
    extracurricular: [{ type: Schema.Types.ObjectId, ref: 'Extracurricular' }] // Array of Extracurricular object IDs
});

const authSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileId: { type: Schema.Types.ObjectId, ref: "Profile", default: null },
    otp: { type: String, default: null, required: false }
})

// Models for separate collections
export const Auth = model("Auth", authSchema)
export const Profile = model('Profile', profileSchema);
export const Project = model('Project', projectSchema);
export const Education = model('Education', educationSchema);
export const Certification = model('Certification', certificationSchema);
export const Course = model('Course', courseSchema);
export const Competition = model('Competition', competitionSchema);
export const Extracurricular = model('Extracurricular', extracurricularSchema);
