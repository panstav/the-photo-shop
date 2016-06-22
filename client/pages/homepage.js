const intense = require('../vendor/intense/index');

const util = require('./../scripts/util');
const imageWants = require('./../scripts/image-wants');

module.exports = () => {
	window.onload = () => {
		intense(document.querySelectorAll('img'));
	};

	applyCartIfPresent();
	handleCheckboxToggle();
};

function applyCartIfPresent(){
	const cartData = imageWants.get();

	if (!cartData) return;

	cartData.map(itemID => document.querySelector(`[data-img-id="${ itemID }"]`)).forEach(checkbox => {
		checkbox.checked = true;
	});

	setPaymentButtonState(true);
}

function handleCheckboxToggle(){
	util.forEachElem('[type="checkbox"]', elem => elem.addEventListener('click', event => {

		//save choise
		imageWants.set(event.srcElement.dataset.imgId, event.srcElement.checked);

		// show payment button if cart has items, otherwise hide it
		setPaymentButtonState(!!imageWants.get());
	}));
}

function setPaymentButtonState(newState){
	document.getElementsByTagName('footer')[0].dataset.active = newState;
}