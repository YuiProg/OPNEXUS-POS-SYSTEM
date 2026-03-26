import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173']
    }
});

const activeUsers = {};

io.on('connection', (socket) => {


    const id = socket.handshake.query.userId;
    if (id) activeUsers[id] = socket.id;

    if (!id) return; 
    io.emit('onlineUsers', Object.keys(activeUsers));
    console.log(activeUsers);
    socket.on('disconnect', () => {
        const userId = Object.keys(activeUsers).find(
            (key) => activeUsers[key] === socket.id
        );
        if (userId) delete activeUsers[userId];
    });
});

export {io, server, app};
