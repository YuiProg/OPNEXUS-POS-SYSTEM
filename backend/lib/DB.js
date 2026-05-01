import mongoose from "mongoose";
import { initializeSystemSettings } from "../controller/settings.controller.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await initializeSystemSettings();
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}

export default connectDB;