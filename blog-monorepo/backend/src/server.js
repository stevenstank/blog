const app = require('./app');
const { PORT } = require('./config/env');

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (error) => {
	console.error('Unhandled rejection:', error);
});

process.on('uncaughtException', (error) => {
	console.error('Uncaught exception:', error);
});
