import express from "express";
import mongoose from "mongoose";
import User from "../db/user.js"; 
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import {Blog,Category} from "../db/Blog.js";

const env = process.env.NODE_ENV || 'example';
dotenv.config({ path: `.env.${env}` });

const router = express.Router(); // Corrected instantiation of Router
const Sec = process.env.SECRET;

router.post("/Login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user=await User.findOne({email:email,password:password});
        if(user){
            const token=jwt.sign(email,Sec,{expiresIn:'2h'}); 
            res.status(200).send({message:"Login successfully",token:token});
            
        }
        else{
            res.status(400).send({message:"Invalid credentials"});
        }
    }
    catch(err){
        res.status(400).send({message:"something went wrong"});
    }
});

router.post("/Register",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(user){
            res.status(400).send({message:"User already exists"});
        }
        else{
        const obj={email:email,password:password};
         const newUser=new User(obj);   
         await newUser.save();
         const token=jwt.sign(email,Sec,{expiresIn:'2h'});
         res.status(200).send({message:"Singup successfully",token:token}); 


        }
    }
    catch(err){
        res.status(400).send({message:"something went wrong"});
    
    }
})
router.post("/addBlog",auth,async(req,res)=>{
    const obj=req.body;
    const newBlog=new Blog(obj);
    await newBlog.save();
    res.status(200).json({message:"Blog added Successfully"});
})
export default router;