import express from "express";
import mongoose from "mongoose";
import User from "../db/user.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Blog, Category } from "../db/Blog.js";
import auth from "../middleware/auth.js"; 
const env = process.env.NODE_ENV || 'example';
dotenv.config({ path: `.env.${env}` });

const router = express.Router();
const Sec = process.env.SECRET;

router.post("/Login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            const token = jwt.sign({ email }, Sec, { expiresIn: '2h' });
            res.status(200).send({ message: "Login successfully", token });
        } else {
            res.status(400).send({ message: "Invalid credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: "Something went wrong", error: err.message });
    }
});

router.post("/Register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).send({ message: "User already exists" });
        } else {
            const newUser = new User({ email, password });
            await newUser.save();
            const token = jwt.sign({ email }, Sec, { expiresIn: '2h' });
            res.status(200).send({ message: "Signup successfully", token });
        }
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: "Something went wrong", error: err.message });
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

router.post("/category/:categoryId/addBlog", auth, async (req, res) => {
    const { categoryId } = req.params;
    const { userId, title, dis } = req.body;
    try {
        const category = await Category.findById(categoryId);
        const user = await User.findById(userId);

        if (category && user) {
            const newBlog = new Blog({ title, dis, author: user._id });
            await newBlog.save();

            user.published.push(newBlog._id);
            await user.save();

            category.blogs.push(newBlog._id);
            await category.save();

            res.status(200).json({ message: "Blog added successfully" });
        } else {
            res.status(400).json({ message: "User or category not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Something went wrong", error: err.message });
    }
});

router.get("/category/:categoryId", auth, async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId).populate("blogs");
        if (category) {
            res.status(200).json({ message: "Blogs fetched successfully", blogs: category.blogs });
        } else {
            res.status(400).json({ message: "Category not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Something went wrong", error: err.message });
    }
});

export default router;
