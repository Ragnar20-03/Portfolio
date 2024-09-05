import mongoose from "mongoose";
import { DB_URL } from "../config";
import { register } from "../types/schema";
mongoose.connect(DB_URL).then((res) => {
    console.log("Connection to mongodb  is Succesfull");
}).catch((e) => {
    console.log("connection to mongodb is Failed ! ", e);

})

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    profile: { type: String, required: false },
    linkdein: { type: String, required: false },
    twitter: { type: String, required: false },
    github: { type: String, required: false },
    portfolio: { type: String, required: false }
})

export const User = mongoose.model('user', userSchema)