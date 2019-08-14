const db = require("../models");
const bcrypt = require('bcrypt');

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
      res.status(200).send('Logged in!');
    }
    else {
      res.status(400).send('Password incorrect.');
    }
  }));

  app.post(route + '/register', wrap(async function (req, res, next) { // register user
    const bcryptedPassword = await bcrypt.hash(req.body.password, 10)

    await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcryptedPassword,
      token: 'not implemented'
    });

    res.status(200).send('Created account successfully!');
  }));

  app.get(route + '/:userID', wrap(async function (req, res, next) { // logout

  }));

  app.put(route + '/:userID', wrap(async function (req, res, next) { // edit user

  }));

  app.delete(route + '/:userID', wrap(async function (req, res, next) { // delete user

  }));

  app.get(route + '/:userID', wrap(async function (req, res, next) { // user dashboard

  }));
};
