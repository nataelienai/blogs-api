const { BlogPost, PostCategory } = require('../models');

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
};
