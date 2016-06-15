module.exports = errorHandler;

function errorHandler(err, req, res, next){

	if (err){
		res.status(500).end();
		return console.error(err);
	}

	next();

}