const db = require('../models');
const { getCommunity, getPost } = require('./utils/validate');

const wrap = fn => (...args) => fn(...args).catch(args[2]);

module.exports = function (app) {
  // POSTS

  app.post('/api/posts', wrap(async function (req, res, next) { // make post of type implied by provided queryID(s) - for example: /api/posts?CommunityId=1&UserId=1
    const CommunityId = parseInt(req.query.CommunityId);
    const UserId = parseInt(req.query.UserId);
    const EventId = parseInt(req.query.EventId);

    const { community, user, isMember } = await getCommunity(req.token.UserId, CommunityId);

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    let newPost;
    const makeNewPost = async req => {
      newPost = await db.Post.create({
        title: req.body.title,
        message: req.body.message
      });

      newPost.setAuthor(user);
      newPost.dataValues.author = user;
      return newPost;
    };

    if (EventId) {
      const [event] = await community.getEvents({
        where: {
          id: EventId
        }
      });

      if (!event) {
        throw { status: 404, msg: 'That event doesn\'t exist.' };
      }

      newPost = await makeNewPost(req);
      community.addPost(newPost);
      event.addPost(newPost);
    }
    else if (UserId) {
      if (req.token.UserId === UserId) {
        throw { status: 400, msg: 'You can\'t post on your own wall.' }; // for now
      }

      const [getUser] = await community.getMembers({
        where: {
          id: UserId
        }
      });

      if (!getUser) {
        throw { status: 401, msg: 'You aren\'t in a community with that user.' };
      }

      newPost = await makeNewPost(req);
      community.addPost(newPost);
      getUser.addPost(newPost);
    }
    else {
      newPost = await makeNewPost(req);
      community.addPost(newPost);
    }

    res.status(200).json(newPost);
  }));

  app.get('/api/posts', wrap(async function (req, res, next) { // get more posts
    const CommunityId = parseInt(req.query.CommunityId);
    const UserId = parseInt(req.query.UserId);
    const EventId = parseInt(req.query.EventId);
    const startAt = parseInt(req.query.startAt);

    let resPosts;

    if (UserId === req.token.UserId) { // TODO make this 'if' a new route
      const user = await db.User.findOne({
        where: {
          id: req.token.UserId
        },
        include: [{
          model: db.Post,
          as: 'posts',
          limit: 20,
          where: {
            id: {
              [db.op.lt]: startAt
            }
          },
          required: false
        }]
      });

      resPosts = user.dataValues.posts;
      
      return res.status(200).json(resPosts);
    }

    const { community, isMember } = await getCommunity(req.token.UserId, CommunityId);

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    if (EventId) {
      const [event] = await community.getEvents({
        where: {
          id: EventId
        }
      });

      if (!event) {
        throw { status: 404, msg: 'That event doesn\'t exist.' };
      }

      resPosts = await event.getPosts({
        limit: 20,
        where: {
          id: {
            [db.op.lt]: startAt
          }
        },
      });
    }
    else if (UserId) {
      const [getUser] = await community.getMembers({
        where: {
          id: UserId
        }
      });

      if (!getUser) {
        throw { status: 401, msg: 'You aren\'t in a community with that user.' };
      }

      resPosts = await getUser.getPosts({
        limit: 20,
        where: {
          id: {
            [db.op.lt]: startAt
          },
          CommunityId: community.id
        },
      });
    }
    else {
      resPosts = await community.getPosts({
        limit: 20,
        where: {
          id: {
            [db.op.lt]: startAt
          }
        },
      });
    }

    res.status(200).json(resPosts);
  }));

  app.delete('/api/posts/:PostId', wrap(async function (req, res, next) { // delete post
    const { post, isAuthor } = await getPost(req.token.UserId, req.params.PostId);

    if (!isAuthor) {
      throw { status: 401, msg: 'You didn\'t make that post.' };
    }

    const delPost = await post.destroy();

    res.status(200).json(delPost);
  }));

  // app.put('/api/posts/:PostId', wrap(async function (req, res, next) { // edit post
  //   const { post, isAuthor } = await getPost(req.token.UserId, req.params.PostId);
  //   const { isMember } = await getCommunity(req.token.UserId, post.CommunityId);

  //   if (!isMember) {
  //     throw { status: 401, msg: 'You\'re not in that community.' }; // can't edit posts to send messages to communities you're no longer in
  //   }

  //   if (!isAuthor) {
  //     throw { status: 401, msg: 'You didn\'t make that post.' };
  //   }

  //   const upPost = await post.update({ message: req.body.message });

  //   res.status(200).json(upPost);
  // }));

  app.put('/api/posts/:PostId/:vote', wrap(async function (req, res, next) { // like/dislike post
    const { post } = await getPost(req.token.UserId, req.params.PostId);
    const { user, isMember } = await getCommunity(req.token.UserId, post.CommunityId);

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    if (await post.hasVoter(user)) {
      throw { status: 400, msg: 'You\'ve already voted on that post.' };
    }

    switch (req.params.vote) {
      case 'like':
        post.score += 1;
        break;
      case 'dislike':
        post.score -= 1;
        break;
      default:
        throw { status: 400, msg: 'Invalid vote type.' };
    }

    const upPost = await post.update({ score: post.score });
    post.addVoter(user);

    res.status(200).json(upPost);
  }));
};
