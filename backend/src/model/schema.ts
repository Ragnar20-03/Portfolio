import mongoose, { Schema, model, connect } from 'mongoose';
import { MONGO_URL } from '../config/config';

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Mongodb Atlas Connection Successful!");
  })
  .catch((e) => {
    console.error("Error in connecting with Mongodb Atlas", e);
  });

// Define Project interface
interface Project {
  title: string;
  description: string;
  technologies: string[];
  timeline: string;
  gitLink: string;
  liveLink: string;
  tools: string[];
}

// Define User interface
interface User {
  fname: string;
  lname: string;
  ph: string;
  email: string;
  address: string;
  gitLink: string;
  linkedin: string;
  threads: string;
  profileUrl?: string;
  password: string;
}

// Create User schema
const userSchema = new Schema<User>({
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
const projectSchema = new Schema<Project>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeline: { type: String, required: true },
  gitLink: { type: String, required: true },
  liveLink: { type: String, required: true },
  technologies: { type: [String] },
  tools: { type: [String] },
});

// Create User and Project models
export const UserModel = model<User>('User', userSchema);
export const ProjectModel = model<Project>('Project', projectSchema);
