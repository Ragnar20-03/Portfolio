import express from "express"

import router from "./Routes/user"
const app = express()

app.use('/user' , router)


app.listen (5100 , () => {
    console.log("express Server is running on Port number 5100 ");
})
