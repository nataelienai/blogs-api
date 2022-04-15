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

    if (!post) return res.status(404).json({ message: 'Post does not exist' });
    res.status(200).json(post);
  },
};
