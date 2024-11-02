const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let userCount = 0;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    userCount++;
    const userName = `User ${userCount}`;
    console.log(`${userName} connected`);

    socket.on('disconnect', () => {
        console.log(`${userName} disconnected`);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', `${userName}: ${msg}`);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
