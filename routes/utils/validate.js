const db = require('../../models');

module.exports = {
  getCommunity: async (UserId, CommunityId) => {
    const community = await db.Community.findOne({
      where: {
        id: CommunityId
      }
    });
    
    if (!community) {
      throw { status: 404, msg: 'That community doesn\'t exist.' };
    }

    const user = await db.User.findOne({
      where: {
        id: UserId
      }
    });
    
    return {
      community: community,
      user: user,
      isFounder: UserId === community.founderId ? true : false,
      isMember: await community.hasMember(user)
    };
  },

  getEvent: async (UserId, EventId) => {
    const event = await db.Event.findOne({
      where: {
        id: EventId
      }
    });

    if (!event) {
      throw { status: 404, msg: 'That event doesn\'t exist.' };
    }

    return {
      event: event,
      isFounder: UserId === event.founderId ? true : false
    };
  },

  getPost: async (UserId, PostId) => {
    const post = await db.Post.findOne({
      where: {
        id: PostId
      }
    });

    if (!post) {
      throw { status: 404, msg: 'That post doesn\'t exist.' };
    }

    return {
      post: post,
      isAuthor: UserId === post.authorId ? true : false
    };
  },

  getComment: async (UserId, CommentId) => {
    const comment = await db.Comment.findOne({
      where: {
        id: CommentId
      }
    });

    if (!comment) {
      throw { status: 404, msg: 'That comment doesn\'t exist.' };
    }

    return {
      comment: comment,
      isAuthor: UserId === comment.authorId ? true : false
    };
  }
};
