"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.M_userTokenMiddleware = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const dotenv_1 = require("../config/dotenv");
const schema_1 = require("../model/schema");
const M_userTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check for cookie presence and value
        console.log("response url is : ", req.originalUrl);
        let token = req.cookies['token'];
        console.log("token is : ", token);
        if (!token) {
            return res.status(401).json({ msg: "UnAuthorized Request !" });
        }
        // Proceed with verification only if the cookie is present and has a value
        let verifiedToken = jsonwebtoken_1.default.verify(token, dotenv_1.JWT_SECRET);
        if (verifiedToken) {
            if (verifiedToken.authId && verifiedToken.profileId) {
                let query = yield schema_1.Auth.findOne({ _id: verifiedToken.authId });
                if (query) {
                    req.authId = verifiedToken.authId;
                    req.profileId = verifiedToken.profileId;
                    next();
                }
            }
            else {
                return res.status(401).json({ msg: "UnAuthorized Request !" });
            }
        }
        else {
            return res.status(401).json({ msg: "UnAuthorized Request !" });
        }
    }
    catch (error) {
        console.log("error is : ", error);
        if (error instanceof jsonwebtoken_1.TokenExpiredError) {
            // Handle token expiration (e.g., refresh token)
            return res.status(401).json({ msg: "Your authorization token has expired. Please log in again." });
        }
        else {
            return res.status(500).json({
                msg: "Unauthorized Request !"
            });
        }
    }
});
exports.M_userTokenMiddleware = M_userTokenMiddleware;
