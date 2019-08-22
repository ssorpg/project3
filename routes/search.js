const db = require('../models');
const route = '/api/search';

module.exports = function (app) {
  //todo make a post to receive search terms
  app.get(`${route}`, async function (
    {query: {q}},
    res
  ) {
    const query = `\%${q}\%`;

    let communitiesArray = [];
    let usersArray = [];
    let eventsArray = [];
    let data = {};
  
    try {
      let data = await
        db.Community.findAll({
          where: {
            name: {
              [db.op.like]:
                query
            }
          },
          order: [
            ['name', 'DESC']
          ],
          include: [
            {
              model: db.User,
              as: 'members',
              where: {
                name: {
                  [db.op.like]:
                    query
                }
              },
              required: false
            },
            {
              model: db.Event,
              as: 'Events',
              where: {
                name: {
                  [db.op.like]:
                    query
                }
              },
              required: false
            }
          ]
        });
      
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  })
}
