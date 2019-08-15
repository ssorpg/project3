const db = require("../models");

const route = '/api/posts';
const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function (app) { // route looks like: /api/posts?commID=2&userID=4
  app.get(route, wrap(async function (req, res, next) {   // get all posts of type implied by provided queryID(s)
    const commID = req.query.commID;    // all posts have commID, but if only has commID it's a feed post,
    const userID = req.query.userID;    // if has userID it's a wall post,
    const eventID = req.query.eventID;  // else if has eventID it's an event post

    if (req.userID === parseInt(userID)) {
      const communities = await db.CommunityUsers.findAll({
        where: { // get info of the communities the user belongs to
          userId: userID
        },
        include: [{
          model: Community
        }]
      });
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.post(route, wrap(async function (req, res, next) { // make post of type implied by provided queryID(s)
    const commID = req.query.commID;
    const userID = req.query.userID;
    const eventID = req.query.eventID;

    if (req.tokenData.userID === parseInt(req.params.userID)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.delete(route + '/:postID', wrap(async function (req, res, next) {
    if (req.tokenData.userID === parseInt(req.params.userID)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.put(route + '/:postID', wrap(async function (req, res, next) { // edit post
    if (req.tokenData.userID === parseInt(req.params.userID)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.get(route + '/:postID/comments', wrap(async function (req, res, next) { // get comments on post
    if (req.tokenData.userID === parseInt(req.params.userID)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.post(route + '/:postID/comments', wrap(async function (req, res, next) { // make comment on post
    if (req.tokenData.userID === parseInt(req.params.userID)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.delete(route + '/:postID/comments/:commeID', wrap(async function (req, res, next) {
    if (req.tokenData.userID === parseInt(req.params.userID)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.put(route + '/:postID/comments/:commeID', wrap(async function (req, res, next) { // edit comment
    if (req.tokenData.userID === parseInt(req.params.userID)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));
};
