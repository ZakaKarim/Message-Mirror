require('dotenv').config();
// if you are using common js apporach than use this also to access the DB-URL IF NOT THAN YOU FACE ERROR
// if you are using Module.js apporach than do not need to config this here 
const mongoose = require("mongoose");

const MONGODB_URI = process.env.DB_URL;
// console.log('DB_URL in db:', process.env.DB_URL)


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI);
    console.log("⚙️ Connected to MongoDB Server⚙️".cyan.underline);
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log("Error While Connecting to MongoDB ", error.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;

// export default connectDB;
