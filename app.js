const express = require('express')
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');
const dotenv = require('dotenv');
const {connectDb} = require('./config/db');
const router = require('./routes/UserRoutes');
const path = require('path');
const socket = require("socket.io")

const App = express();
dotenv.config({path:"./config/config.env"});
App.use(express.json({limit:"50mb"}));
App.use(express.urlencoded({limit: "50mb"}))
App.use(cookieParser());
App.use(router);
App.use(require("./routes/chatRoute"))

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLODINARY_SECRETKEY
})

connectDb();

//accessing client/build/index.html
// if (process.env.NODE_ENV !== "production") {
//     App.use(express.static(path.join(__dirname, "./client/build")));

//     App.get("*", (req, res) => {
//       res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
//     });
// }

const server = App.listen(process.env.PORT, ()=>{
    console.log(`Server is working on port ${process.env.PORT}`)
});

const io = socket(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials:true
    },
    allowEIO3: true
})

let onlineUsers = new Map();


io.on("connection", (socket) =>{
    global.chatSocket = socket;
    socket.on("add-user", (userId) =>{
        console.log("Socket connected ! user-id -> " + userId);
        console.log("socket id -> " + socket.id);
        onlineUsers.set(userId, socket.id);
        console.log(onlineUsers);
    });

    socket.on("send-msg", (data) =>{
        const reciever = onlineUsers.get(data.reciever);
        console.log(`msg recieved -> ${data.message}`)

        if(reciever){
            socket.to(reciever).emit("recieve-msg", (data.message));
        }
    });

    socket.on("disconnect", () =>{
        onlineUsers.delete(socket.id)
    })
});