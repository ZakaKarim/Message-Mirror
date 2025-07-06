const dotenv = require("dotenv")
const express = require("express")
const connectDB = require('./config/db')
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')

dotenv.config();
// console.log('DB_URL: in app.js', process.env.DB_URL)
connectDB();
const app = express()

app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));


app.get('/',(req,res)=>{
    res.send('Hello World! from Message Mirror')
})

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

const PORT = process.env.PORT || 5000

const  server = app.listen(PORT, () => {
    console.log(`The project is running on PORT ${PORT}.`.yellow.bold);
  });

const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin: "http://localhost:5173"
    },
})

io.on("connection",(socket)=>{
 console.log("connected to socket.io");

 socket.on("setup", (userData)=>{
    console.log(userData)
    socket.join(userData._id)
    socket.emit("connected")
 })

 socket.on("join chat", (room)=>{
    socket.join(room);
    console.log("User Joined Room:" + room)
 })

 socket.on('new message', (newMessageRecieved)=>{
    var chat = newMessageRecieved.chat;  

    if(!chat.users) return console.log("chat.users not defined");

    chat.users.forEach(user=>{
        if (user._id == newMessageRecieved.sender._id) return;
        socket.in(user._id).emit("message recieved", newMessageRecieved)
        // in means inside that users room
        // emit/send that message
    })
    
 })

});