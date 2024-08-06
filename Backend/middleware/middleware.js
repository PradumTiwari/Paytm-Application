const {JWT_SECRET}=require('../config/jwt');
const jwt=require('jsonwebtoken');

const authmiddleware=async(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }
    console.log("AuthHeader",authHeader);
    
    const token=authHeader.split(' ')[1];

    try {
        const decode=jwt.verify(token,JWT_SECRET);
        req.userId=decode.userId;
        next();
    } catch (error) {
        return res.status(403).json({});
    }

}

module.exports={authmiddleware};