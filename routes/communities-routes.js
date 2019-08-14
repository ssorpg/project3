const db = require("../models");

module.exports = function(app) {
    const route = '/api/communities';

  app.post(route, function(req, res) { // register community
    
  });

  app.post(route, function(req, res) { // get all communities?

  });

  app.get(route + '/:commID', function(req, res) { // get community info

  });

  app.delete(route + '/:commID', function(req, res) { // delete community

  });

  app.post(route + ':commID/users/:userID', function(req, res) { // join community

  });

  app.delete(route + '/:commID/users/:userID', function(req, res) { // leave community

  });

  app.get(route + '/:commID/events', function(req, res) { // community events

  });

  app.post(route + '/:commID/events', function(req, res) { // create event

  });

  app.get(route + '/:commID/events/:eventID', function(req, res) { // create event

  });

  app.delete(route + '/:commID/events/:eventID', function(req, res) { // delete event

  });

  app.put(route + '/:commID/events/:eventID', function(req, res) { // edit event

  });
};
