const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.isAuthenticated =  async(req,res,next) => {

     const { token } = req.cookies;
     if(!token){
        return res.status(401).json({
            message : "Please login first"
        });
     }

     const decoded = await jwt.verify(token, process.env.JWT_SECRET);

     req.user = await User.findById(decoded._id);
     next();
}