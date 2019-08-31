//this is here for now so i don't have to keep dealing with user authentication while testing the upload. also using multer package too so i don't wanna mess w/ ur routes
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

    const fileinfo = req.files[0];

    const image = await db.Image.create(fileinfo);

    await user.addProfileImage(image);

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