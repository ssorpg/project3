const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require("./models");

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

require("./routes")(app);

app.use(function (err, req, res, next) { // error handler middleware, called with 'next'
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// app.get('/chat', (req, res) => {
//   res.render('index.ejs');
//   //res.send('Hello world!');
// });

//creating the constant connection between server and client
io.sockets.on('connection', socket => {

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

db.sequelize.sync().then(function () {
  http.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
