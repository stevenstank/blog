const express = require('express');
const {
  getPublishedPosts,
  getPublishedPostById,
  createPost,
  updatePost,
  deletePost,
  publishPost,
} = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');
const { requireAdmin } = require('../middleware/roleMiddleware');
const { parsePostId, validatePostPayload } = require('../middleware/postValidationMiddleware');

const router = express.Router();

router.get('/', getPublishedPosts);
router.get('/:id', parsePostId, getPublishedPostById);

router.post('/', verifyToken, requireAdmin, validatePostPayload, createPost);
router.put('/:id', verifyToken, requireAdmin, parsePostId, validatePostPayload, updatePost);
router.delete('/:id', verifyToken, requireAdmin, parsePostId, deletePost);
router.patch('/:id/publish', verifyToken, requireAdmin, parsePostId, publishPost);

module.exports = router;
