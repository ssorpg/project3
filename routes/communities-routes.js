const db = require("../models");

const jwtMiddleware = require('express-jwt');
const jwtCheck = jwtMiddleware({
  secret: process.env.JWT_SECRET,
  getToken: function (req) {
    return req.signedCookies.token;
  }
});

const route = '/api/communities';
const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function(app) {
  //hi jon don't be mad i'm just putting this somewhere to test it
  app.get('/chat', (req, res) => {
    res.render('index.ejs');
    //res.send('Hello world!');
  });

  app.post(route, jwtCheck, wrap(async function (req, res, next) { // register community
    
  }));

  app.post(route, jwtCheck, wrap(async function (req, res, next) { // get all communities?

  }));

  app.get(route + '/:commID', jwtCheck, wrap(async function (req, res, next) { // get community info

  }));

  app.delete(route + '/:commID', jwtCheck, wrap(async function (req, res, next) { // delete community

  }));

  app.post(route + ':commID/users/:userID', jwtCheck, wrap(async function (req, res, next) { // join community

  }));

  app.delete(route + '/:commID/users/:userID', jwtCheck, wrap(async function (req, res, next) { // leave community

  }));

  app.get(route + '/:commID/events', jwtCheck, wrap(async function (req, res, next) { // community events

  }));

  app.post(route + '/:commID/events', jwtCheck, wrap(async function (req, res, next) { // create event

  }));

  app.get(route + '/:commID/events/:eventID', jwtCheck, wrap(async function (req, res, next) { // create event

  }));

  app.delete(route + '/:commID/events/:eventID', jwtCheck, wrap(async function (req, res, next) { // delete event

  }));

  app.put(route + '/:commID/events/:eventID', jwtCheck, wrap(async function (req, res, next) { // edit event

  }));
};
