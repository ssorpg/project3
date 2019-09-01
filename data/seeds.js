module.exports = async function (db) {
  try {
    const users = await db.User.bulkCreate([
      {
        name: 'Jon',
        email: 'ssorpg@gmail.com',
        password: 'this is not a safe password'
      },
      {
        name: 'Kevin',
        email: 'idontknow@somewhere.com',
        password: 'this is not a safe password'
      },
      {
        name: 'Matt',
        email: 'idontknoweither@somewhere.com',
        password: 'this is not a safe password'
      }
    ]);

    const tpn = await db.Community.create({
      name: 'TPN',
      founderId: users[0].id,
      private: false
    });

    await tpn.addMembers(users);
  }
  catch (error) {
    console.log(error.message);
  }
};