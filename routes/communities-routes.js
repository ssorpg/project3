const db = require("../models");

const route = '/api/communities';
const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function (app) {
  app.post(route, wrap(async function (req, res, next) { // create community
    const newCommunity = await db.Community.create({
      name: req.body.name,
      FounderId: req.UserId
    });

    const user = await db.User.findOne({
      where: {
        id: req.UserId
      }
    });

    await newCommunity.addUser(user);

    res.status(200).send('Community successfully created!');
  }));

  app.get(route, wrap(async function (req, res, next) { // get all communities?
    const communities = await db.Community.findAll();

    res.status(200).json(communities);
  }));

  app.get(route + '/:CommunityId', wrap(async function (req, res, next) { // get community info
    const community = await db.Community.findOne({
      where: {
        id: req.params.CommunityId
      }
    });

    res.status(200).json(community);
  }));

  app.delete(route + '/:CommunityId', wrap(async function (req, res, next) { // delete community
    const community = await db.Community.destroy({
      where: {
        id: req.params.CommunityId,
        FounderId: req.UserId
      }
    });

    if (community) {
      return res.status(200).send('Community deleted.');
    }

    res.status(400).send('That community doesn\'t exist.');
  }));

  app.post(route + '/:CommunityId/users', wrap(async function (req, res, next) { // join community
    const community = await db.Community.findOne({
      where: {
        id: req.params.CommunityId
      }
    });

    const user = await db.User.findOne({
      where: {
        id: req.UserId
      }
    });

    if (!community) {
      return res.status(400).send('That community doesn\'t exist.');
    }
    if (community.hasUser(user)) {
      return res.status(400).send('You\'re already in that community.');
    }

    await community.addUser(user);

    res.status(200).send('You joined the community!');
  }));

  app.delete(route + '/:CommunityId/users', wrap(async function (req, res, next) { // leave community
    const community = await db.Community.findOne({
      where: {
        id: req.params.CommunityId
      }
    });

    const user = await db.User.findOne({
      where: {
        id: req.UserId
      }
    });

    if (!community) {
      return res.status(400).send('That community doesn\'t exist.');
    }
    if (!community.hasUser(user)) {
      return res.status(400).send('You\'re not in that community.');
    }

    await community.removeUser(user);

    res.status(200).send('You left the community.');
  }));

  app.get(route + '/:CommunityId/events', wrap(async function (req, res, next) { // community events

  }));

  app.post(route + '/:CommunityId/events', wrap(async function (req, res, next) { // create event

  }));

  app.get(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // create event

  }));

  app.delete(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // delete event

  }));

  app.put(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // edit event

  }));
};
