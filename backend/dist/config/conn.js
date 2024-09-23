"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const connect = () => {
    mongoose_1.default.connect(config_1.DB_URL).then((res) => {
        console.log("coonection to mongodb is succesfull!");
    }).catch((err) => {
        console.log("connection to mongodb Failed !");
    });
};
exports.connect = connect;
