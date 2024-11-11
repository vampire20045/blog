import express from "express";
import mongoose from "mongoose";
import Admin from "../db/admin.js";
import { Category } from "../db/Blog.js";
import auth from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || 'example';
dotenv.config({ path: `.env.${env}` });

const router = express.Router();
const Sec = process.env.SECRET;

router.post("/AdminLogin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({ email, password });
        if (user) {
            const token = jwt.sign({ email }, Sec, { expiresIn: '2h' });
            res.status(200).json({ message: "Login successfully", token });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Something went wrong", error: err.message });
    }
});

router.post("/AdminRegister", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
        } else {
            const newUser = new Admin({ email, password });
            await newUser.save();
            const token = jwt.sign({ email }, Sec, { expiresIn: '2h' });
            res.status(200).json({ message: "Signup successfully", token });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Something went wrong", error: err.message });
    }
});

router.post("/category", auth, async (req, res) => {
    const { title } = req.body;
    try {
        const x = await Category.findOne({ title });
        if (x) {
            res.status(200).json({ message: "Category already exists" });
        } else {
            const newCategory = new Category(req.body);
            await newCategory.save();
            res.status(200).json({ message: "Category added successfully" });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Something went wrong", error: err.message });
    }
});

router.get("/category", auth, async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ message: categories });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Something went wrong", error: err.message });
    }
});
router.delete("/category/:categoryId",auth,async(req,res)=>{

    const categoryId=req.params;
    try{
        const x=await Category.findByIdAndDelete(categoryId);
        if(x){
            res.status(200).json({message:"Category deleted successfully"});
        }
        else{
            res.status(400).json({message:"Category not found"});}
    }
    catch(err){
        console.error(err);
        res.status(400).json({message:"Something went wrong",error:err.message});
    }

})

export default router;
