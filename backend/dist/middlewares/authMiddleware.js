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
Object.defineProperty(exports, "__esModule", { value: true });
exports.M_chechAuthRegisterData = void 0;
const schema_1 = require("../model/schema");
const M_chechAuthRegisterData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = yield schema_1.Auth.findOne({ email: req.body.email });
        // console.log("query is : ", query);
        if (!query) {
            next();
        }
        else {
            res.status(401).json({
                msg: "Already Register With this username/email"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Something went Wrong !"
        });
    }
});
exports.M_chechAuthRegisterData = M_chechAuthRegisterData;
