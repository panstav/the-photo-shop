const levelup = require('levelup');
const shortid = require('shortid');

var db;

module.exports = initAndSetMethods;

function initAndSetMethods(){
	db = levelup(__dirname, { valueEncoding: 'json' });

	return { saveEntry, getFeed };
}

function saveEntry(data){
	return new Promise((resolve, reject) => {

		db.put(shortid.generate(), data, err => {
			if (err) return reject(err);

			resolve(data);
		});

	});
}

function getFeed(){
	return db.createValueStream();
}