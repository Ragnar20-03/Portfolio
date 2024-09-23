import express from "express"
import cors from "cors"
import { PORT } from "./config"

import { router as userRouter } from "./routes/user"
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json())
app.use(cors())
app.use(cookieParser());

app.use('/user', userRouter)


app.listen(5100, () => {
    console.log("server started on port number ", PORT);

})