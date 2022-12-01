const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app)

const io = new Server(server,{
    allowRequest: (req, callback) => {
        callback(null, req.headers.origin === undefined); // cross-origin requests will not be allowed
      }
});

io.on("connect", socket => {
    socket.on("sendMessage", input => {
        const message ={
            ...input,
            id: new Date().getTime().toString(),
            sendAt: new Date().getTime()
        }
        console.log(message)
        io.emit("receive-message",message)
    })
    socket.on("ping", input => {
        io.emit("pong")
    })
    
})

server.listen(3001, () => {
    console.log('Server is running')
})