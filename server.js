const express = require('express');
const app = express();
const portNumber = process.env.PORT || 3000;
const socketIo = require('socket.io');
const http = require('http');

const server = http.Server(app);

const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('joinRoom', (data) => {
        console.log('JOINING ROOM:');
        socket.join(data.room);
    })
    
    socket.on('newMsg', (data) => {
        console.log('SENDING MSG TO:', data.room);
        io.in(data.room).emit('serverMsg', {msg: data.msg})
    })
});

app.get('/*', (req, res) => {
    res.send('HELLO SOCKET SERVER');
});

server.listen(portNumber, () => {
    console.log('Server started on port: ' + portNumber);
});
