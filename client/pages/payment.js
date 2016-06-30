require('awesomplete');

const forEachElem = require('@panstav/for-each-elem');
const ajax = require('@panstav/json-ajax');

const imageWants = require('../scripts/image-wants');
const countries = require('../scripts/countries');

module.exports = () => {
	setCountriesAutoComplete();
	handleFormSubmission();
};

function setCountriesAutoComplete(){
	new Awesomplete(document.getElementById('country'), { list: countries });
	new Awesomplete(document.getElementById('email'), {
		list: [ 'gmail.com', 'yahoo.com', 'hotmail.com' ],
		filter: (text, input) => {
			if (input.indexOf('@') === -1) return false;
			return text.indexOf(input.substr(input.indexOf('@')+1)) > -1;
		},
		replace: function(text){
			this.input.value = this.input.value.substr(0, this.input.value.indexOf('@')+1) + text.value;
		}
	});
}

function handleFormSubmission(){
	document.getElementsByTagName('form')[0].addEventListener('submit', event => {
		event.preventDefault();

		removeValidationPrompts();

		const ajaxData = { cart: imageWants.get() };
		forEachElem('input', event.target, input => {
			ajaxData[input.name] = input.value;
		});

		ajax('/get-quote', ajaxData, (err, res) => {
			if (err){
				if (err.status === 400 && 'validationPrompt' in err.response) return insertValidationPrompt(err.response.validationPrompt);

				return console.error(err);
			}
			
			imageWants.clear();
			window.location = `/?cart-sent&name=${ajaxData.firstname}`;
		});

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

	forEachElem(prompts, prompt => prompt.parentNode.removeChild(prompt));
}