import express from "express";
import Router from "Router";
import mongoose from "mongoose";
import Admin from "../db/admin";
import auth from "../middleware/auth";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
const env = process.env.NODE_ENV || 'example';
dotenv.config({ path: `.env.${env}` });
const router= Router.express();
const Sec=process.env.SECRET;
router.post("/AdminLogin",(async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await Admin.findOne({email:email,password:password});
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
}));
router.post("/AdminRegister",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await Admin.findOne({email:email});
        if(user){
            res.status(400).send({message:"User already exists"});
        }
        else{
        const obj={email:email,password:password};
         const newUser=new Admin(obj);   
         await newUser.save();
         const token=jwt.sign(email,Sec,{expiresIn:'2h'});
         res.status(200).send({message:"Singup successfully",token:token}); 


        }
    }
    catch(err){
        res.status(400).send({message:"something went wrong"});
    
    }
})
export default router;