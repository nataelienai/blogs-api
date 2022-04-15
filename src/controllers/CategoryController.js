const { Category } = require('../models');

module.exports = {
  async create(req, res) {
    const { name } = req.body;

    const category = await Category.create({ name });
  
    res.status(201).json(category);
  },

  async findAll(req, res) {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  },
};
