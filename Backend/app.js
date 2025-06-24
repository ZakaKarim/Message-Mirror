const dotenv = require("dotenv")
const express = require("express")
const connectDB = require('./config/db')
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')

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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`The project is running on PORT ${PORT}.`.yellow.bold);
  });