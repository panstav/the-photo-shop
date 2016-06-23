const SparkPost = require('sparkpost');
const emailer = getClientOrMock();

module.exports = sendEmail;

function sendEmail(options){
	
	const isProduction = process.env.NODE_ENV === 'production';

	return new Promise((resolve, reject) => {

		const recepient = isProduction
			? options.recipient
			: process.env.ADMIN_ADDRESS;

		const sender = isProduction
			? { name: process.env.ADMIN_NAME, email: process.env.ADMIN_ADDRESS }
			: { name: process.env.ADMIN_NAME, email: `testing@${ process.env.SPARKPOST_SANDBOX_DOMAIN }` };

		const transmissionBody = {
			recipients: [{ address: recepient }],
			content: {
				from: sender,
				reply_to: `${process.env.ADMIN_NAME} <${process.env.ADMIN_ADDRESS }>`,
				subject: options.subject,
				html: options.html
			}
		};

		emailer.transmissions.send({ transmissionBody }, err => err ? reject(err) : resolve());
	});
}

function getClientOrMock(){

	if (process.env.SPARKPOST_API_KEY) return new SparkPost(process.env.SPARKPOST_API_KEY);

	return { transmissions: { send: mocker } };

	function mocker(emailData, callback){
		console.log('Mocking email submission:', emailData);
		callback();
	}

}