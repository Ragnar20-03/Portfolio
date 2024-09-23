import { z } from 'zod';

// Define the User schema using Zod
const userSchema = z.object({
    first_name: z.string({
        required_error: "First name is required",
    }).min(1, "First name cannot be empty"),  // Ensure first name is not empty

    last_name: z.string({
        required_error: "Last name is required",
    }).min(1, "Last name cannot be empty"),
    email: z.string({
        required_error: "Email is required",
    }).email("Invalid email format"),  // Validates email format

    password: z.string({
        required_error: "Password is required",
    }).min(8, "Password must be at least 8 characters long"),  // Minimum 8 characters for password

    phone: z.string({
        required_error: "Phone number is required",
    }).regex(/^\d{10}$/, "Phone number must be 10 digits"),  // Example: 10-digit phone number

    profile: z.string().nullable().optional().default(null),  // Default to null if not provided
    linkedin: z.string().nullable().optional().default(null),
    twitter: z.string().nullable().optional().default(null),
    github: z.string().nullable().optional().default(null),
    portfolio: z.string().nullable().optional().default(null),
});


const loginSchema = z.object({

    email: z.string({
        required_error: "Email is required",
    }).email("Invalid email format"),  // Validates email format

    password: z.string({
        required_error: "Password is required",
    }).min(8, "Password must be at least 8 characters long"),  // Minimum 8 characters for password

})
// Define the validateUser function
export const validateUser = (data: any, param: string) => {
    try {
        let result;
        if (param == "register") {
            result = userSchema.parse(data);
        }
        else if (param == "login") {
            result = loginSchema.parse(data)
        }
        console.log("Validation successful:", result);
        return result;  // You can return the validated result
    } catch (err) {
        if (err instanceof z.ZodError) {
            console.error("Validation errors:", err.errors);
            throw err;  // Throw the error if needed, or handle it as per your app logic
        }
    }
};


const projectSchema = z.object({

})