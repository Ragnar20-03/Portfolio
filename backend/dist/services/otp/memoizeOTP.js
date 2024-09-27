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
const crypto_1 = __importDefault(require("crypto"));
class OTP {
    constructor() {
        this.users_otps = [];
        this.checkExistingOtp = (otp) => {
            return this.users_otps.some(user => user.otp === otp);
        };
        this.generateOTP = (email) => __awaiter(this, void 0, void 0, function* () {
            let otp = crypto_1.default.randomBytes(3).toString('hex');
            // Keep generating OTPs until a unique one is found
            while (this.checkExistingOtp(otp)) {
                otp = crypto_1.default.randomBytes(3).toString('hex');
            }
            const currentTime = Date.now();
            this.users_otps.push({ email, otp, createdAt: currentTime });
            return otp;
        });
        this.validateOtp = (email, otp) => {
            const currentTime = Date.now();
            const userOtp = this.users_otps.find(user => user.email === email && user.createdAt + (5 * 60 * 1000) > currentTime);
            if (!userOtp) {
                return false;
            }
            if (userOtp.otp !== otp) {
                return false;
            }
            // OTP is valid, remove it from the list (optional)
            this.users_otps = this.users_otps.filter(user => user.email !== email);
            return true;
        };
        this.users_otps = [];
    }
    static getInstance() {
        if (!this.instance) {
            OTP.instance = new OTP();
        }
        return OTP.instance;
    }
}
OTP.instance = null;