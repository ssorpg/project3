const db = require('../models');

const route = '/api/communities';
const wrap = fn => (...args) => fn(...args).catch(args[2]); // async error handling

module.exports = function (app) {
    app.post(route, wrap(async function (req, res, next) { // create community
        const newCommunity = await db.Community.create({
            name: req.body.name,
            FounderId: req.UserId
        });

        const user = await db.User.findOne({
            where: {
                id: req.UserId
            }
        });

        await newCommunity.addUser(user);

        res.status(200).send('Community successfully created!');
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
            res.status(404).send('That community doesn\'t exist.');
        }
        else {
            res.status(200).json(community);
        }
    }));

    app.delete(route + '/:CommunityId', wrap(async function (req, res, next) { // delete community
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        if (!community) {
            res.status(404).send('That community doesn\'t exist.');
        }
        else if (community.FounderId === req.UserId) {
            await db.Community.destroy({
                where: {
                    id: community.id
                }
            });

            res.status(200).send('Community deleted.');
        }
        else {
            res.status(401).send('You don\'t own that community.');
        }
    }));

    app.post(route + '/:CommunityId/users', wrap(async function (req, res, next) { // join community
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        const user = await db.User.findOne({
            where: {
                id: req.UserId
            }
        });

        if (!community) {
            res.status(404).send('That community doesn\'t exist.');
        }
        else if (!await community.hasUser(user)) {
            await community.addUser(user);

            res.status(200).send('You joined the community!');
        }
        else {
            res.status(400).send('You\'re already in that community.');
        }
    }));

    app.delete(route + '/:CommunityId/users', wrap(async function (req, res, next) { // leave community
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        const user = await db.User.findOne({
            where: {
                id: req.UserId
            }
        });

        if (!community) {
            res.status(404).send('That community doesn\'t exist.');
        }
        else if (await community.hasUser(user)) {
            await community.removeUser(user);

            res.status(200).send('You left the community.');
        }
        else {
            res.status(400).send('You\'re not in that community.');
        }
    }));

    app.get(route + '/:CommunityId/users/:UserId', wrap(async function (req, res, next) { // another user's profile
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        const users = await db.User.findAll({
            $or: [
                { id: req.params.UserId },
                { id: req.UserId }
            ]
        });

        if (!community) {
            res.status(404).send('That community doesn\'t exist.');
        }
        else if (users.length === 2) {
            if (await community.hasUsers(users)) {
                const communities = await users[0].getCommunities();

                res.status(200).json(communities);
            }
            else {
                res.status(401).send('You aren\'t in a community with that user.');
            }
        }
        else {
            res.status(404).send('That user doesn\'t exist.');
        }
    }));

    app.get(route + '/:CommunityId/events', wrap(async function (req, res, next) { // community events
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        const user = await db.User.findOne({
            where: {
                id: req.UserId
            }
        });

        if (!community) {
            res.status(404).send('That community doesn\'t exist.');
        }
        else if (community.hasUser(user)) {
            const events = await community.getEvents();

            res.status(200).json(events);
        }
        else {
            res.status(401).send('You\'re not in that community.');
        }
    }));

    app.post(route + '/:CommunityId/events', wrap(async function (req, res, next) { // create event
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        const user = await db.User.findOne({
            where: {
                id: req.UserId
            }
        });

        if (!community) {
            res.status(404).send('That community doesn\'t exist.');
        }
        else if (await community.hasUser(user)) {
            const newEvent = await db.Event.create({
                name: req.body.name,
                FounderId: user.id,
                date: req.body.date
            });

            await community.addEvent(newEvent);

            res.status(200).send('Event created successfully!');
        }
        else {
            res.status(401).send('You\'re not in that community.');
        }
    }));

    app.get(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // get specific event
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            }
        });

        const user = await db.User.findOne({
            where: {
                id: req.UserId
            }
        });

        if (!community) {
            res.status(404).send('That community doesn\'t exist.');
        }
        else if (await community.hasUser(user)) {
            const [event] = await community.getEvents({
                where: {
                    id: req.params.EventId
                }
            });

            res.status(200).json(event);
        }
        else {
            res.status(401).send('You\'re not in that community.');
        }
    }));

    app.delete(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // delete event
        const event = await db.Event.findOne({
            where: {
                id: req.params.EventId
            }
        });

        if (!event) {
            res.status(404).send('That event doesn\'t exist.');
        }
        else if (event.FounderId === req.UserId) {
            await db.Event.destroy({
                where: {
                    id: event.id
                }
            });

            res.status(200).send('Event deleted.');
        }
        else {
            res.status(401).send('You don\'t own that event.');
        }
    }));

    app.put(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // edit event
        const event = await db.Event.findOne({
            where: {
                id: req.params.EventId
            }
        });

        if (!event) {
            res.status(404).send('That event doesn\'t exist.');
        }
        else if (event.FounderId === req.UserId) {
            await db.Event.update({
                // req.body
            },
            {
                where: {
                    id: req.params.EventId,
                    FounderId: req.UserId
                }
            });

            res.status(200).send('Event updated.');
        }
        else {
            res.status(401).send('You don\'t own that event.');
        }
    }));
};
