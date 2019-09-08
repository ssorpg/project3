// EXPRESS INIT
const express = require('express');
const app = express();

// EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/client/build'));

// COOKIES
const cookieParser = require('cookie-parser');

require('dotenv').config();
app.use(cookieParser(process.env.COOKIE_SECRET));

// LOGGING
const morgan = require('morgan');
app.use(morgan('combined'));

// ERROR HANDLER
const wrap = fn => (...args) => fn(...args).catch(args[2]);

// SECURITY
const helmet = require('helmet');

app.use(helmet.xssFilter());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [`'self'`, `material-ui.com`, `stackpath.bootstrapcdn.com`, `fonts.googleapis.com`]
  }
}));
app.use(helmet.frameguard({ action: 'deny' }));

const jwt = require('jsonwebtoken');

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

// ROUTES
const expressWs = require('express-ws')(app);
require('./routes')(app, expressWs);


// PRODUCTION ROUTE
app.get('*', wrap(async (req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(__dirname + '/client/build/index.html');
  }
  else {
    next();
  }
}));

// 404 HANDLER
app.use(wrap(async (req, res, next) => {
  throw { status: 404, msg: 'Page not found.' };
}));

// ROUTE ERROR SWITCH
app.use((err, req, res, next) => {
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

// SEQUELIZE, SERVER, WEBSOCKET INIT
const db = require('./models');
const PORT = process.env.PORT || 3001;

db.sequelize.sync({ force: JSON.parse(process.env.RESET_DB) }) // all env variables are strings, so bools must be parsed
  .then(function () {
    require('./data/seeds')(db); // run seeds

    app.listen(PORT, function () {
      console.log('App listening on PORT ' + PORT);
    });
  });
