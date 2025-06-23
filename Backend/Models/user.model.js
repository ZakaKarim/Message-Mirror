const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema =  mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    picture:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

}, {
    timestamps:true,
}
);


//This is the Pre Hook method to save the password in the database on the save method only means only on registration
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
  
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

//Method to compare the password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};




const User = mongoose.model("User",userSchema);
module.exports = User;