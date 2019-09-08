const db = require('../models');
const { getCommunity } = require('./auth/validate');

const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function(app) {
  // COMMUNITY USERS

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

  app.delete('/api/communities/:CommunityId/invited', wrap(async function (req, res, next) { // decline invitation
    const { community, user } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (await community.hasInvited(user)) {
      throw { status: 400, msg: 'You haven\'t been invited to that community.' };
    }

    community.removeInvited(user);
    user.removeInvite(community);

    res.status(200).json(community);
  }));

  app.get('/api/communities/:CommunityId/users', wrap(async function (req, res, next) { // get community users
    const { community, isMember } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    community.dataValues.members = await community.getMembers();

    res.status(200).json(community);
  }));

  app.post('/api/communities/:CommunityId/users', wrap(async function (req, res, next) { // join community
    const { community, user, isMember } = await getCommunity(req.token.UserId, req.params.CommunityId);

    if (isMember) {
      throw { status: 400, msg: 'You\'re already in that community.' };
    }

    if (community.private && await community.hasInvited(user)) {
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
};
