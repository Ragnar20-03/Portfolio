"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
mongoose_1.default.connect(config_1.DB_URL).then((res) => {
    console.log("Connection to mongodb  is Succesfull");
}).catch((e) => {
    console.log("connection to mongodb is Failed ! ", e);
});
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    profile: { type: String, required: false },
    linkdein: { type: String, required: false },
    twitter: { type: String, required: false },
    github: { type: String, required: false },
    portfolio: { type: String, required: false }
});
exports.User = mongoose_1.default.model('user', userSchema);
