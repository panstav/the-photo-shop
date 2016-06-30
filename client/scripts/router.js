const camelcase = require('camelcase');

module.exports = router;

function router(path, controller){
	if (!controller) window.location = path;

	const query = getQueryData();

	if (location.pathname === path) controller(query);

	function getQueryData(){
		return window.location.search.replace('?', '').split('&').reduce((accumulator, queryString) => {
			const assignment = queryString.split('=');
			accumulator[camelcase(assignment[0])] = assignment[1];
			return accumulator;
		}, {});
	}

}