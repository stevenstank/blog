const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(
	cors({
		origin: [
			'https://blog-seven-mu-89.vercel.app',
			'https://blog-k9uh.vercel.app',
			'http://localhost:5173',
			'http://localhost:5174',
		],
		credentials: true,
	})
);
app.use(express.json());

app.use('/', routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
