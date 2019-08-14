const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv');

module.exports = function (app) {
  const route = '/api/users';
  const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

  app.post(route, wrap(async function (req, res, next) { // login
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      }
    });

    const doesMatch = await bcrypt.compare(req.body.password, user.password)

    if (doesMatch) {
      const token = jwt.sign({ email: req.body.email }, process.env.JWT_KEY, { expiresIn: 43200 });
      res.status(200).send(token);
    }
    else {
      res.status(401).send('Password incorrect.');
    }
  }));

  app.post(route + '/register', wrap(async function (req, res, next) { // register user
    const bcryptedPassword = await bcrypt.hash(req.body.password, 10)

    await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcryptedPassword
    });

    res.status(200).send('Created account successfully!');
  }));

  app.get(route + '/:userID', wrap(async function (req, res, next) { // logout
    const token = req.query.token;
    const verified = await jwt.verify(token, process.env.JWT_KEY);

    if(verified) {
      res.status(200).send('delToken'); // remove token from client
    }
    else {
      res.status(401);
    }
  }));

  app.put(route + '/:userID', wrap(async function (req, res, next) { // edit user

  }));

  app.delete(route + '/:userID', wrap(async function (req, res, next) { // delete user

  }));

  app.get(route + '/:userID', wrap(async function (req, res, next) { // user dashboard

  }));
};
