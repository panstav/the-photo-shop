const oboe = require('../vendor/oboe');

const util = require('../util');

util.onReady(() => {
	getDatabaseAndAppend();
});

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
			td.innerText = data[th] || '';
			tr.appendChild(td);
		});

		table.appendChild(tr);
	}

}