"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const zod_1 = require("zod");
// Define the User schema using Zod
const userSchema = zod_1.z.object({
    first_name: zod_1.z.string({
        required_error: "First name is required",
    }).min(1, "First name cannot be empty"), // Ensure first name is not empty
    last_name: zod_1.z.string({
        required_error: "Last name is required",
    }).min(1, "Last name cannot be empty"),
    email: zod_1.z.string({
        required_error: "Email is required",
    }).email("Invalid email format"), // Validates email format
    password: zod_1.z.string({
        required_error: "Password is required",
    }).min(8, "Password must be at least 8 characters long"), // Minimum 8 characters for password
    phone: zod_1.z.string({
        required_error: "Phone number is required",
    }).regex(/^\d{10}$/, "Phone number must be 10 digits"), // Example: 10-digit phone number
    profile: zod_1.z.string().nullable().optional().default(null), // Default to null if not provided
    linkedin: zod_1.z.string().nullable().optional().default(null),
    twitter: zod_1.z.string().nullable().optional().default(null),
    github: zod_1.z.string().nullable().optional().default(null),
    portfolio: zod_1.z.string().nullable().optional().default(null),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email is required",
    }).email("Invalid email format"), // Validates email format
    password: zod_1.z.string({
        required_error: "Password is required",
    }).min(8, "Password must be at least 8 characters long"), // Minimum 8 characters for password
});
// Define the validateUser function
const validateUser = (data, param) => {
    try {
        let result;
        if (param == "register") {
            result = userSchema.parse(data);
        }
        else if (param == "login") {
            result = loginSchema.parse(data);
        }
        console.log("Validation successful:", result);
        return result; // You can return the validated result
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            console.error("Validation errors:", err.errors);
            throw err; // Throw the error if needed, or handle it as per your app logic
        }
    }
};
exports.validateUser = validateUser;
;
