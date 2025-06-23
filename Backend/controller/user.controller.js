const User = require('../Models/user.model')
const generateToken = require("../config/generateToken")

const asyncHandler = require("express-async-handler")

const registerUser = asyncHandler(async (req,res)=>{
    const { name, email, password, pic } = req.body;
    if(!name || !email || !password)
    {
         return res.status(401).json({Message:"Please Enter all the Fields"});
    }
    const userExisit =  await User.findOne({email});
    if(userExisit){
        return res.status(400).json({Message:"User Already Exist"});
    }
    const user = await User.create({
        name,
        email,
        password,
        pic,
    })
   if(user){
    return res.status(201).json({user,token: generateToken(user._id)})
   }
   else{
    return res.status(400).json({Message:"Faild to create a User"});
   }

})

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password } = req.body;
    if(!email || !password){
        return res.status(401).json({Message:"Please Enter all the Fields"});
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(200).json({Message:"Invalid Credentials"})
    }
    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(400).json({Message:"Invalid Credentials"})
    }

    // return res.status(200).json({user,token:generateToken(user._id)})
     return res.status(200).json({Message: "Login Successfully",user,token:generateToken(user._id)})
        
    
})

module.exports = { registerUser,loginUser }