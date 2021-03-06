module.exports = errorHandler;

function errorHandler(err, req, res, next){

	if (err.validationPrompt) return res.status(400).send(err);

	if (err){
		res.status(500).end();
		return console.error(err.stack);
	}

	next();

}