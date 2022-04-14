const Joi = require('joi');
const { User } = require('../models');

const schema = Joi.object({
  email: Joi.string().not().empty().required(),
  password: Joi.string().not().empty().required(),
});

module.exports = async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ where: { email: req.body.email } });

  if (!user || user.password !== req.body.password) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  next();
};
