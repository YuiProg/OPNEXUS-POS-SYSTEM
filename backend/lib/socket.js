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

io.on('connection', (socket) => {
    const { userId,} = socket.handshake.auth; 

    if (!userId) return;
    /* eslint-disaable-next-line */
    // const alreadyActive = activeUsers.some((i) => i.userId === userId);
    // if (!alreadyActive) {
    //     activeUsers.push({ userId, username, role });
    //     io.emit('onlineUsers', activeUsers);
    // }

    // socket.on('disconnect', () => {
    //     const index = activeUsers.findIndex((i) => i.userId === userId);
    //     if (index !== -1) activeUsers.splice(index, 1);
    //     io.emit('onlineUsers', activeUsers);
    // });
});

export {io, server, app};
