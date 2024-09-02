"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { createClient } from "redis";
const ws_1 = require("ws");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const redisClient = createClient() ; 
const httpServer = app.listen(5100, () => {
    console.log("server startde on port number 5100 ");
});
const wss = new ws_1.WebSocketServer({ server: httpServer });
wss.on('connection', (socket) => {
    socket.on('error', (err) => {
        console.log("something went Wrong with socket ", socket);
    });
    socket.on('message', (data) => {
        console.log("data Recived from socket  is : ", data);
    });
    socket.send("You are connected Succesfully !");
});
