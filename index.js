// load environment variables and don't throw missing-env-file warning if env.production
require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });

const initServer = require('./server');

const port = process.env.PORT || 3000;

initServer().listen(port, () => {
	console.info(`Listening on port ${port}`);
});