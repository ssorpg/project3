const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/client/build'));

const morgan = require('morgan');
app.use(morgan('combined'));

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

require('dotenv').config();
app.use(cookieParser(process.env.COOKIE_SECRET));

const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

app.use(wrap(async (req, res, next) => {
  const { token } = req.signedCookies;

  if (token) {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecoded) {
      throw { status: 401 };
    }

    req.token = {
      UserId: tokenDecoded.UserId
    };
  }
  else if (req.path !== '/api/users'
    && req.path !== '/api/users/register'
    && req.path !== '/api/users/logout'
    && req.path !== '/'
    && req.path !== '/register') {
    throw { status: 401 };
  }

  next();
}));

require('./routes')(app);

app.get('*', wrap(async function (req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(__dirname + '/client/build/index.html');
  }
  else {
    next();
  }
}));

app.use(wrap(async function (req, res, next) { // 404 handler
  throw { status: 404, msg: 'Page not found.' };
}));

app.use(function (err, req, res, next) { // error handler middleware, called with 'next' from routes
  console.log(err);

  switch (err.status) {
    case 400:
      return res.status(err.status).send(err.msg ? err.msg : 'Request malformed.');
    case 401:
      return res.status(err.status).send(err.msg ? err.msg : 'Unauthorized.');
    case 404:
      return res.status(err.status).send(err.msg ? err.msg : 'Not found.');
    default:
      return res.status(500).send(err.errors ? err.errors[0].message : 'Server error.'); // returns sequelize error messages
  }
});

const db = require('./models');
const PORT = process.env.PORT || 3001;
const WebSocket = require('ws');

//creating the constant connection between server and client
db.sequelize.sync({ force: process.env.RESET_DB }).then(function () {
  require('./data/seeds')(db); // run seeds

  const server = app.listen(PORT, function () {
    console.log('App listening on PORT ' + PORT);

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
