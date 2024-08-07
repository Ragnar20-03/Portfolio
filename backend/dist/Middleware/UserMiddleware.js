"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const userMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        console.log("here");
        return res.status(501).json({
            msg: " UAuthorized Request !"
        });
    }
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(501).json({
            msg: " UAuthorized Request !"
        });
    }
    let decodedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRETE);
    if (!decodedToken) {
        return res.status(501).json({
            msg: " UAuthorized Request !"
        });
    }
    req.uid = decodedToken.uid;
    console.log("req . uid is ", req.uid);
};
exports.default = userMiddleware;
