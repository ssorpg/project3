const db = require('../models');
const { getCommunity } = require('./auth/validate');

const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function (app) {
  // COMMUNITY

  app.post('/api/communities/create', wrap(async function (req, res, next) { // create community
    const user = await db.User.findOne({
      where: {
        id: req.token.UserId
      }
    });

    const newCommunity = await db.Community.create({
      name: req.body.name,
      private: req.body.private
    });

    await newCommunity.addMember(user);
    newCommunity.setFounder(user);
    newCommunity.dataValues.founder = user;

    res.status(200).json(newCommunity);
  }));

  app.get('/api/communities', wrap(async function (req, res, next) { // get all communities?
    const user = await db.User.findOne({
      where: {
        id: req.token.UserId
      },
      include: [{
        model: db.Community,
        as: 'communities'
      }]
    });

    const commIds = user.communities.map(comm => { return comm.id; });

    const communities = await db.Community.findAll({
      attributes: ['id', 'name'],
      where: {
        id: {
          [db.op.notIn]: commIds
        },
        private: false
      },
      limit: 20
    });

    res.status(200).json(communities);
  }));

  app.get('/api/communities/:CommunityId', wrap(async function (req, res, next) { // get community info
    const { community, isMember } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (!isMember) {
      return res.status(200).json(community);
    }

    community.dataValues.posts = await community.getPosts({
      limit: 20,
      where: {
        UserId: null,
        EventId: null
      }
    });

    res.status(200).json(community);
  }));

  app.delete('/api/communities/:CommunityId', wrap(async function (req, res, next) { // delete community
    const { community, isFounder } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (!isFounder) {
      throw { status: 401, msg: 'You don\'t own that community.' };
    }

    const delCommunity = await community.destroy();

    res.status(200).json(delCommunity);
  }));

  // COMMUNITY USERS

  app.get('/api/communities/:CommunityId/users', wrap(async function (req, res, next) { // get community users
    const { community, isMember } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    community.dataValues.members = await community.getMembers();

    res.status(200).json(community);
  }));

  app.post('/api/communities/:CommunityId/invited', wrap(async function (req, res, next) { // invite user to community
    const { community, isFounder } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (!isFounder) {
      throw { status: 401, msg: 'You don\'t own that community.' };
    }

    const getUser = await db.User.findOne({
      where: {
        email: req.body.email
      },
      attributes: ['id', 'email']
    });

    if (!getUser) {
      throw { status: 404, msg: 'That user doesn\'t exist.' };
    }

    if (await community.hasMember(getUser)) {
      throw { status: 400, msg: 'That user\'s already in that community.' };
    }

    if (await community.hasInvited(getUser)) {
      throw { status: 400, msg: 'That user\'s already been invited to that community.' };
    }

    community.addInvited(getUser);

    res.status(200).send(`You invited ${getUser.email} to the community!`);
  }));

  app.post('/api/communities/:CommunityId/users', wrap(async function (req, res, next) { // join community
    const { community, user, isMember, isInvited } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (isMember) {
      throw { status: 400, msg: 'You\'re already in that community.' };
    }

    if (!isInvited && community.private) {
      throw { status: 401, msg: 'You haven\'t been invited to that community.' };
    }

    await community.addMember(user);
    community.removeInvited(user);

    res.status(200).json(community);
  }));

  app.delete('/api/communities/:CommunityId/users', wrap(async function (req, res, next) { // leave community
    const { community, user, isMember, isFounder } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (isFounder) {
      throw { status: 400, msg: 'You can\'t leave a community you own!' };
    }

    if (!isMember) {
      throw { status: 400, msg: 'You\'re not in that community.' };
    }

    community.removeMember(user);
    user.removeCommunity(community);

    res.status(200).json(community);
  }));

  app.delete('/api/communities/:CommunityId/invited', wrap(async function (req, res, next) { // decline invitation
    const { community, user, isInvited } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (!isInvited) {
      throw { status: 400, msg: 'You haven\'t been invited to that community.' };
    }

    community.removeInvited(user);
    user.removeInvite(community);

    res.status(200).json(community);
  }));

  app.get('/api/communities/:CommunityId/users/:UserId/wall', wrap(async function (req, res, next) { // another user's wall
    if (req.token.UserId === parseInt(req.params.UserId)) {
      throw { status: 400, msg: 'That\'s you.' };
    }

    const { community, isMember } = await getCommunity(req.token.UserId, req.params.CommunityId);

    const [getUser] = await community.getMembers({
      where: {
        id: req.params.UserId
      },
      include: [{
        model: db.Post,
        as: 'posts',
        where: {
          CommunityId: community.id
        },
        required: false
      }]
    });

    if (!isMember || !getUser) {
      throw { status: 401, msg: 'You\'re not in a community with that user.' };
    }

    res.status(200).json(getUser);
  }));

  // COMMUNITY EVENTS

  // app.get('/api/communities/:CommunityId/events', wrap(async function (req, res, next) { // get community events
  //     const community = await db.Community.findOne({
  //         where: {
  //             id: req.params.CommunityId
  //         }
  //     });

  //     if (!community) {
  //         throw { status: 404, msg: 'That community doesn\'t exist.' };
  //     }

  //     const [user] = await community.getMembers({
  //         where: {
  //             id: req.token.UserId
  //         }
  //     });

  //     if (!user) {
  //         throw { status: 401, msg: 'You\'re not in that community.' };
  //     }

  //     community.dataValues.events = await community.getEvents();

  //     res.status(200).json(community);
  // }));

  // app.post('/api/communities/:CommunityId/events', wrap(async function (req, res, next) { // create event
  //     const community = await db.Community.findOne({
  //         where: {
  //             id: req.params.CommunityId
  //         }
  //     });

  //     if (!community) {
  //         throw { status: 404, msg: 'That community doesn\'t exist.' };
  //     }

  //     const [user] = await community.getMembers({
  //         where: {
  //             id: req.token.UserId
  //         }
  //     });

  //     if (!user) {
  //         throw { status: 401, msg: 'You\'re not in that community.' };
  //     }

  //     const newEvent = await db.Event.create({
  //         name: req.body.name,
  //         founderId: user.id,
  //         date: req.body.date
  //     });

  //     await newEvent.addMember(user);
  //     await newEvent.setFounder(user);
  //     await community.addEvent(newEvent);

  //     res.status(200).json(newEvent);
  // }));

  // app.get('/api/communities/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // get specific event
  //     const community = await db.Community.findOne({
  //         where: {
  //             id: req.params.CommunityId
  //         },
  //         include: [{
  //             model: db.User,
  //             as: 'founder'
  //         }]
  //     });

  //     if (!community) {
  //         throw { status: 404, msg: 'That community doesn\'t exist.' };
  //     }

  //     const [user] = await community.getMembers({
  //         where: {
  //             id: req.token.UserId
  //         }
  //     });

  //     if (!user) {
  //         throw { status: 401, msg: 'You\'re not in that community.' };
  //     }

  //     const [event] = await community.getEvents({
  //         where: {
  //             id: req.params.EventId
  //         }
  //     });

  //     if (!event) {
  //         throw { status: 404, msg: 'That event doesn\'t exist.' };
  //     }

  //     event.dataValues.eventPosts = await event.getPosts({
  //         limit: 20,
  //         include: [{
  //             model: db.User,
  //             as: 'author'
  //         }]
  //     });

  //     res.status(200).json(event);
  // }));

  // app.delete('/api/communities/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // delete event
  //     const event = await db.Event.findOne({
  //         where: {
  //             id: req.params.EventId
  //         }
  //     });

  //     if (!event) {
  //         throw { status: 404, msg: 'That event doesn\'t exist.' };
  //     }

  //     if (req.token.UserId !== event.founderId) {
  //         throw { status: 401, msg: 'You don\'t own that event.' };
  //     }

  //     await event.destroy();

  //     res.status(200).send('Event deleted.');
  // }));

  // app.put('/api/communities/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // edit event
  //     const event = await db.Event.findOne({
  //         where: {
  //             id: req.params.EventId
  //         }
  //     });

  //     if (!event) {
  //         throw { status: 404, msg: 'That event doesn\'t exist.' };
  //     }

  //     if (req.token.UserId !== event.founderId) {
  //         throw { status: 401, msg: 'You don\'t own that event.' };
  //     }

  //     const community = await db.Community.findOne({
  //         where: {
  //             id: req.params.CommunityId
  //         }
  //     });

  //     const [user] = await community.getMembers({
  //         where: {
  //             id: req.token.UserId
  //         }
  //     });

  //     if (!user) {
  //         throw { status: 401, msg: 'You\'re not in that community.' };
  //     }

  //     const upEvent = await event.update({

  //         // update some stuff

  //     });

  //     res.status(200).json(upEvent);
  // }));
};
