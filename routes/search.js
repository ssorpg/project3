const db = require('../models');
const route = '/api/search';
const like = db.op.like;

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
      let commRes = await
        db.Community.findAll({
          where: {
            name: {
              [db.op.like]:
                query
            }
          },
          order: [
            ['name', 'DESC']
          ]
        });

      let usersRes = await
        db.User.findAll({
          where: {
            name: {
              [db.op.like]:
                query
            }
          },
          order: [
            ['name', 'DESC']
          ]
        });

      let eventsRes = await
        db.Event.findAll({
          where: {
            name: {
              [db.op.like]:
                query
            }
          },
          order: [
            ['name', 'DESC']
          ]
        });
      //todo make these a util function
      if (commRes.length > 0) {
        commRes.forEach(comm => {
          communitiesArray.push({
            'id': comm.id,
            'name': comm.name
          })
        })
      }
      
      if (usersRes.length > 0) {
        usersRes.forEach(comm => {
          usersArray.push({
            'id': comm.id,
            'name': comm.name
          })
        })
      }
      
      if (eventsRes.length > 0) {
        eventsRes.forEach(comm => {
          eventsArray.push({
            'id': comm.id,
            'name': comm.name
          })
        })
      }
      data = {
        'communities':
          communitiesArray,
        'users':
          usersRes,
        'events':
          eventsRes
      }
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  })
}
