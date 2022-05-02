const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

const { JWT_SECRET } = process.env;

module.exports = {
  async login(req, res) {
    const { email } = req.body;

    const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
  
    res.status(200).json({ token });
  },
};
