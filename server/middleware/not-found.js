module.exports = notFound;

function notFound(req, res){

	if (req.accepts('html')){
		return res.redirect('/');
	}

	res.status(404).end();
	
}