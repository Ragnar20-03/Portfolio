const express = require('express')
const port = 5000;
const api = require('./routes/api')
const cors = require('cors');

const app = express()
app.use('/api',api)
app.use(cors());

app.listen(port,function(){
    console.log("Connection Sucessfull");
})