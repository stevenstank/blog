const express = require('express');
const { getHealth } = require('../controllers/healthController');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

const router = express.Router();

router.get('/', getHealth);
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);
router.use('/', commentRoutes);

module.exports = router;
