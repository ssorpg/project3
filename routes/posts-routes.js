var db = require("../models");

module.exports = function(app) {
  const route = '/api/posts/';

  app.get(route, function(req, res) {   // get all posts of type implied by provided queryID(s)
    const commID = req.query.commID;    // all posts have commID, but if only has commID it's a feed post,
    const userID = req.query.userID;    // if has userID it's a wall post,
    const eventID = req.query.eventID;  // else if has eventID it's an event post
  });

  app.post(route, function(req, res) { // make post of type implied by provided queryID(s)
    const commID = req.query.commID;
    const userID = req.query.userID;
    const eventID = req.query.eventID;
  });

  app.delete(route + '/:postID', function(req, res) {

  });

  app.put(route + '/:postID', function(req, res) { // edit post

  });

  app.get(route + '/:postID/comments', function(req, res) { // get comments on post

  });

  app.post(route + '/:postID/comments', function(req, res) { // make comment on post

  });

  app.delete(route + '/:postID/comments/:commeID', function(req, res) {

  });

  app.put(route + '/:postID/comments/:commeID', function(req, res) { // edit comment

});
};
