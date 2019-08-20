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
    httpOnly: false,
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
            },
            attributes: ['id', 'password']
        });

        const token = auth.makeToken(req, user);

        return res.status(200)
            .cookie('token', token, cookieOptionsS)
            .cookie('loggedIn', true, cookieOptionsU)
            .send({
                message: 'Login successful.',
                loggedIn: true
            });
    }));

    app.post(route + '/register', wrap(async function (req, res, next) { // register user
        // if (req.body.password.length < 8 || req.body.password.length > 64) { // commented for development
        //     throw { status: 400, msg: 'Your password must be between 8 and 64 characters long.' }
        // }

        const password = await auth.hashPass(req);

        await db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        });

        res.status(200).send('Account created!');
    }));

    app.put(route + '/update', wrap(async function (req, res, next) { // register user
        console.log(req.body);
        await db.User.update(
            {
                bio: req.body.bio,
                location: req.body.location,
            },
            {
                where: { id: req.body.id }
            }
        );
        res.status(200).send('Profile updated!');
    }));

    app.get(route + '/logout', wrap(async function (req, res, next) { // logout
        res.status(200)
            .clearCookie('token')
            .clearCookie('loggedIn')
            .send('Logout successful.');
    }));

    app.put(route, wrap(async function (req, res, next) { // edit user
        const upUser = await db.User.update({

            // update some stuff

            where: {
                id: req.token.UserId
            }
        });

        res.status(200).json(upUser);
    }));

    app.get(route + '/profile', wrap(async function (req, res, next) { // user profile
        const user = await db.User.findOne({
            where: {
                id: req.token.UserId
            },
            include: [{
                model: db.Community,
                as: 'communities'
            }]
        });

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
