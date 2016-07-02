const intense = require('@tholman/intense-images');

const forEachElem = require('@panstav/for-each-elem');
const imageWants = require('./../scripts/image-wants');

const loader = {
	start: setLoaderState.bind(null, true),
	stop: setLoaderState.bind(null, false)
};

module.exports = query => {
	window.onload = () => {
		intense(document.querySelectorAll('img'), { loader });
	};

	applyCartIfPresent();
	handleCheckboxToggle();
	if ('cartSent' in query) showNoticeIfCartSubmitted(query.name);
};

function setLoaderState(state){
	document.querySelector('.overlay').dataset.active = state;
}

function applyCartIfPresent(){
	const cartData = imageWants.get();

	if (!cartData) return;

	cartData.map(itemID => document.querySelector(`[data-img-id="${ itemID }"]`)).forEach(checkbox => {
		checkbox.checked = true;
	});

	setPaymentButtonState(true);
}

function handleCheckboxToggle(){
	forEachElem('[type="checkbox"]', elem => elem.addEventListener('click', event => {

		//save choise
		imageWants.set(event.target.dataset.imgId, event.target.checked);

		// show payment button if cart has items, otherwise hide it
		setPaymentButtonState(!!imageWants.get());
	}));
}

function setPaymentButtonState(newState){
	document.getElementsByTagName('footer')[0].dataset.active = newState;
}

function showNoticeIfCartSubmitted(name){

	const confirmationString = `Thanks ${capitalize(name)}, you'll soon receive a confirmation email regarding your purchase.`;

	document.getElementsByClassName('notice')[0].innerText = confirmationString;

	function capitalize(str){
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

}