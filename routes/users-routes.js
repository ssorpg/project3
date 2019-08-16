const db = require("../models");
const auth = require('./auth/auth');

require('dotenv').config();

const cookieOptions = {
  expires: new Date(Date.now() + 43200000),
  httpOnly: true,
  secure: false, // true on deployment for https
  signed: true
};

const route = '/api/users';
const wrap = fn => (...args) => fn(...args).catch(args[2]);

module.exports = function (app) {
  app.post(route, wrap(async function (req, res, next) { // login
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });

    const token = await auth.makeToken(req, user);

    if (token) {
      return res.status(200).cookie('token', token, cookieOptions).send('Login successful.');
    }

    res.status(401).send('Incorrect username or password.');
  }));

  app.post(route + '/register', wrap(async function (req, res, next) { // register user
    const password = await auth.hashPass(req);

    await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: password
    });

    res.status(200).send('Account creation successful!');
  }));

  app.get(route + '/logout', wrap(async function (req, res, next) { // logout
    res.status(200).clearCookie('token').send('Logout successful.');
  }));

  app.put(route, wrap(async function (req, res, next) { // edit user
    await db.User.update({
      // req.body
    },
      {
        where: {
          id: req.UserId
        }
      });

    res.status(200).send('Profile updated.')
  }));

  app.get(route + '/profile', wrap(async function (req, res, next) { // user profile
    const user = await db.User.findOne({
      where: { // get info of the communities the user belongs to
        id: req.UserId
      },
      include: [{
        model: db.Community,
        as: 'communities'
      }]
    });

    res.status(200).json(user.communities);
  }));

  app.delete(route, wrap(async function (req, res, next) { // delete user
    await db.User.destroy({
      where: {
        id: req.UserId
      }
    });

    res.status(200).send('Account successfully deleted.')
  }));
};
