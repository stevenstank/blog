const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const { CORS_ORIGINS } = require('./config/env');

const app = express();

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || CORS_ORIGINS.includes(origin)) {
				return callback(null, true);
			}

			return callback(new Error('Not allowed by CORS'));
		},
	})
);
app.use(express.json());

app.use('/', routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
