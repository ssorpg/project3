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

    res.status(200).send('Community successfully created!');
  }));

  app.get(route, wrap(async function (req, res, next) { // get all communities?
    const communities = await db.Community.findAll();

    res.status(200).json(communities);
  }));

  app.get(route + '/:commID', wrap(async function (req, res, next) { // get community info
    const community = await db.Community.findAll({
      where: {
        id: req.params.commID
      }
    });

    res.status(200).json(community);
  }));

  app.delete(route + '/:commID', wrap(async function (req, res, next) { // delete community
    const community = await db.Community.destroy({
      where: {
        id: req.params.commID,
        founderId: req.userID
      }
    });

    if (community) {
      return res.status(200).send('Community deleted.');
    }

    res.status(400).send('That community doesn\'t exist.');
  }));

  app.post(route + '/:commID/users', wrap(async function (req, res, next) { // join community
    const isCommunity = await db.Community.findOne({
      where: {
        id: req.params.commID
      }
    });

    if (!isCommunity) {
      return res.status(400).send('That community doesn\'t exist.');
    }

    const inCommunity = await db.CommunityUser.findOne({
      where: {
        userId: req.userID,
        commId: req.params.commID
      }
    });

    if (inCommunity) {
      return res.status(400).send('You\'re already in that community.');
    }

    await db.CommunityUser.create({
      userId: req.userID,
      commId: req.params.commID
    });

    res.status(200).send('You joined the community!');
  }));

  app.delete(route + '/:commID/users', wrap(async function (req, res, next) { // leave community
    await db.CommunityUser.destroy({
      where: {
        userId: req.userID,
        commId: req.params.commID
      }
    });

    res.status(200).send('You left the community.');
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
