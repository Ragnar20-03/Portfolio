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
exports.userLoginController = exports.userRegisterController = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const schema_1 = require("../../model/schema");
exports.router = express_1.default.Router();
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const query = yield schema_1.Auth.create({
        username, password
    });
    res.json({
        query
    });
});
exports.userRegisterController = userRegisterController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.userLoginController = userLoginController;
