require("dotenv").config();
const jwt = require("jsonwebtoken")
const User = require('../Models/user.model')
const asyncHandler = require("express-async-handler")


const protect = asyncHandler(async (req, res, next) => {
 let token;

 if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ){
    try{
        token = req.headers.authorization.split(" ")[1];

        //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   console.log("decoded", decoded)

      req.user = await User.findById(decoded.id).select("-password");
    //   console.log("rq.user", req.user)

      next();
    }
    catch{
        return res.status(401).json({Message:"Unauthorized token or token failed"})
    }

  }
  if(!token){
    return res.status(404).json({Message:"Token not found"})
  }

});

module.exports = { protect };