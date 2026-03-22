const express = require('express');
const {
  createComment,
  getCommentsByPostId,
  deleteComment,
} = require('../controllers/commentController');
const { verifyToken } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');
const {
  parsePostId,
  parseCommentId,
  validateCommentPayload,
} = require('../middleware/commentValidationMiddleware');

const router = express.Router();

router.post('/posts/:id/comments', parsePostId, validateCommentPayload, createComment);
router.get('/posts/:id/comments', parsePostId, getCommentsByPostId);

router.delete('/comments/:id', verifyToken, requireAdmin, parseCommentId, deleteComment);

module.exports = router;
