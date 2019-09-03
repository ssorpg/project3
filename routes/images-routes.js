const multer = require('multer')({ dest: 'client/build/images' });
const db = require('../models');

const wrap = fn => (...args) => fn(...args).catch(args[2]);

module.exports = app => {
  app.post('/api/users/images', multer.any(), wrap(async (req, res, next) => {
    const user = await db.User.findOne({
      where: {
        id: req.token.UserId
      }
    });

    const image = await db.Image.create(req.files[0]);

    user.addProfileImage(image);

    res.json(image);
  }));

  // app.get('/api/users/:UserId/images', wrap(async (req, res, next) => {
  //   const image = await db.Image.findOne({
  //     where: { UserId: req.params.UserId },
  //     order: [['createdAt', 'DESC']],
  //     limit: 1
  //   })

  //   res.json(image);
  // }));
};