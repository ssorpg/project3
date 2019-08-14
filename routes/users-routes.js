var db = require("../models");

module.exports = function(app) {
  const route = '/api/users/';

  app.post(route, function(req, res) { // login

  });

  app.post(route + '/register', function(req, res) { // register user

  });

  app.get(route + '/:userID', function(req, res) { // logout

  });

  app.put(route + '/:userID', function(req, res) { // edit user

  });

  app.delete(route + '/:userID', function(req, res) { // delete user

  });

  app.get(route + '/:userID', function(req, res) { // user dashboard

  });
};
