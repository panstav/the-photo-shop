const oboe = require('../vendor/oboe/index');

module.exports = () => {
	getDatabaseAndAppend();
};

function getDatabaseAndAppend(){

	const table = document.querySelector('tbody');

	oboe('/get-feed')
		.on('done', transformDataAndAppend)
		.fail(err => console.error(err));

	function transformDataAndAppend(data){

		const ths = ['firstname', 'lastname', 'country', 'email', 'sentConfirmation'];

		const tr = document.createElement('tr');

		ths.forEach(th => {
			const td = document.createElement('td');
			td.textContent = data[th] || '';
			tr.appendChild(td);
		});

		table.appendChild(tr);
	}

}