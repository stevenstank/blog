const parsePostId = (req, res, next) => {
  const postId = Number.parseInt(req.params.id, 10);

  if (!Number.isInteger(postId) || postId <= 0) {
    return res.status(400).json({ message: 'Invalid post id' });
  }

  req.postId = postId;
  return next();
};

const validatePostPayload = (req, res, next) => {
  const { title, content } = req.body;

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (typeof content !== 'string' || content.trim().length === 0) {
    return res.status(400).json({ message: 'Content is required' });
  }

  req.body.title = title.trim();
  req.body.content = content.trim();

  return next();
};

module.exports = {
  parsePostId,
  validatePostPayload,
};
