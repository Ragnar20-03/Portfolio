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
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const userMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = yield req.cookies['token'];
        if (!token) {
            return res.status(500).json({
                msg: "Unauthorized Request"
            });
        }
        let verifiedToken = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRETE);
        if (verifiedToken) {
            const { uid } = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRETE);
            req.uid = uid;
            next(); // Call next middleware or route handler
        }
        else {
            return res.status(401).json({
                msg: "Unauthorized Request: Token invalid"
            });
        }
    }
    catch (error) {
        console.log("something went Wrong : ", error);
        return res.status(500).json({
            msg: "Unauthorized Request"
        });
    }
});
exports.userMiddleware = userMiddleware;