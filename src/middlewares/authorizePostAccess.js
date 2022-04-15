const { BlogPost } = require('../models');

module.exports = async (req, res, next) => {
  const post = await BlogPost.findByPk(req.params.id, { attributes: ['userId'] });

  if (post.userId !== req.user.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};
