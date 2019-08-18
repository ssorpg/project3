const db = require('../models');
const auth = require('./auth/auth');

require('dotenv').config();

const cookieOptionsS = {
    expires: new Date(Date.now() + 43200000),
    httpOnly: true,
    secure: false, // true on deployment for https
    signed: true
};

const cookieOptionsU = {
    expires: new Date(Date.now() + 43200000),
    httpOnly: true,
    secure: false,
    signed: false
};

const route = '/api/users';
const wrap = fn => (...args) => fn(...args).catch(args[2]);

module.exports = function (app) {
    app.post(route, wrap(async function (req, res, next) { // login
        const user = await db.User.findOne({
            where: {
                email: req.body.email
            }
        });

        const token = auth.makeToken(req, user);

        return res.status(200)
            .cookie('token', token, cookieOptionsS)
            .cookie('loggedIn', true, cookieOptionsU)    // not sure we need this, if you have a token you're already logged in
            .cookie('userId', user.id, cookieOptionsU)   // not sure we need this, the token has your id in it
            .send({
                message: 'Login successful.',
                loggedIn: true
            });
    }));

    app.post(route + '/register', wrap(async function (req, res, next) { // register user
        const password = await auth.hashPass(req);

        await db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        });

        res.status(200).send('Account created!');
    }));

    app.get(route + '/logout', wrap(async function (req, res, next) { // logout
        res.status(200)
            .clearCookie('token')
            .clearCookie('loggedIn')
            .clearCookie('userId')
            .send('Logout successful.');
    }));

    app.put(route, wrap(async function (req, res, next) { // edit user
        await db.User.update({

            // update some stuff

            where: {
                id: req.token.UserId
            }
        });

        res.status(200).send('Profile updated.');
    }));

    app.get(route + '/profile', wrap(async function (req, res, next) { // user profile
        const user = await db.User.findOne({
            where: {
                id: req.token.UserId
            }
        });

        user.dataValues.communities = await user.getCommunities();

        res.status(200).json(user);
    }));

    app.delete(route, wrap(async function (req, res, next) { // delete user
        await db.User.destroy({
            where: {
                id: req.token.UserId
            }
        });

        res.status(200).send('Account deleted.');
    }));
};
