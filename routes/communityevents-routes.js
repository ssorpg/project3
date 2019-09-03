const db = require('../models');
const { getCommunity } = require('./auth/validate');

const wrap = fn => (...args) => fn(...args).catch(args[2]);

module.exports = function (app) {
  // COMMUNITY EVENTS

  app.post('/api/events', wrap(async function (req, res, next) { // create event
    console.log('gettin events')
    const events = await db.Event.findAll();

    if(events.length === 0) {
      console.log('no results');
      res.status(204).send('No Events Here.\nMake One!');
    } else {
      res.status(200).json(events);
    }
  }));
  
  app.post('/api/events/create', wrap( async function(req, res, next) {
    const newEvent = await db.Event.create({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      CommunityId: req.body.communityId,
      founderId: req.token.UserId,
    });
    
    res.status(200).json(newEvent);
  }));

  app.get('/api/events/:EventId', wrap(async function (req, res, next) { // get specific event
    const { community, isMember } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    const [event] = await community.getEvents({
      where: {
        id: req.params.EventId
      }
    });

    if (!event) {
      throw { status: 404, msg: 'That event doesn\'t exist.' };
    }

    event.dataValues.posts = await event.getPosts({ limit: 20 });

    res.status(200).json(event);
  }));

  app.delete('/api/communities/:EventId', wrap(async function (req, res, next) { // delete event
    const event = await db.Event.findOne({
      where: {
        id: req.params.EventId
      }
    });

    if (!event) {
      throw { status: 404, msg: 'That event doesn\'t exist.' };
    }

    if (req.token.UserId !== event.founderId) {
      throw { status: 401, msg: 'You don\'t own that event.' };
    }

    await event.destroy();

    res.status(200).send('Event deleted.');
  }));

  // app.put('/api/communities/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // edit event
  //   const { community, isMember } = await getCommunity(req.token.UserId, req.params.CommunityId);

  //   if (!isMember) {
  //     throw { status: 401, msg: 'You\'re not in that community.' };
  //   }

  //   const event = await community.getEvents({
  //     where: {
  //       id: req.params.EventId
  //     }
  //   });

  //   if (!event) {
  //     throw { status: 404, msg: 'That event doesn\'t exist.' };
  //   }

  //   if (req.token.UserId !== event.founderId) {
  //     throw { status: 401, msg: 'You don\'t own that event.' };
  //   }

  //   const upEvent = await event.update({

  //     // update some stuff

  //   });

  //   res.status(200).json(upEvent);
  // }));
};
