import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './lib/DB.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import dns from 'dns';
import { app, server } from './lib/socket.js';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost'],
    credentials: true
}));

app.use(express.json({
  limit: '10mb',
}));

app.use(cookieParser());

//test route
app.get('/test', (req, res) => {
    res.send('Hello World!');
});

app.use('/api', authRoutes);
app.use('/api', productRoutes);


server.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server running on port ${process.env.PORT}`);
});