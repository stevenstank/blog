const prisma = require('../config/prisma');

const createComment = async (req, res) => {
  try {
    const { content, authorName } = req.body;

    const post = await prisma.post.findFirst({
      where: {
        id: req.postId,
        published: true,
      },
      select: { id: true },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorName,
        postId: req.postId,
      },
    });

    return res.status(201).json({ comment });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create comment' });
  }
};

const getCommentsByPostId = async (req, res) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: req.postId,
        published: true,
      },
      select: { id: true },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: req.postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch comments' });
  }
};

const deleteComment = async (req, res) => {
  try {
    const existingComment = await prisma.comment.findUnique({
      where: { id: req.commentId },
      select: { id: true },
    });

    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    await prisma.comment.delete({
      where: { id: req.commentId },
    });

    return res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete comment' });
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
  deleteComment,
};
