const validate = require('validate.js');

module.exports = validation;

function validation(data, constraints){
	const error = validate(data, constraints);

	if (error) return Promise.reject({ validationPrompt: error });

	return Promise.resolve(data);
}