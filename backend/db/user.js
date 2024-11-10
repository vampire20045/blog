import mongoose from "mongoose";
import BlogPost from "./Blog";

const UserLogin = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Published: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }]
});

const User = mongoose.model('User', UserLogin);
export default User;