const db = require('../models');

const route = '/api/posts';
const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function (app) {
    async function makeNewPost(req) {
        return await db.Post.create({
            title: req.body.title,
            AuthorId: req.token.UserId,
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

        const [user] = await community.getUsers({
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
            const event = await community.getEvents({
                where: {
                    id: EventId
                }
            });

            if (!event) {
                throw { status: 404, msg: 'That event doesn\'t exist.' };
            }

            newPost = await makeNewPost(req);

            await community.addPost(newPost);
            await event.addPost(newPost);

            res.status(200).send('Event post created!');
        }
        else if (UserId) {
            const [getUser] = await community.getUsers({
                where: {
                    id: UserId
                }
            });

            if (!getUser) {
                throw { status: 401, msg: 'You aren\'t in a community with that user.' };
            }

            newPost = await makeNewPost(req);

            await community.addPost(newPost);
            await getUser.addPost(newPost);

            res.status(200).send('Wall post created!');
        }
        else {
            newPost = await makeNewPost(req);

            await community.addPost(newPost);

            res.status(200).send('Feed post created!');
        }
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

        if (post.AuthorId !== req.token.UserId) {
            throw { status: 401, msg: 'You didn\'t make that post.' };
        }

        await db.Post.destroy({
            where: {
                id: post.id
            }
        });

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

        if (post.AuthorId !== req.token.UserId) {
            throw { status: 401, msg: 'You didn\'t make that post.' };
        }

        const community = await db.Community.findOne({
            where: {
                id: post.CommunityId
            }
        });

        const [user] = await community.getUsers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' }; // can't edit posts to send messages to communities you're no longer in
        }

        await db.Post.update({

            // update some stuff

            where: {
                id: post.id
            }
        });

        res.status(200).send('Post updated.');
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

        const [user] = await community.getUsers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' };
        }

        const comments = await post.getComments();

        res.status(200).json(comments);
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

        const [user] = await community.getUsers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' };
        }

        await post.addComment({
            message: req.body.message,
            AuthorId: req.token.UserId
        });

        res.status(200).send('Comment created!');
    }));

    app.delete(route + ':PostId/comments/:CommentId', wrap(async function (req, res, next) { // delete comment
        const comment = await db.Comment.findOne({
            where: {
                id: req.params.CommentId
            }
        });

        if (!comment) {
            throw { status: 404, msg: 'That comment doesn\'t exist.' };
        }

        if (comment.AuthorId !== req.token.UserId) {
            throw { status: 401, msg: 'You didn\'t make that comment.' };
        }

        await db.Comment.destroy({
            where: {
                id: comment.id
            }
        });

        res.status(200).send('Comment deleted.');
    }));

    app.put(route + ':PostId/comments/:CommentId', wrap(async function (req, res, next) { // edit comment
        const comment = await db.Comment.findOne({
            where: {
                id: req.params.CommentId
            }
        });

        if (!comment) {
            throw { status: 404, msg: 'That comment doesn\'t exist.' };
        }

        if (comment.AuthorId !== req.token.UserId) {
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

        const [user] = await community.getUsers({
            where: {
                id: req.token.UserId
            }
        });

        if (!user) {
            throw { status: 401, msg: 'You\'re not in that community.' };
        }

        await db.Comment.update({

            // update some stuff

            where: {
                id: comment.id
            }
        });

        res.status(200).send('Comment updated.');
    }));
};
