const util = require('../util');

util.onReady(() => {
	document.getElementsByTagName('form')[0].addEventListener('submit', handleFormSubmission);
});

function handleFormSubmission(event){
	event.preventDefault();

	removeValidationPrompts();

	const values = {};
	util.forEachElem('input', event.srcElement, input => {
		values[input.name] = input.value;
	});

	util.ajax('/get-quote', values, (err, res) => {
		if (err){
			if (err.status === 400 && 'validationPrompt' in err.response) return insertValidationPrompt(err.response.validationPrompt);

			return console.error(err);
		}


	});
}

function insertValidationPrompt(validationData){

	Object.keys(validationData).forEach(fieldName => {

		const validationHtml = validationData[fieldName].map(validationString => {
			return `<span class="validation-prompt">${validationString}</span>`;
		}).join('');

		document.getElementsByName(fieldName)[0].insertAdjacentHTML('afterend', validationHtml);
	});

}

function removeValidationPrompts(){

	const prompts = document.getElementsByClassName('validation-prompt');

	util.forEachElem(prompts, prompt => prompt.parentNode.removeChild(prompt));
}