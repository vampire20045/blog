import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const connect=async()=>{
    try{
        const x=await mongoose.connect(process.env.uri);
        if(x){
            console.log("connected to database");
        }
        else{
            console.log("error connecting to database");
        }
    }
    catch(error){
        console.log("error connecting to database");
    }
    app.listen(5000,()=>{
        console.log("server started at the port");
        connect();
    })

}