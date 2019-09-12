/* eslint-disable indent */
const db = require('../models');
const wrap = require('./utils/errorhandler');

module.exports = function (app) {
  app.get('/api/search', wrap(async function (req, res, next) {
    const query = `%${req.query.q}%`;

    // let communitiesArray = [];
    // let usersArray = [];
    // let eventsArray = [];
    let data = {};

    // let data = await // i think this query only finds communities and users who have the same name
    //   db.Community.findAll({
    //     where: {
    //       name: {
    //         [db.op.like]:
    //           query
    //       }
    //     },
    //     order: [
    //       ['name', 'DESC']
    //     ],
    //     include: [
    //       {
    //         model: db.User,
    //         as: 'members',
    //         where: {
    //           name: {
    //             [db.op.like]:
    //               query
    //           }
    //         },
    //         required: false
    //       },
    //       {
    //         model: db.Event,
    //         as: 'Events',
    //         where: {
    //           name: {
    //             [db.op.like]:
    //               query
    //           }
    //         },
    //         required: false
    //       }
    //     ]
    //   });

    const user = await db.User.findOne({
      where: {
        id: req.token.UserId
      },
      include: [{
        model: db.Community,
        as: 'communities',
        include: [{
          model: db.User,
          as: 'members',
          required: false,
          where: {
            name: {
              [db.op.like]: query
            }
          }
        }]
      }]
    });

    // do js logic to sort comms

    data = user.dataValues.communities;

    res.json(data);
  }));
};
