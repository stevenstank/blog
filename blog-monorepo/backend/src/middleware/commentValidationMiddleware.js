const { parsePostId } = require('./postValidationMiddleware');

const parseCommentId = (req, res, next) => {
  const commentId = Number.parseInt(req.params.id, 10);

  if (!Number.isInteger(commentId) || commentId <= 0) {
    return res.status(400).json({ message: 'Invalid comment id' });
  }

  req.commentId = commentId;
  return next();
};

const validateCommentPayload = (req, res, next) => {
  const { content, authorName } = req.body;

  if (typeof content !== 'string' || content.trim().length === 0) {
    return res.status(400).json({ message: 'Content is required' });
  }

  if (authorName !== undefined && (typeof authorName !== 'string' || authorName.trim().length === 0)) {
    return res.status(400).json({ message: 'authorName must be a non-empty string when provided' });
  }

  req.body.content = content.trim();

  if (authorName !== undefined) {
    req.body.authorName = authorName.trim();
  }

  return next();
};

module.exports = {
  parsePostId,
  parseCommentId,
  validateCommentPayload,
};
