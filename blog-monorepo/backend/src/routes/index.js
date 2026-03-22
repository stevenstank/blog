const express = require('express');
const { getHealth } = require('../controllers/healthController');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');

const router = express.Router();

router.get('/', getHealth);
router.use('/auth', authRoutes);
router.use('/posts', postRoutes);

module.exports = router;
