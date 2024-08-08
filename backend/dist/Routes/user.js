"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controller/userController");
const UserMiddleware_1 = __importDefault(require("../Middleware/UserMiddleware"));
router.post('/login', userController_1.userLoginController);
router.post('/register', UserMiddleware_1.default, userController_1.userRegisterController);
router.post('/project', UserMiddleware_1.default, userController_1.userProjectUploadController);
router.get('/project', UserMiddleware_1.default, userController_1.userProjectGetController);
exports.default = router;
