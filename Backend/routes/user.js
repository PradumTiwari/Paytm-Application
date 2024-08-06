const express=require('express');
const router=express.Router();
const zod=require('zod');
const User =require('../models/User');
const jwt=require('jsonwebtoken');
const{JWT_SECRET}=require('../config/keys');

const signupBody=zod.object({
    username:zod.string().email(),
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string(),
})

router.post('/signUp',async(req,res)=>{
    const {sucess}=signupBody.safeParse(req.body);
    console.log("Sucess",sucess);
    if(!sucess){
        return res.status(400).json({message:"Email Already Taken"});
    }
    const existingUser=await User.findOne({
        username:req.body.username,
    })
    
    if(existingUser){
        return res.status(400).json({message:"Email Already Taken"});
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId=user._id;
    const token=jwt.sign({userId},JWT_SECRET);
    res.status(201).json({
        message:"User Created",
        token,
    });
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post('/signIn',async(req,res)=>{
    const {sucess}=signupBody.safeParse(req.body);
    if(!sucess){
        return res.status(400).json({message:"Incorrect Inputs"});
    }

    const user=await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token=jwt.sign({userId:user._id},JWT_SECRET);
        return res.status(200).json({
            message:"User Signed In",
            token,
        })
    }

    res.status(400).json({message:"Invalid Credentials"});
})


module.exports=router;