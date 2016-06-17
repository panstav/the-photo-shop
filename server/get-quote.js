const db = require('./db');
const sendEmail = require('./send-email');
const validate = require('./validation');

module.exports = getQuote;

function getQuote(req, res, next){

	const userData = req.body;
	const constraints = {
		firstname:  { presence: true, length: { minimum: 2 } },
		lastname:   { presence: true, length: { minimum: 2 } },
		country:    { presence: true },
		email:      { presence: true, email: true }
	};

	validate(userData, constraints)
		.then(db.saveEntry)
		.then(() => {
			res.json(userData);

			// after responding to client - go ahead and email a confirmation
			return confirmByMail(userData);
		})
		.catch(next);

}

function confirmByMail(userData){

	const options = {
		recipient: userData.email,
		subject: 'Confirmation for your request of a quote',
		html: `<h1>Hey ${userData.firstname}!</h1>
<p>This is to confirm that we've received your request. Stay put!</p>`
	};

	return sendEmail(options);
}