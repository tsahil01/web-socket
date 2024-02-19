const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});


io.on('connection', (socket) => {
    console.log('a user connected with an id: ', socket.id);
    socket.on('chat msg', (msg)=>{ // input box msg
        // console.log(msg);
        io.emit('msgFromInputBox', msg); // broadcast this msg to everyone
    });
    socket.on('disconnect', () => {
        console.log('user disconnented');
    });
});


server.listen(PORT, ()=> console.log(`Listening on Port ${PORT}`) );
