"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateOTP = () => {
    return crypto_1.default.randomBytes(3).toString('hex');
};
exports.generateOTP = generateOTP;
for (let i = 0; i < 5; i++) {
    console.log(i, " : ", (0, exports.generateOTP)());
}
