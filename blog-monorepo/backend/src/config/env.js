const dotenv = require('dotenv');

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const CORS_ORIGINS = (process.env.CORS_ORIGINS ||
  'http://localhost:5173,https://your-frontend-domain.com')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

module.exports = {
  PORT,
  DATABASE_URL,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CORS_ORIGINS,
};
