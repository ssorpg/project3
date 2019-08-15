const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;
const db = require('./models');
const jwt = require('jsonwebtoken');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

app.use(wrap(async (req, res, next) => {
  const { token } = req.signedCookies;

  if (token) {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);

    if (!isValid) {
      return res.status(401).send();
    }

    req.userID = isValid.userID;
  }
  else if (req.path !== '/api/users' && req.path !== '/api/users/register') {
    return res.status(401).send();
  }

  next();
}));

require('./routes')(app);

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
  app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);
  });
});
