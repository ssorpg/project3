const db = require('../models');
const { getCommunity, getEvent } = require('./auth/validate');

const wrap = fn => (...args) => fn(...args).catch(args[2]);

module.exports = function (app) {
  // COMMUNITY EVENTS

  app.post('/api/events/create', wrap(async function (req, res, next) { // make event
    const { community, user, isMember } = await getCommunity(req.token.UserId, req.body.CommunityId);

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    const newEvent = await db.Event.create({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      start_time: req.body.start_time,
      end_time: req.body.end_time
    });

    await community.addEvent(newEvent);
    newEvent.dataValues.CommunityId = community.id;
    newEvent.addMember(user);
    newEvent.setFounder(user);

    res.status(200).json(newEvent);
  }));

  app.post('/api/events/:EventId/users', wrap(async function (req, res, next) { // join event
    const { event } = await getEvent(req.token.UserId, req.params.EventId);
    const { user, isMember } = await getCommunity(req.token.UserId, event.CommunityId);

    if (await event.hasMember(user)) {
      throw { status: 400, msg: 'You already joined that event.' };
    }

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    await event.addMember(user);

    res.status(200).json(event);
  }));

  app.delete('/api/events/:EventId/users', wrap(async function (req, res, next) { // leave event
    const { event } = await getEvent(req.token.UserId, req.params.EventId);
    const { user, isMember } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (!await event.hasMember(user)) {
      throw { status: 400, msg: 'You haven\'t joined that event.' };
    }

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    await event.removeMember(user);

    res.status(200).json(event);
  }));

  app.get('/api/events/:EventId', wrap(async function (req, res, next) { // get specific event
    const event = await db.Event.findOne({
      where: {
        id: req.params.EventId
      },
      include: [{
        model: db.User,
        through: 'EventUser',
        as: 'members'
      },
      {
        model: db.Post,
        as: 'posts',
        limit: 20
      }]
    });

    if (!event) {
      throw { status: 404, msg: 'That event doesn\'t exist.' };
    }

    const { isMember } = await getCommunity(req.token.UserId, event.CommunityId);

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    res.status(200).json(event);
  }));

  app.put('/api/events/:EventId', wrap(async function (req, res, next) { // edit event
    const { event, isFounder } = await getEvent(req.token.UserId, req.params.EventId);

    if (!isFounder) {
      throw { status: 401, msg: 'You don\'t own that event.' };
    }

    const { isMember } = await getCommunity(req.token.UserId, event.CommunityId);

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    const upEvent = await event.update({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      start_time: req.body.start_time,
      end_time: req.body.end_time
    });

    res.status(200).json(upEvent);
  }));

  app.delete('/api/events/:EventId', wrap(async function (req, res, next) { // delete event
    const { event, isFounder } = await getEvent(req.token.UserId, req.params.EventId);

    if (!isFounder) {
      throw { status: 401, msg: 'You don\'t own that event.' };
    }

    await event.destroy();

    res.status(200).send('Event deleted.');
  }));
};
