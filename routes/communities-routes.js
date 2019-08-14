const db = require("../models");

module.exports = function(app) {
    const route = '/auth/api/communities';
    const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

  app.post(route, wrap(async function (req, res, next) { // register community
    
  }));

  app.post(route, wrap(async function (req, res, next) { // get all communities?

  }));

  app.get(route + '/:commID', wrap(async function (req, res, next) { // get community info

  }));

  app.delete(route + '/:commID', wrap(async function (req, res, next) { // delete community

  }));

  app.post(route + ':commID/users/:userID', wrap(async function (req, res, next) { // join community

  }));

  app.delete(route + '/:commID/users/:userID', wrap(async function (req, res, next) { // leave community

  }));

  app.get(route + '/:commID/events', wrap(async function (req, res, next) { // community events

  }));

  app.post(route + '/:commID/events', wrap(async function (req, res, next) { // create event

  }));

  app.get(route + '/:commID/events/:eventID', wrap(async function (req, res, next) { // create event

  }));

  app.delete(route + '/:commID/events/:eventID', wrap(async function (req, res, next) { // delete event

  }));

  app.put(route + '/:commID/events/:eventID', wrap(async function (req, res, next) { // edit event

  }));
};
