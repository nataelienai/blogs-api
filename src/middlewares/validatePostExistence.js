const { BlogPost } = require('../models');

module.exports = async (req, res, next) => {
  const post = await BlogPost.findByPk(req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  next();
};
