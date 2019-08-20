const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
    hashPass: function (req) {
        return bcrypt.hash(req.body.password, 10);
    },

    makeToken: function (req, user) {
        // getting an error here, possibly from attempting to log in after registering
        const doesMatch = bcrypt.compare(req.body.password, user.password);

        if (doesMatch) {
            return jwt.sign({ UserId: user.id, Name: user.name }, process.env.JWT_SECRET, { expiresIn: 43200 });
        }
        else {
            throw { status: 401, msg: 'Incorrect email or password.' };
        }
    }
};