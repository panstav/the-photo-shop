const db = require('./db');
const validate = require('./validation');

module.exports = getQuote;

function getQuote(req, res, next){

	const data = req.body;
	const constraints = {
		firstname:  { presence: true, length: { minimum: 2 } },
		lastname:   { presence: true, length: { minimum: 2 } },
		country:    { presence: true },
		email:      { presence: true, email: true }
	};

	validate(data, constraints)
		.then(db.saveEntry)
		.then(data => res.json(data))
		.catch(next);

}
