import mongoose from "mongoose";
const UserLogin = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },});

const User = mongoose.model('User', UserLogin);
export default User;