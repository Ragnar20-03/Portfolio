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
const otp_1 = require("./services/otp/otp");
const userAuth_1 = require("./routes/auth/userAuth");
const user_1 = require("./routes/user/user");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const rateLimiter_1 = require("./services/rateLimiter");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        const allowedOriginPattern = /http:\/\/localhost:\d{4}|https:\/\/your-production-domain\.com|https:\/\/rhqx4pwf-5100\.inc1\.devtunnels\.ms/;
        if (!origin)
            return callback(null, true); // Allow requests without origin, e.g., curl, Postman
        if (allowedOriginPattern.test(origin)) {
            callback(null, true); // Origin matches the pattern
        }
        else {
            callback(new Error('Not allowed by CORS')); // Origin is not allowed
        }
    },
    credentials: true // Allow credentials (cookies)
}));
app.use((0, cookie_parser_1.default)()); // Use cookie-parser here
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use('/api/auth/get-otp', authApiLimiter)
app.use('/api/auth/verify-otp', rateLimiter_1.authApiLimiter);
app.use('/api/auth', userAuth_1.authRouter);
app.use('/api/user', user_1.router);
app.get('/', (req, res) => {
    res.send("Express Backend it is !");
});
app.listen(dotenv_1.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    let instance = otp_1.OTP.getInstance();
    yield (0, db_1.connect_db)();
    yield (0, cloudinary_1.cloudinary_start)();
    console.log(`Server Started on port number ${dotenv_1.PORT}`);
}));
