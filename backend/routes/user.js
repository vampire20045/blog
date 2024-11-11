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
const tokenExpiry = '2h';

router.get("/me", auth, async (req, res) => {
    const admin = await User.findOne({ email: req.user.email });
    if (!admin) {
      res.status(403).json({msg: "Admin does not exist"})
      return
    }
    res.json({
        email: admin.email
    })
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            const token = jwt.sign({ email }, Sec, { expiresIn: tokenExpiry });
            return res.status(200).send({ message: "Login successful", token });
        }
        res.status(401).send({ message: "Invalid credentials" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error", error: err.message });
    }
});

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User already exists" });
        }

        const newUser = new User({ email, password });
        await newUser.save();
        
        const token = jwt.sign({ email }, Sec, { expiresIn: tokenExpiry });
        res.status(201).send({ message: "Signup successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error", error: err.message });
    }
});

router.get("/category", auth, async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ categories });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

router.post("/category/addBlog", auth, async (req, res) => {
    try {
        const { categoryId } = req.query;  // Getting categoryId from query params
        const { title, dis, link, author } = req.body;  // Blog data

        // Validate the categoryId (check if it's a valid ObjectId)
        if (!mongoose.isValidObjectId(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const newBlog = new Blog({
            title,
            dis,
            link,
            author,
            User: req.userId, 
        });

        await newBlog.save();

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        category.posts.push(newBlog._id);

        await category.save();

        const populatedCategory = await Category.findById(categoryId).populate('posts');

        res.status(201).json({
            message: "Blog added to category successfully",
            category: populatedCategory,  
        });
    } catch (error) {
        console.error("Error adding blog to category:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


router.get("/category/:categoryId", auth, async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById(categoryId).populate("posts");

        if (!category) return res.status(404).json({ message: "Category not found" });

        res.status(200).json({
            message: "Blogs fetched successfully",
            category: category,
        });
    } catch (err) {
        // If there's any server error, return a 500 status
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});


export default router;

