const db = require('../models');
const auth = require('./utils/auth');
const { getUser } = require('./utils/validate');
const multer = require('./utils/multerwithoptions');
const wrap = require('./utils/errorhandler');

require('dotenv').config();

const cookieOptionsS = {
  expires: new Date(Date.now() + 43200000), // 12 hours
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production' ? true : false,
  signed: true,
  sameSite: 'lax'
};

const cookieOptionsU = {
  expires: new Date(Date.now() + 43200000),
  httpOnly: false,
  secure: process.env.NODE_ENV === 'production' ? true : false,
  signed: false,
  sameSite: 'lax'
};

module.exports = function (app) {
  app.post('/api/users', wrap(async function (req, res, next) { // login
    const user = await db.User.findOne({
      where: {
        email: req.body.email
      },
      attributes: ['id', 'password']
    });

    if (!user) {
      throw { status: 401, msg: 'That email is not registered.' };
    }

    const token = await auth.makeToken(req, user);

    return res.status(200)
      .cookie('token', token, cookieOptionsS)
      .cookie('UserId', user.id, cookieOptionsU)
      .send('Login successful.');
  }));

  app.post('/api/users/register', wrap(async function (req, res, next) { // register user
    if ((req.body.password.length < 8 || req.body.password.length > 64) && process.env.NODE_ENV === 'production') {
      throw { status: 400, msg: 'Your password must be between 8 and 64 characters long.' };
    }

    const password = await auth.hashPass(req);

    const newUser = await db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: password
    });

    res.status(200).send('Account created!');
  }));

  app.get('/api/users/logout', wrap(async function (req, res, next) { // logout
    res.status(200)
      .clearCookie('token')
      .clearCookie('UserId')
      .send('Logout successful.');
  }));

  app.get('/api/users/profile', wrap(async function (req, res, next) { // user profile
    const user = await db.User.findOne({
      where: {
        id: req.token.UserId
      },
      include: [{
        model: db.Community,
        as: 'communities'
      },
      {
        model: db.Post,
        as: 'posts',
        limit: 20
      },
      {
        model: db.Community,
        as: 'invites'
      }]
    });

    res.status(200).json(user);
  }));

  app.put('/api/users/profile/update', wrap(async function (req, res, next) { // update profile
    await db.User.update(
      {
        name: req.body.name,
        bio: req.body.bio,
        location: req.body.location,
        status: req.body.status
      },
      {
        where: {
          id: req.token.UserId
        }
      });

    res.status(200).send('Profile updated!');
  }));

  app.post('/api/users/profile/images', multer.single('profileImage'), wrap(async (req, res, next) => { // update user profile image
    const user = await getUser(req.token.UserId);

    const image = await db.Image.create(req.file);

    user.addProfileImage(image);

    res.json(image);
  }));

  // app.delete('/api/users', wrap(async function (req, res, next) { // delete user
  //   await db.User.destroy({
  //     where: {
  //       id: req.token.UserId
  //     }
  //   });

  //   res.status(200)
  //     .clearCookie('token')
  //     .clearCookie('UserId')
  //     .send('Account deleted.');
  // }));
};
