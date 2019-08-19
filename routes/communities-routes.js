const db = require('../models');

const route = '/api/communities';
const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function (app) {
    app.post(route, wrap(async function (req, res, next) { // create community
        const user = await db.User.findOne({
            where: {
                id: req.token.UserId
            }
        });

        const newCommunity = await db.Community.create({
            name: req.body.name,
            FounderId: req.token.UserId
        });

        await newCommunity.addMember(user);
        await user.addCommunity(newCommunity);

        res.status(200).send('Community created!');
    }));

    app.get(route, wrap(async function (req, res, next) { // get all communities?
        const communities = await db.Community.findAll();

        res.status(200).json(communities);
    }));

    app.get(route + '/:CommunityId', wrap(async function (req, res, next) { // get community info
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
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
            return res.status(200).json(community);
        }

        community.dataValues.founder = await community.getFounder();
        community.dataValues.feedPosts = await community.getPosts({
            limit: 20,
            where: {
                UserId: null,
                EventId: null
            },
            include: [{
                model: db.User,
                as: 'author'
            }]
        });

        res.status(200).json(community);
    }));

    app.delete(route + '/:CommunityId', wrap(async function (req, res, next) { // delete community
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        if (!community) {
            throw { status: 404, msg: 'That community doesn\'t exist.' };
        }

        if (community.FounderId !== req.token.UserId) {
            throw { status: 401, msg: 'You don\'t own that community.' };
        }

        await db.Community.destroy({
            where: {
                id: community.id
            }
        });

        res.status(200).send('Community deleted.');
    }));

    app.put(route + '/:CommunityId', wrap(async function (req, res, next) { // edit community
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        if (!community) {
            throw { status: 404, msg: 'That community doesn\'t exist.' };
        }

        if (community.FounderId !== req.token.UserId) {
            throw { status: 401, msg: 'You don\'t own that community.' };
        }

        const upCommunity = await db.Community.update({

            // update some stuff

            where: {
                id: req.params.CommunityId
            }
        });

        res.status(200).json(upCommunity);
    }));

    app.get(route + '/:CommunityId/users', wrap(async function (req, res, next) { // get community users
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
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

        community.dataValues.members = await community.getMembers();

        res.status(200).json(community);
    }));

    app.post(route + '/:CommunityId/users', wrap(async function (req, res, next) { // join community
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        if (!community) {
            throw { status: 404, msg: 'That community doesn\'t exist.' };
        }

        let [user] = await community.getMembers({
            where: {
                id: req.token.UserId
            }
        });

        if (user) {
            throw { status: 400, msg: 'You\'re already in that community.' };
        }

        user = await db.User.findOne({
            where: {
                id: req.token.UserId
            }
        });

        await community.addMember(user);
        await user.addCommunity(community);

        res.status(200).send('You joined the community!');
    }));

    app.delete(route + '/:CommunityId/users', wrap(async function (req, res, next) { // leave community
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
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
            throw { status: 400, msg: 'You\'re not in that community.' };
        }

        await community.removeMember(user);
        await user.removeCommunity(community);

        res.status(200).send('You left the community.');
    }));

    app.get(route + '/:CommunityId/users/profile', wrap(async function (req, res, next) { // your community wall
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
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
            throw { status: 400, msg: 'You\'re not in that community.' };
        }

        user.dataValues.wallPosts = await user.getPosts({
            where: {
                CommunityId: community.id,
                UserId: req.token.UserId
            },
            include: [{
                model: db.User,
                as: 'author'
            }]
        });

        res.status(200).json(user);
    }));

    app.get(route + '/:CommunityId/users/:UserId', wrap(async function (req, res, next) { // another user's wall
        if (req.token.UserId === parseInt(req.params.UserId)) {
            throw { status: 400, msg: 'That\'s you.' };
        }

        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        if (!community) {
            throw { status: 404, msg: 'That community doesn\'t exist.' };
        }

        const users = await community.getMembers({
            id: {
                $or: [
                    req.params.UserId,
                    req.token.UserId
                ]
            }
        });

        if (users.length !== 2) {
            throw { status: 401, msg: 'You\'re not in a community with that user.' };
        }

        const getUser = users[0];

        const resUser = { // we don't want their hashed password and email in the response
            name: getUser.name,
            wallPosts: await getUser.getPosts({
                where: {
                    CommunityId: community.id,
                    UserId: getUser.id
                },
                include: [{
                    model: db.User,
                    as: 'author'
                }]
            })
        };

        res.status(200).json(resUser);
    }));

    app.get(route + '/:CommunityId/events', wrap(async function (req, res, next) { // get community events
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
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

        community.dataValues.events = await community.getEvents();

        res.status(200).json(community);
    }));

    app.post(route + '/:CommunityId/events', wrap(async function (req, res, next) { // create event
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
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

        const newEvent = await db.Event.create({
            name: req.body.name,
            FounderId: user.id,
            date: req.body.date
        });

        await newEvent.addMember(user);
        await newEvent.setFounder(user);
        await community.addEvent(newEvent);

        res.status(200).json(newEvent);
    }));

    app.get(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // get specific event
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
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

        const [event] = await community.getEvents({
            where: {
                id: req.params.EventId
            }
        });

        if (!event) {
            throw { status: 404, msg: 'That event doesn\'t exist.' };
        }

        event.dataValues.founder = await event.getFounder();
        event.dataValues.eventPosts = await event.getPosts({
            limit: 20,
            include: [{
                model: db.User,
                as: 'author'
            }]
        });

        res.status(200).json(event);
    }));

    app.delete(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // delete event
        const event = await db.Event.findOne({
            where: {
                id: req.params.EventId
            }
        });

        if (!event) {
            throw { status: 404, msg: 'That event doesn\'t exist.' };
        }

        if (event.FounderId !== req.token.UserId) {
            throw { status: 401, msg: 'You don\'t own that event.' };
        }

        await db.Event.destroy({
            where: {
                id: event.id
            }
        });

        res.status(200).send('Event deleted.');
    }));

    app.put(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // edit event
        const event = await db.Event.findOne({
            where: {
                id: req.params.EventId
            }
        });

        if (!event) {
            throw { status: 404, msg: 'That event doesn\'t exist.' };
        }

        if (event.FounderId !== req.token.UserId) {
            throw { status: 401, msg: 'You don\'t own that event.' };
        }

        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
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

        const upEvent = await db.Event.update({

            // update some stuff

            where: {
                id: req.params.EventId
            }
        });

        res.status(200).json(upEvent);
    }));
};
