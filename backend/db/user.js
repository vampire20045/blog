import mongoose from "mongoose";
import { Blog } from "./Blog.js"; // Corrected path

const UserLogin = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Published: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
});

const User = mongoose.model('User', UserLogin);

export default User;