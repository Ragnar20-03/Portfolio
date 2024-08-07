"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config/config");
mongoose_1.default.connect(config_1.MONGO_URL).then((res) => {
    console.log("Mongodb Atlas Connection Succesfull !");
}).catch((e) => {
    console.log("error in connecting with Mongodb Atlas", e);
});
const userSchema = new mongoose_1.default.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    ph: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    threads: { type: String, required: true },
    address: { type: String, required: true },
    gitLink: { type: String, required: true },
    linkdein: { type: String, required: true },
    profileUrl: { type: String }
});
const UserModel = mongoose_1.default.model('user', userSchema);
exports.default = UserModel;
