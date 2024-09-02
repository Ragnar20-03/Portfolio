import express from "express"
// import { createClient } from "redis";
import { WebSocketServer } from "ws";

const app = express () ; 
app.use(express.json() ) ; 

// const redisClient = createClient() ; 


const httpServer = app.listen(5100 , () => {
console.log("server startde on port number 5100 ");
})

const  wss =  new WebSocketServer({server : httpServer})
     

wss.on('connection' , (socket) => {
    socket.on('error' , (err) => {
        console.log("something went Wrong with socket " , socket);
        
    })

    socket.on('message' , (data) => {
        console.log("data Recived from socket  is : "  , data);
        
    })

    socket.send("You are connected Succesfully !")
})

