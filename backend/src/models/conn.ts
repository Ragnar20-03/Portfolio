import mongoose, { Document, Schema, Model } from 'mongoose';
import { DB_URL } from '../config';

mongoose.connect(DB_URL).then((res) => {
    console.log("connection to mongodb is succesfull !");
}).catch((err) => {
    console.log("connection to mongodb is failed !", err);
})

interface IProject {
    title: string;
    description: string;
    url?: string | null;
    startDate: Date;
    endDate?: Date | null;
    technologies?: string[] | null;
    images: string[] | null
    github: string | null
}
// Define the interface for the User document (this adds TypeScript types to the model)
interface IUser extends Document {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    phone: string;
    profile?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    github?: string | null;
    portfolio?: string | null;
    url_name?: string | null;
    skills?: string[] | null;
    projects?: IProject[] | null
}
const projectSchema: Schema<IProject> = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Project title is required"]
    },
    description: {
        type: String,
        required: [true, "Project description is required"]
    },
    github: {
        type: String,
        required: [false, "Project description is required"]
    },
    url: {
        type: String,
        default: null
    },
    startDate: {
        type: Date,
        required: [true, "Project start date is required"]
    },
    endDate: {
        type: Date,
        default: null
    },
    technologies: {
        type: [String],
        default: []
    },
    images: {
        type: [String],
        default: []
    }
});
// Define the User schema
const userSchema: Schema<IUser> = new mongoose.Schema({
    projects: {
        type: [projectSchema], default: []
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (v: string) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v); // Basic email regex
            },
            message: (props: { value: string }) => `${props.value} is not a valid email!`
        },
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
    first_name: {
        type: String,
        required: [true, "Fisrt Name is required"],
    },
    last_name: {
        type: String,
        required: [true, "Last Name is required"],
    },
    url_name: {
        type: String,
        // required: [true, "Url Name is required"],
        // unique: true,
        default: null
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: function (v: string) {
                return /^\d{10}$/.test(v); // Example: basic validation for a 10-digit phone number
            },
            message: (props: { value: string }) => `${props.value} is not a valid phone number!`
        },
        unique: true
    },
    profile: { type: String, default: null },
    linkedin: { type: String, default: null },
    twitter: { type: String, default: null },
    github: { type: String, default: null },
    portfolio: { type: String, default: null },
    skills: { type: [String], default: [] },

});



export const Project: Model<IProject> = mongoose.model<IProject>('Project', projectSchema)

// Create and export the User model
export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

