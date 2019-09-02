const db = require('../models');
const { getCommunity } = require('./auth/validate');
const wrap = fn => (...args) => fn(...args).catch(args[2]);

module.exports = function(app) {
  app.get('/api/events/', wrap( async function(req, res, next) {
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
}

