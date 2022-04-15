const Joi = require('joi');
const { Category } = require('../models');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

module.exports = async (req, res, next) => {
  const { categoryIds } = req.body;
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const categories = await Category.findAll();
  const categoryIdsExist = categoryIds.every((categoryId) => (
    categories.find(({ id }) => id === categoryId)
  ));

  if (!categoryIdsExist) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};
