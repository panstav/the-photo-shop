const levelup = require('levelup');
const shortid = require('shortid');

const db = levelup(__dirname, { valueEncoding: 'json' });

module.exports = { saveEntry, getFeed };

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