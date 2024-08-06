import express from "express"
import cors from 'cors'
import router from "./Routes/user"
import bodyParser from "body-parser"
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/user' , router)


app.listen (5100 , () => {
    console.log("express Server is running on Port number 5100 ");
})
