const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

module.exports = {
  async create(req, res) {
    const { title, content, categoryIds } = req.body;
    const userId = req.user.id;

    const post = await BlogPost.create({ title, content, userId });

    await Promise.all(categoryIds.map((categoryId) => (
      PostCategory.create({ postId: post.id, categoryId })
    )));
  
    res.status(201).json(post);
  },

  async findAll(req, res) {
    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    res.status(200).json(posts);
  },

  async findById(req, res) {
    const post = await BlogPost.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    res.status(200).json(post);
  },

  async search(req, res) {
    const { q } = req.query;

    const posts = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    res.status(200).json(posts);
  },

  async update(req, res) {
    const { title, content } = req.body;
    const { id } = req.params;

    await BlogPost.update({ title, content }, { where: { id } });

    const updatedPost = await BlogPost.findByPk(id, {
      attributes: ['title', 'content', 'userId'],
      include: [
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    res.status(200).json(updatedPost);
  },

  async delete(req, res) {
    await BlogPost.destroy({ where: { id: req.params.id } });
    res.status(204).end();
  },
};
