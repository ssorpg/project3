const db = require('../models');
const route = '/api/search';

module.exports = function(app) {
  app.post(route, async function ({body: {search}}, res) {
    //*if no matches in this dataset start searching tables one by one
    //* search for communities, comm events, comm users, in the communities the user has access to
    let communitiesArray = [];
    let usersArray = [];
    let eventsArray = [];

    //1. Get Communites and compile names and ids into an array of objects
    try {
      let commRes = await db.Community.findAll({});
      console.log(communitiesRes);
      if (communitiesRes.res === 200) {
        commRes.forEach(comm => {
          console.log('here',comm.name);
        })
      }

    } catch (error) {
      
    }
    //2. Get All Users and put names and ids into an array of objects

    //3. Get All Events and put the names and ids into an array of objects


  })
}