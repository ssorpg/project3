const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
    hashPass: function (req) {
        return bcrypt.hash(req.body.password, 10);
    },

    makeToken: function (req, user) {
        const doesMatch = bcrypt.compare(req.body.password, user.password);

        if (doesMatch) {
            return jwt.sign({ userID: user.id }, process.env.JWT_SECRET, { expiresIn: 43200 });
        }
    }
}