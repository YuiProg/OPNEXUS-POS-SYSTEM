import express from 'express';
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
import salesRoutes from './routes/sales.routes.js';
import vipRoutes from './routes/vip.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import categoryRoutes from './routes/category.routes.js';
import logsRoutes from './routes/logs.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import { app, server } from './lib/socket.js';

dotenv.config();

const __dirname = path.resolve();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

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
app.use('/api', salesRoutes);
app.use('/api', vipRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', categoryRoutes);
app.use('/api', logsRoutes);
app.use('/api', settingsRoutes);

// Test route
app.get('/test', (req, res) => {
    res.send('Server is up and running!');
});

// --- RENDER PRODUCTION LOGIC ---
if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, 'client', 'dist');
    
    app.use(express.static(clientDistPath));

    // Change '/:any*' to this Regex:
    app.get(/^(?!\/api).+/, (req, res) => {
        res.sendFile(path.resolve(clientDistPath, 'index.html'));
    });
}

const PORT = process.env.PORT || 3000;


//loading simulation by claude
server.listen(PORT, async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    const clearLine = () => process.stdout.write('\r\u001b[K');

    const colors = {
        green:   '\u001b[1;32m',
        cyan:    '\u001b[1;36m',
        yellow:  '\u001b[1;33m',
        magenta: '\u001b[1;35m',
        blue:    '\u001b[1;34m',
        white:   '\u001b[1;37m',
        reset:   '\u001b[0m'
    };

    const loadingSteps = [
        { label: 'Initializing server',    percent: 20,  color: colors.cyan    },
        { label: 'Connecting to database', percent: 50,  color: colors.yellow, action: connectDB },
        { label: 'Loading routes',         percent: 75,  color: colors.magenta },
        { label: 'Starting socket',        percent: 90,  color: colors.blue    },
        { label: 'Ready',                  percent: 100, color: colors.green   },
    ];

    for (const step of loadingSteps) {
        clearLine();
        process.stdout.write(`${step.color}[${step.label}]... ${colors.white}${step.percent}%`);
        if (step.action) await step.action();
        await delay(500);
    }

    clearLine();
    process.stdout.write('\n');
    console.log(`${colors.green}╔══════════════════════════════════════════════════════╗`);
    console.log(`║${colors.white}                     VAPORYA-POS                      ${colors.green}║`);
    console.log(`╠══════════════════════════════════════════════════════╣`);
    console.log(`║  ${colors.cyan}DEV  ${colors.white}>>  ${colors.blue}http://localhost:5173/login                ${colors.green}║`);
    console.log(`╠══════════════════════════════════════════════════════╣`);
    console.log(`║  ${colors.cyan}PROD ${colors.white}>>  ${colors.blue}https://vaporyapos.onrender.com/login      ${colors.green}║`);
    console.log(`╠══════════════════════════════════════════════════════╣`);
    console.log(`║  ${colors.cyan}PORT ${colors.white}>>  ${colors.yellow}${PORT}                                       ${colors.green}║`);
    console.log(`╚══════════════════════════════════════════════════════╝`);
    console.log(colors.reset);
});

