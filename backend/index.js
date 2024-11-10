import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connect from "./startup/connect.js"; 
import admin from "./routes/admin.js";
import user from "./routes/user.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/admin",admin);
app.use("/user",user)

const env = process.env.NODE_ENV || 'example';
dotenv.config({ path: `.env.${env}` });

const port = process.env.Port || 7000;
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
    connect();
});