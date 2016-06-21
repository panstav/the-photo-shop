const objectStream = require('object-stream');

const db = require('./db');

module.exports = getFeed;

function getFeed(req, res){

	db.getFeed()
		.pipe(objectStream.map(value => JSON.stringify(value)))
		.pipe(res);

}