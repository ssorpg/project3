const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
  hashPass: async function (req) {
    return await bcrypt.hash(req.body.password, 10);
  },

  makeToken: async function (req, user) {
    const doesMatch = await bcrypt.compare(req.body.password, user.password);

    if (doesMatch) {
      return jwt.sign({ UserId: user.id }, process.env.JWT_SECRET, { expiresIn: 43200 });
    }
    else {
      throw { status: 401, msg: 'Password incorrect.' };
    }
  }
};