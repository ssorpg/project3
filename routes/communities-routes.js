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
      bio: req.body.bio,
      private: req.body.private
    });

    await newCommunity.addMember(user);
    newCommunity.setFounder(user);
    newCommunity.dataValues.founder = user;

    res.status(200).json(newCommunity);
  }));

  app.get('/api/communities', wrap(async function (req, res, next) { // get all public communities
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
};
