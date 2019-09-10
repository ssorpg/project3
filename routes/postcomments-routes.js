const db = require('../models');
const { getCommunity, getPost, getComment } = require('./utils/validate');
const wrap = require('./utils/errorhandler');

module.exports = function(app) {
  // POST COMMENTS

  app.post('/api/posts/:PostId/comments', wrap(async function (req, res, next) { // make comment on post
    const { post } = await getPost(req.token.UserId, req.params.PostId);
    const { user, isMember } = await getCommunity(req.token.UserId, post.CommunityId);

    if (!isMember) {
      throw { status: 401, msg: 'You\'re not in that community.' };
    }

    const newComment = await db.Comment.create({ message: req.body.message });
    newComment.setAuthor(user);
    newComment.dataValues.author = user;
    post.addComment(newComment);

    res.status(200).json(newComment);
  }));

  app.delete('/api/posts/:PostId/comments/:CommentId', wrap(async function (req, res, next) { // delete comment
    const { comment, isAuthor } = await getComment(req.token.UserId, req.params.CommentId);

    if (!isAuthor) {
      throw { status: 401, msg: 'You didn\'t make that comment.' };
    }

    const delComment = await comment.destroy();

    res.status(200).json(delComment);
  }));

  // app.put('/api/posts/:PostId/comments/:CommentId', wrap(async function (req, res, next) { // edit comment
  //   const { comment, isAuthor } = await getComment(req.token.UserId, req.params.CommentId);

  //   if (!isAuthor) {
  //     throw { status: 401, msg: 'You didn\'t make that comment.' };
  //   }

  //   const { post } = await getPost(req.token.UserId, req.params.PostId);
  //   const { isMember } = await getCommunity(req.token.UserId, post.CommunityId);

  //   if (!isMember) {
  //     throw { status: 401, msg: 'You\'re not in that community.' };
  //   }

  //   const upComment = await comment.update({ message: req.body.message });

  //   res.status(200).json(upComment);
  // }));
};
