import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import dns from 'dns';
import connectDB from './lib/DB.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import branchRoutes from './routes/branch.routes.js';
import timeinRoutes from './routes/timeinout.routes.js';
import { app, server } from './lib/socket.js';

dotenv.config();

// Standardize directory name for ES modules
const __dirname = path.resolve();

// Only set custom DNS if specifically needed for your environment; 
// Render usually handles this automatically.
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:3000',
    process.env.CLIENT_URL // This will be your Render URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json({
    limit: '10mb',
}));

app.use(cookieParser());

// API Routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', branchRoutes);
app.use('/api', timeinRoutes);

// Test route
app.get('/test', (req, res) => {
    res.send('Server is up and running!');
});


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});