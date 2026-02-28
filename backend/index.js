import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './handler/DB.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(express.json({
  limit: '10mb',
}));

app.use(cookieParser());
const server = http.createServer(app);

//test route
app.get('/test', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', authRoutes);


server.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server running on port ${process.env.PORT}`);
});