import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connect from "../startup/connect.js"; // Corrected path

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const env = process.env.NODE_ENV || 'example';
dotenv.config({ path: `.env.${env}` });

const port = process.env.Port || 7000;
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
    connect();
});