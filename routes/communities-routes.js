const db = require("../models");

const route = '/api/communities';
const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function (app) {
  app.post(route, wrap(async function (req, res, next) { // create community
    const newCommunity = await db.Community.create({
      name: req.body.name,
      founderId: req.userID
    });

    await db.CommunityUser.create({
      userId: req.userID,
      commId: newCommunity.id
    });

    res.status(200).send();
  }));

  app.post(route, wrap(async function (req, res, next) { // get all communities?

  }));

  app.get(route + '/:commID', wrap(async function (req, res, next) { // get community info

  }));

  app.delete(route + '/:commID', wrap(async function (req, res, next) { // delete community

  }));

  app.post(route + '/:commID/users/:userID', wrap(async function (req, res, next) { // join community
    if (req.userID === parseInt(req.params.userID)) {
      const communities = await db.CommunityUser.findAll({
        where: { // get info of the communities the user belongs to
          userId: req.params.userID
        }
      });

      const inCommunity = communities.filter(community => { return community.dataValues.commId === parseInt(req.params.commID) })

      if (inCommunity.length) {
        res.status(400).send('You\'re already in that community.');
      }
      else {
        await db.CommunityUser.create({
          userId: req.params.userID,
          commId: req.params.commID
        });

        res.status(200).send('You joined the community!');
      }
    }
    else {
      res.status(401).send('Forbidden');
    }
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
