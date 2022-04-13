require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

module.exports = {
  async create(req, res) {
    const { displayName, email, password, image } = req.body;

    await User.create({ displayName, email, password, image });

    const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
  
    res.status(201).json({ token });
  },
};
