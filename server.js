const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const morgan = require('morgan');
app.use(morgan('combined'));

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();
app.use(cookieParser(process.env.COOKIE_SECRET));

const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

app.use(wrap(async (req, res, next) => {
  console.log('are ya logged in?!');
  const { token } = req.signedCookies;

  if (token) {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);

    if (!isValid) {
      return res.status(401).send();
    }

    req.UserId = isValid.UserId;
  }
  else if (req.path !== '/api/users' && req.path !== '/api/users/register') {
    return res.status(401).send('Unauthorized.');
  }

  next();
}));

require('./routes')(app);

app.use(function (err, req, res, next) { // error handler middleware, called with 'next'
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

const db = require("./models");
const PORT = process.env.PORT || 3001;
const WebSocket = require('ws');

//creating the constant connection between server and client
db.sequelize.sync().then(function () {
  const server = app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);

    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(data);
          }
        });
      });
    });
  });
});
