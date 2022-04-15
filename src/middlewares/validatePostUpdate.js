const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.any().forbidden().messages({
    'any.unknown': 'Categories cannot be edited',
  }),
});

module.exports = async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};
