import express from "express";
import {createServer} from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.json());
const PORT = 4001;
const httpServer = createServer(app);

const io = new Server(httpServer);

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/page.html");
})

io.on("connection", (socket)=>{
    console.log(`connected socket: ${socket.id}`);
    socket.on('disconnect',()=>{
        console.log(`disconnected socket: ${socket.id}`);
    })
    socket.emit("welcome", "Welcome msg from server");

    socket.on("textValue", (value) => {
        console.log(value);
    })
})

httpServer.listen(PORT, () => console.log(`Running on Port ${PORT}`));

