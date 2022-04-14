require('dotenv');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const { email } = jwt.verify(token, JWT_SECRET);
    const user = User.findOne({ where: { email } });
    req.user = user;

    next();
  } catch (e) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};
