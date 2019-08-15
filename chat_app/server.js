const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.render('index.ejs');
    //res.send('Hello world!');
});

//creating the constant connection between server and client
io.sockets.on('connection', socket => {
    console.log(socket);
    socket.on('username', username => {
        socket.username = username;
        io.emit('is_online', '<i>' + socket.username + ' joined the chat..</i>');
    });

    socket.on('disconnect', username => {
        io.emit('is_online', '<i>' + socket.username + ' left the chat..</i>');
    });

    socket.on('chat_message', message => {
        io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
    });
});

const server = http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});