import mongoose from "mongoose";
import { DB_URL } from "./config";


export const connect = () => {
    mongoose.connect(DB_URL).then((res) => {
        console.log("coonection to mongodb is succesfull!");
    }).catch((err) => {
        console.log("connection to mongodb Failed !");
    })
}