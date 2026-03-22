const express = require('express');
const { getHealth } = require('../controllers/healthController');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.get('/', getHealth);
router.use('/auth', authRoutes);

module.exports = router;
