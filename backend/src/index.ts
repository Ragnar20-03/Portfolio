import express from "express"
import cors from "cors"
import { PORT } from "./config"
import { User } from "./db/conn";
import { router as userRouter } from "./routes/user"

const app = express();
app.use(express.json())
app.use(cors())

app.use('/user', userRouter)


app.listen(5100, () => {
    console.log("server started on port number ", PORT);

})