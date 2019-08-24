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
            founderId: req.token.UserId
        });

        await newCommunity.addMember(user);
        await user.addCommunity(newCommunity);

        res.status(200).json(newCommunity);
    }));

    app.get(route, wrap(async function (req, res, next) { // get all communities?
        const user = await db.User.findOne({
            where: {
                id: req.token.UserId
            },
            include: [{
                model: db.Community,
                as: 'communities'
            }]
        });

        const commIds = user.communities.map(comm => {
            return comm.id;
        });

        const communities = await db.Community.findAll({
            attributes: ['id', 'name'],
            where: {
                id: {
                    [db.op.ne]: commIds
                }
            },
            limit: 20
        });

        res.status(200).json(communities);
    }));

    app.get(route + '/:CommunityId', wrap(async function (req, res, next) { // get community info
        const community = await db.Community.findOne({
            where: {
                id: req.params.CommunityId
            },
            include: [{
                model: db.User,
                as: 'founder'
            }]
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

        community.dataValues.feedPosts = await community.getPosts({
            limit: 20,
            where: {
                UserId: null,
                EventId: null
            },
            include: [{
                model: db.User,
                as: 'author',
                include: [{
                    model: db.Image,
                    as: 'profileImage',
                    limit: 1
                }]
            },
            {
                model: db.Comment,
                as: 'comments',
                include: [{
                    model: db.User,
                    as: 'author'
                }]
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

        if (req.token.UserId !== community.founderId) {
            throw { status: 401, msg: 'You don\'t own that community.' };
        }

        await community.destroy();

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

        if (req.token.UserId !== community.founderId) {
            throw { status: 401, msg: 'You don\'t own that community.' };
        }

        const upCommunity = await community.update({

            // update some stuff

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

        community.dataValues.members = await community.getMembers({
            include: [{
                model: db.Image,
                as: 'profileImage',
                where: {
                    id: req.token.UserId
                },
                limit: 1
            }]
        });

        res.status(200).json(community);
    }));

    // app.post(route + '/:CommunityId/invited/:UserEmail', wrap(async function (req, res, next) { // invite user to community
    //     const community = await db.Community.findOne({
    //         where: {
    //             id: req.params.CommunityId
    //         }
    //     });

    //     if (!community) {
    //         throw { status: 404, msg: 'That community doesn\'t exist.' };
    //     }

    //     if (req.token.UserId !== community.founderId) {
    //         throw { status: 401, msg: 'You don\'t own that community.' };
    //     }

    //     let [user] = await community.getMembers({
    //         where: {
    //             email: req.params.UserEmail
    //         }
    //     });

    //     if (user) {
    //         throw { status: 400, msg: 'That user\'s already in that community.' };
    //     }

    //     [user] = await community.getInvited({
    //         where: {
    //             email: req.params.UserEmail
    //         }
    //     });

    //     if (user) {
    //         throw { status: 400, msg: 'That user\'s already been invited to that community.' };
    //     }

    //     user = await db.User.findOne({
    //         where: {
    //             email: req.params.UserEmail
    //         }
    //     });

    //     if (!user) {
    //         throw { status: 404, msg: 'That user doesn\'t exist.' };
    //     }

    //     await community.addInvited(user);
    //     await user.addInvites(community);

    //     res.status(200).send('You invited the user to the community!');
    // }));

    // app.get(route + '/:CommunityId/invited', wrap(async function (req, res, next) { // get community invites
    //     const community = await db.Community.findOne({
    //         where: {
    //             id: req.params.CommunityId
    //         }
    //     });

    //     if (!community) {
    //         throw { status: 404, msg: 'That community doesn\'t exist.' };
    //     }

    //     if (req.token.UserId !== community.founderId) {
    //         throw { status: 401, msg: 'You don\'t own that community.' };
    //     }

    //     community.dataValues.invited = await community.getInvited();

    //     res.status(200).json(community);
    // }));

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

        // [user] = await community.getInvited({
        //     where: {
        //         id: req.token.UserId
        //     }
        // });

        // if (!user && community.id !== 1) { // first community is public
        //     throw { status: 401, msg: 'You haven\'t been invited to that community.' };
        // }

        user = await db.User.findOne({
            where: {
                id: req.token.UserId
            }
        });

        // await community.removeInvited(user);

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

        if (req.token.UserId === community.founderId) {
            throw { status: 400, msg: 'You can\'t leave a community you own!' };
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

    // app.get(route + '/:CommunityId/wall', wrap(async function (req, res, next) { // your community wall
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
    //         throw { status: 400, msg: 'You\'re not in that community.' };
    //     }

    //     user.dataValues.wallPosts = await user.getPosts({
    //         where: {
    //             CommunityId: community.id,
    //             UserId: req.token.UserId
    //         },
    //         include: [{
    //             model: db.User,
    //             as: 'author'
    //         }]
    //     });

    //     res.status(200).json(user);
    // }));

    app.get(route + '/:CommunityId/users/:UserId/wall', wrap(async function (req, res, next) { // another user's wall
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

        const [user] = await community.getMembers({
            where: {
                id: req.token.UserId
            }
        });

        const [getUser] = await community.getMembers({
            where: {
                id: req.params.UserId
            },
            include: [{
                model: db.Image,
                as: 'profileImage',
                where: {
                    id: req.token.UserId
                },
                limit: 1
            }]
        });

        if (!user || !getUser) {
            throw { status: 401, msg: 'You\'re not in a community with that user.' };
        }

        getUser.dataValues.wallPosts = await getUser.getWallPosts({
            where: {
                CommunityId: community.id
            },
            include: [{
                model: db.User,
                as: 'author',
                include: [{
                    model: db.Image,
                    as: 'profileImage',
                    limit: 1
                }]
            },
            {
                model: db.Comment,
                as: 'comments',
                include: [{
                    model: db.User,
                    as: 'author'
                }]
            }]
        });

        res.status(200).json(getUser);
    }));

    // app.get(route + '/:CommunityId/events', wrap(async function (req, res, next) { // get community events
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

    // app.post(route + '/:CommunityId/events', wrap(async function (req, res, next) { // create event
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

    // app.get(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // get specific event
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

    // app.delete(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // delete event
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

    // app.put(route + '/:CommunityId/events/:EventId', wrap(async function (req, res, next) { // edit event
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
