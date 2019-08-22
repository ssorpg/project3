const db = require('../models');

const route = '/api/posts';
const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function (app) {
    async function makeNewPost(req) {
        return await db.Post.create({
            title: req.body.title,
            authorId: req.token.UserId,
            message: req.body.message
        });
    }

    app.post(route, wrap(async function (req, res, next) { // make post of type implied by provided queryID(s) - for example: /api/posts?CommunityId=1&UserId=1
        const CommunityId = req.query.CommunityId;
        const UserId = req.query.UserId;
        const EventId = req.query.EventId;

        const community = await db.Community.findOne({
            where: {
                id: CommunityId
            }
        });

        if (!community) {
            throw { status: 404, msg: 'That community doesn\'t exist.' };
        }

        const [user] = await community.getMembers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' };
        }

        if (!CommunityId && !UserId && !EventId) {
            throw { status: 400 };
        }

        let newPost;

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

            await newPost.setAuthor(user);
            await community.addPost(newPost);
            await event.addPost(newPost);
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

            newPost = await makeNewPost(req);

            await newPost.setAuthor(user);
            await community.addPost(newPost);
            await getUser.addWallPost(newPost);
        }
        else {
            newPost = await makeNewPost(req);

            await newPost.setAuthor(user);
            await community.addPost(newPost);
        }

        newPost.dataValues.author = user;
        res.status(200).json(newPost);
    }));

    app.delete(route + '/:PostId', wrap(async function (req, res, next) { // delete post
        const post = await db.Post.findOne({
            where: {
                id: req.params.PostId
            }
        });

        if (!post) {
            throw { status: 404, msg: 'That post doesn\'t exist.' };
        }

        if (post.authorId !== req.token.UserId) {
            throw { status: 401, msg: 'You didn\'t make that post.' };
        }

        await post.destroy();

        res.status(200).send('Post deleted.');
    }));

    app.put(route + '/:PostId', wrap(async function (req, res, next) { // edit post
        const post = await db.Post.findOne({
            where: {
                id: req.params.PostId
            }
        });

        if (!post) {
            throw { status: 404, msg: 'That post doesn\'t exist.' };
        }

        if (post.authorId !== req.token.UserId) {
            throw { status: 401, msg: 'You didn\'t make that post.' };
        }

        const community = await db.Community.findOne({
            where: {
                id: post.CommunityId
            }
        });

        const [user] = await community.getMembers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' }; // can't edit posts to send messages to communities you're no longer in
        }

        const upPost = await post.update({
            message: req.body.message
        });

        res.status(200).json(upPost);
    }));

    app.put(route + '/:PostId/:vote', wrap(async function (req, res, next) { // like/dislike post
        const post = await db.Post.findOne({
            where: {
                id: req.params.PostId
            },
            include: [{
                model: db.User,
                through: 'PostVoter',
                as: 'voters',
                where: {
                    id: req.token.UserId
                },
                required: false
            }]
        });

        if (!post) {
            throw { status: 404, msg: 'That post doesn\'t exist.' };
        }

        const community = await db.Community.findOne({
            where: {
                id: post.CommunityId
            }
        });

        const [user] = await community.getMembers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' };
        }

        if (post.voters.length) {
            throw { status: 400, msg: 'You\'ve already voted on that post.' };
        }

        const newScore = post.score + parseInt(req.params.vote);

        await post.addVoter(user);
        await post.update({
            score: newScore
        });

        res.status(200).json(newScore);
    }));

    app.get(route + '/:PostId/comments', wrap(async function (req, res, next) { // get comments on post
        const post = await db.Post.findOne({
            where: {
                id: req.params.PostId
            }
        });

        if (!post) {
            throw { status: 404, msg: 'That post doesn\'t exist.' };
        }

        const community = await db.Community.findOne({
            where: {
                id: post.CommunityId
            }
        });

        const [user] = await community.getMembers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' };
        }

        post.dataValues.comments = await post.getComments({
            include: [{
                model: db.User,
                as: 'author'
            }]
        });

        res.status(200).json(post);
    }));

    app.post(route + '/:PostId/comments', wrap(async function (req, res, next) { // make comment on post
        const post = await db.Post.findOne({
            where: {
                id: req.params.PostId
            }
        });

        if (!post) {
            throw { status: 404, msg: 'That post doesn\'t exist.' };
        }

        const community = await db.Community.findOne({
            where: {
                id: post.CommunityId
            }
        });

        const [user] = await community.getMembers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' };
        }

        const newComment = await db.Comment.create({
            message: req.body.message,
            authorId: req.token.UserId
        });

        console.log(req.body.message);

        await newComment.setAuthor(user);
        await post.addComment(newComment);
        
        newComment.dataValues.author = user;
        res.status(200).json(newComment);
    }));

    app.delete(route + '/:PostId/comments/:CommentId', wrap(async function (req, res, next) { // delete comment
        const comment = await db.Comment.findOne({
            where: {
                id: req.params.CommentId
            }
        });

        if (!comment) {
            throw { status: 404, msg: 'That comment doesn\'t exist.' };
        }

        if (comment.authorId !== req.token.UserId) {
            throw { status: 401, msg: 'You didn\'t make that comment.' };
        }

        await comment.destroy();

        res.status(200).send('Comment deleted.');
    }));

    app.put(route + '/:PostId/comments/:CommentId', wrap(async function (req, res, next) { // edit comment
        const comment = await db.Comment.findOne({
            where: {
                id: req.params.CommentId
            }
        });

        if (!comment) {
            throw { status: 404, msg: 'That comment doesn\'t exist.' };
        }

        if (comment.authorId !== req.token.UserId) {
            throw { status: 401, msg: 'You didn\'t make that comment.' };
        }

        const post = await db.Post.findOne({
            where: {
                id: req.params.PostId
            }
        });

        const community = await db.Community.findOne({
            where: {
                id: post.CommunityId
            }
        });

        const [user] = await community.getMembers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' };
        }

        const upComment = await comment.update({
            message: req.body.message
        });

        res.status(200).json(upComment);
    }));

    app.put(route + '/:PostId/comments/:CommentId/:vote', wrap(async function (req, res, next) { // like/dislike comment
        const comment = await db.Comment.findOne({
            where: {
                id: req.params.CommentId
            },
            include: [{
                model: db.User,
                through: 'CommentVoter',
                as: 'voters',
                where: {
                    id: req.token.UserId
                },
                required: false
            }]
        });

        if (!comment) {
            throw { status: 404, msg: 'That comment doesn\'t exist.' };
        }

        const post = await db.Post.findOne({
            where: {
                id: req.params.PostId
            }
        });

        const community = await db.Community.findOne({
            where: {
                id: post.CommunityId
            }
        });

        const [user] = await community.getMembers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' };
        }

        if (comment.voters.length) {
            throw { status: 400, msg: 'You\'ve already voted on that post.' };
        }

        const newScore = comment.score + parseInt(req.params.vote);

        await comment.addVoter(user);
        await comment.update({
            score: newScore
        });

        res.status(200).json(newScore);
    }));
};
