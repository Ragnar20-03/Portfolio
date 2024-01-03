const express = require('express');
const app = express();
const bodyParser =require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

const admin = require('./Routes/admin.js')
const user = require('./Routes/user.js')

app.use('/admin' , admin)
app.use('/user' , user)

app.listen(5100 , ()=>{
    console.log("Server Started on port Number : 5100");
})
