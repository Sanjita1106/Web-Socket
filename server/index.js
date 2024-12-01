const express = require("express");
const{Server} =require("socket.io")
const app = express()
const http = require("http");

const server = http.createServer(app);
const io = new Server(server,{
    cors:
    {
      origin:"https://localhost:5173",
      methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("A user connected with ID of :",socket.id);
    socket.on("message",(message)=>{
        console.log("Message received:", message);
        io.emit("message", message);
    });
    socket.on("close",()=>{
        console.log("User disconnected with ID of:", socket.id)
    });
});

const PORT = 3003;

app.use("/", (req,res)=>{
    res.send("Hello!!")
})

app.listen(PORT,()  => console.log("server running on port: ", PORT));