const prisma = require('../config/prisma');

const getPublishedPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

const getPublishedPostById = async (req, res) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: req.postId,
        published: true,
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch post' });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.user.userId,
      },
    });

    return res.status(201).json({ post });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create post' });
  }
};

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const existingPost = await prisma.post.findUnique({
      where: { id: req.postId },
      select: { id: true },
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = await prisma.post.update({
      where: { id: req.postId },
      data: {
        title,
        content,
      },
    });

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: req.postId },
      select: { id: true, published: true },
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (existingPost.published) {
      return res.status(400).json({ message: 'Cannot delete published post' });
    }

    await prisma.comment.deleteMany({
      where: { postId: req.postId },
    });

    await prisma.post.delete({
      where: { id: req.postId },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete post' });
  }
};

const publishPost = async (req, res) => {
  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: req.postId },
      select: { id: true, published: true },
    });

    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const post = await prisma.post.update({
      where: { id: req.postId },
      data: { published: !existingPost.published },
    });

    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to publish post' });
  }
};

module.exports = {
  getPublishedPosts,
  getAllPosts,
  getPublishedPostById,
  createPost,
  updatePost,
  deletePost,
  publishPost,
};
