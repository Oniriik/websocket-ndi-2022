const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin: ["http://localhost:3000"],
        methods: ["GET","POST"],
    },
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
})

server.listen(3001, () => {
    console.log('Server is running')
})