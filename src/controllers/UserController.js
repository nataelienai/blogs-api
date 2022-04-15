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

  async findAll(req, res) {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
  },

  async findById(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: 'User does not exist' });
    res.status(200).json(user);
  },

  async delete(req, res) {
    await User.destroy({ where: { id: req.user.id } });
    res.status(204).end();
  },
};
