const db = require("../models");
const auth = require('./auth/auth');

require('dotenv').config();

const jwtMiddleware = require('express-jwt');
const jwtCheck = jwtMiddleware({
  secret: process.env.JWT_SECRET,
  getToken: function (req) {
    return req.signedCookies.token;
  }
});

const cookieOptions = {
  expires: new Date(Date.now() + 43200000),
  httpOnly: true,
  // secure: true, on deployment for https
  signed: true
};

const route = '/api/users';
const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function (app) {
  app.post(route, wrap(async function (req, res, next) { // login
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });

    const token = await auth.makeToken(req, user);

    if (token) {
      console.log(token);
      res.status(200).cookie('token', token, cookieOptions).send({
        message: 'Login successful.',
        userId: user.id
      });
    }
    else {
      res.status(401).send('Incorrect username or password.');
    }
  }));

  app.post(route + '/register', wrap(async function (req, res, next) { // register user
    const password = await auth.hashPass(req);

    let results = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: password
    });
    
    console.log(results);
    res.status(200).send({
      messate: 'Account creation successful!',
      response: results
    });
  }));

  app.get(route + '/:userID', jwtCheck, wrap(async function (req, res, next) { // logout
    console.log(req.user);

    if (req.user.userID === parseInt(req.params.userID)) {
      res.status(200).clearCookie('token').send('Logout successful.');
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.put(route + '/:userID', jwtCheck, wrap(async function (req, res, next) { // edit user
    if (req.tokenData.userID === parseInt(req.params.userID)) {
      await db.User.update({
        // some stuff
      },
        {
          where: {
            id: req.params.userID
          }
        });

      res.status(200).send('Update successful.')
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.delete(route + '/:userID', jwtCheck, wrap(async function (req, res, next) { // delete user
    if (req.tokenData.userID === parseInt(req.params.userID)) {
      await db.User.destroy({ where: { id: req.params.userID } });
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.get(route + '/:userID', jwtCheck, wrap(async function (req, res, next) { // user dashboard
    if (req.tokenData.userID === parseInt(req.params.userID)) {
      // await db.CommunityUsers.findAll({
      //   where: {
      //     userId: req.params.userID
      //   }
      // },
      // include: [{

      // }]);
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));
};
