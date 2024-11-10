import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import mongodb from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const env = process.env.NODE_ENV || 'example';
dotenv.config({ path: `.env.${env}` });

const connect = async () => {
    try {
        const dbUrl = process.env.Uri ?? '';
        if (!dbUrl) {
            throw new Error("Database URI is not defined in environment variables");
        }

        const connection = await mongoose.connect(dbUrl);
        if (connection) {
            console.log("Connected to database");
        } else {
            console.log("Error connecting to database");
        }
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};
export default connect;