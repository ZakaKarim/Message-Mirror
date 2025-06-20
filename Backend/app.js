const dotenv = require("dotenv")
const express = require("express")

const app = express()
dotenv.config();

app.get('/',(req,res)=>{
    res.send('Hello World! from Message Mirror')
})

const PORT = process.env.PORT || 5000

app.listen(7000, console.log(`Server listening on port 7000`))