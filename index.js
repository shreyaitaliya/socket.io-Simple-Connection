const express = require('express');
const { createServer } = require('http');
const { join } = require('path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (message) => {
        io.emit('chat message', message); // Broadcast the message to all clients
    });
});

server.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`server start on port ${port}`);
});
