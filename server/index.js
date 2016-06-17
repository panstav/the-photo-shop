const express = require('express');
const bodyParser = require('body-parser');

const getQuote = require('./get-quote');

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

module.exports = initServer;

function initServer(){

	const server = express();

	// serve static pages with pretty urls
	server.get('/', (req, res) => res.sendFile('index.html', { root: 'public' }));
	server.get('/payment', (req, res) => res.sendFile('payment.html', { root: 'public' }));
	server.get('/backoffice', (req, res) => res.sendFile('backoffice.html', { root: 'public' }));

	server.post('/get-quote', bodyParser.json(), getQuote);

	server.use(
		express.static('public'), // serve static files
		errorHandler,             // handle next(err)
		notFound                  // handle 404 route
	);

	return server;
}