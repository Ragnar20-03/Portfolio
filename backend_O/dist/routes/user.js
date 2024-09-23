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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const conn_1 = require("../models/conn");
const userMiddleware_1 = require("../middleware/userMiddleware");
const userController_1 = require("../controller/userController");
exports.router.post('/register', userController_1.userRegisterController);
exports.router.post('/login', userController_1.userLoginController);
exports.router.get('/details/:url_name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        conn_1.User.findOne({ url_name: req.params.url_name }).then((res1) => {
            res.status(200).json({
                details: res1
            });
        });
    }
    catch (error) {
        // console.log("Error is  :", error);
        res.status(500).json({
            msg: "Something went wrong !"
        });
    }
}));
exports.router.get(`/projects/:url_name`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        conn_1.User.findOne({}).then((res1) => {
            res.status(200).json({
                data: res1
            });
        });
    }
    catch (error) {
    }
}));
exports.router.get('/projects', userMiddleware_1.userMiddleware, userController_1.userGetProjectsController);
exports.router.get("/addProject", userMiddleware_1.userMiddleware, userController_1.userAddProjectController);
