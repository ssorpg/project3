const db = require("../models");

const route = '/api/posts';
const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function (app) { // route looks like: /api/posts?CommunityId=2&UserId=4
  app.get(route, wrap(async function (req, res, next) {   // get all posts of type implied by provided queryID(s)
    const CommunityId = req.query.CommunityId;    // all posts have CommunityId, but if only has CommunityId it's a feed post,
    const UserId = req.query.UserId;    // if has UserId it's a wall post,
    const EventId = req.query.EventId;  // else if has EventId it's an event post

    if (req.UserId === parseInt(UserId)) {
      const communities = await db.CommunityUsers.findAll({
        where: { // get info of the communities the user belongs to
          UserId: UserId
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
    const CommunityId = req.query.CommunityId;
    const UserId = req.query.UserId;
    const EventId = req.query.EventId;

    if (req.tokenData.UserId === parseInt(req.params.UserId)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.delete(route + '/:PostId', wrap(async function (req, res, next) {
    if (req.tokenData.UserId === parseInt(req.params.UserId)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.put(route + '/:PostId', wrap(async function (req, res, next) { // edit post
    if (req.tokenData.UserId === parseInt(req.params.UserId)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.get(route + '/:PostId/comments', wrap(async function (req, res, next) { // get comments on post
    if (req.tokenData.UserId === parseInt(req.params.UserId)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.post(route + '/:PostId/comments', wrap(async function (req, res, next) { // make comment on post
    if (req.tokenData.UserId === parseInt(req.params.UserId)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.delete(route + '/:PostId/comments/:CommentId', wrap(async function (req, res, next) {
    if (req.tokenData.UserId === parseInt(req.params.UserId)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));

  app.put(route + '/:PostId/comments/:CommentId', wrap(async function (req, res, next) { // edit comment
    if (req.tokenData.UserId === parseInt(req.params.UserId)) {
      // do stuff
    }
    else {
      res.status(401).send('Forbidden');
    }
  }));
};
