"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authApiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.authApiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    limit: 3,
    message: {
        msg: "Too many request from this ip  . PLease try again after some time"
    }
});
