const db = require('../models');
const route = '/api/search';
const like = db.op.like;

module.exports = function (app) {
  //todo make a post to receive search terms
  app.post(`${route}/:searchQuery`, async function (
    { req: { search } },
    res
  ) {
    //*if no matches in this dataset start searching tables one by one
    //* search for communities, comm events, comm users, in the communities the user has access to
    let communitiesArray = [];
    let usersArray = [];
    let eventsArray = [];
    let data = {};

    //1. Get Communites and compile names and ids into an array of objects
    try {
      let commRes = await
        db.Community.findAll({
          where: {
            name: {
              [db.op.like]:
                '%' + search + '%'
            }
          }
        });

      let usersRes = await
        db.User.findAll({
          where: {
            name: {
              [db.op.like]:
                '%' + search + '%'
            }
          }
        });

      let eventsRes = await
        db.Event.findAll({
          where: {
            name: {
              [db.op.like]:
                '%' + search + '%'
            }
          }
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
      console.log(data);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
    //2. Get All Users and put names and ids into an array of objects

    //3. Get All Events and put the names and ids into an array of objects


  })
}