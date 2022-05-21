const jwt = require('jsonwebtoken');
const config = require('config');

const genToken = (id) => {
  return jwt.sign(
    {
      userId: id,
    },
    config.get('jwtKey'),
    {
      expiresIn: '24h',
    }
  );
};

module.exports = genToken;
