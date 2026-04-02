import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
//import dns from 'dns';
import connectDB from './lib/DB.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import branchRoutes from './routes/branch.routes.js';
import timeinRoutes from './routes/timeinout.routes.js';
import { app, server } from './lib/socket.js';

dotenv.config();

const __dirname = path.resolve();

//dns.setServers(["1.1.1.1", "8.8.8.8"]);

const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:3000',
    process.env.CLIENT_URL 
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

// --- RENDER PRODUCTION LOGIC ---
if (process.env.NODE_ENV === 'production') {
    // Note the '..' - this jumps out of /backend to find /client
    const clientDistPath = path.join(__dirname, 'client', 'dist');
    
    app.use(express.static(clientDistPath));

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(clientDistPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const loadingSteps = [
        { label: 'Initializing server', percent: 20 },
        { label: 'Connecting to database', percent: 50, action: connectDB },
        { label: 'Loading routes', percent: 75 },
        { label: 'Starting socket', percent: 90 },
        { label: 'Ready', percent: 100 },
    ];

    for (const step of loadingSteps) {
        process.stdout.write(`\r\u001b[1;32m[${step.label}]... ${step.percent}%  `);
        if (step.action) await step.action();
        await delay(500);
    }

    process.stdout.write('\n\n');
    console.log('╔══════════════════════════════════════════════════════╗');
    console.log('║                     VAPORYA-POS                      ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log('║  DEV  >>  http://localhost:5173/login                ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log('║  PROD >>  https://vaporyapos.onrender.com/login      ║');
    console.log('╠══════════════════════════════════════════════════════╣');
    console.log(`║  PORT >>  3000                                       ║`);
    console.log('╚══════════════════════════════════════════════════════╝');
    console.log('\u001b[0m');
});