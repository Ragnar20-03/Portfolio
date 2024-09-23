import express from "express";
import cors from "cors"
import { connect } from "./config/conn"
import cookieParser from "cookie-parser";
import { router as userRouter } from "./routes/user"

const app = express()

app.use(cors())
app.use(cookieParser())

app.use("/user", userRouter)




app.listen(5100, () => {
    console.log("server started on port number 5100");
    connect();
})