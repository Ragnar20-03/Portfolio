"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
mongoose_1.default.connect(config_1.DB_URL).then((res) => {
    console.log("connection to mongodb is succesfull !");
}).catch((err) => {
    console.log("connection to mongodb is failed !", err);
});
// Define the User schema
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (v) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v); // Basic email regex
            },
            message: (props) => `${props.value} is not a valid email!`
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
            validator: function (v) {
                return /^\d{10}$/.test(v); // Example: basic validation for a 10-digit phone number
            },
            message: (props) => `${props.value} is not a valid phone number!`
        },
        unique: true
    },
    profile: { type: String, default: null },
    linkedin: { type: String, default: null },
    twitter: { type: String, default: null },
    github: { type: String, default: null },
    portfolio: { type: String, default: null },
    skills: { type: [String], default: [] }
});
// Create and export the User model
exports.User = mongoose_1.default.model('User', userSchema);
