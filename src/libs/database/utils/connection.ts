import mongoose from "mongoose";
import { config } from "dotenv";

config();

export let db: mongoose.Connection;

export async function connectDatabase() {
    const options = {};
    await mongoose.connect(process.env.DB_URI as string, options);
    db = mongoose.connection;
    console.log("Database connected");
}

export async function closeDatabase() {
    await mongoose.connection.close();
}
