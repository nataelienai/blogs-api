const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
});

module.exports = async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
