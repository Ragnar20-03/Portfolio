const express = require('express')
const app = express()
const port = 5100;
const api = require('./routes/api')
const cors = require('cors');

app.use('/api',api)
app.use(cors());

app.listen(port,function(){
    console.log("Connection Sucessfull");
})