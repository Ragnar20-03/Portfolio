"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("./config/dotenv");
const db_1 = require("./config/db");
const cloudinary_1 = require("./config/cloudinary");
const sendOtp_1 = require("./services/email/sendOtp");
const userAuth_1 = require("./routes/auth/userAuth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/auth', userAuth_1.authRouter);
app.get('/otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, sendOtp_1.sendOTP)("ap7827681@gmail.com", "54545");
    res.json({
        msg: "mail sent successfully!"
    });
}));
app.post('/verify-otp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.otp == 45678) {
        return res.status(200).json({
            msg: "Otp is valid !"
        });
    }
    return res.status(500).json({
        msg: "Invalid OTP !"
    });
}));
app.listen(dotenv_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connect_db)();
    yield (0, cloudinary_1.cloudinary_start)();
    console.log(`Server Started on port number ${dotenv_1.PORT}`);
}));
