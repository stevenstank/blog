const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-env';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

module.exports = {
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
