const db = require("../models");

module.exports = function (app) {
  const route = '/api/posts';
  const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

  app.get(route, wrap(async function (req, res, next) {   // get all posts of type implied by provided queryID(s)
    const commID = req.query.commID;    // all posts have commID, but if only has commID it's a feed post,
    const userID = req.query.userID;    // if has userID it's a wall post,
    const eventID = req.query.eventID;  // else if has eventID it's an event post
  }));

  app.post(route, wrap(async function (req, res, next) { // make post of type implied by provided queryID(s)
    const commID = req.query.commID;
    const userID = req.query.userID;
    const eventID = req.query.eventID;
  }));

  app.delete(route + '/:postID', wrap(async function (req, res, next) {

  }));

  app.put(route + '/:postID', wrap(async function (req, res, next) { // edit post

  }));

  app.get(route + '/:postID/comments', wrap(async function (req, res, next) { // get comments on post

  }));

  app.post(route + '/:postID/comments', wrap(async function (req, res, next) { // make comment on post

  }));

  app.delete(route + '/:postID/comments/:commeID', wrap(async function (req, res, next) {

  }));

  app.put(route + '/:postID/comments/:commeID', wrap(async function (req, res, next) { // edit comment

  }));
};
