import mongoose from "mongoose";
const UserLogin = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },});

const Admin = mongoose.model('Admin', UserLogin);
export default Admin;