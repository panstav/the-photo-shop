const intense = require('../vendor/intense');

const util = require('../util');
const imageWants = require('../image-wants');

window.onload = () => {
	intense(document.querySelectorAll('img'));
};

util.onReady(() => {
	applyCartIfPresent();
	handleCheckboxToggle();
});

function applyCartIfPresent(){
	const cartData = imageWants.get();

	if (!cartData) return;

	cartData.map(itemID => document.querySelector(`[data-img-id="${ itemID }"]`)).forEach(checkbox => {
		checkbox.checked = true;
	});

	showPaymentButton();
}

function handleCheckboxToggle(){
	util.forEachElem('[type="checkbox"]', elem => elem.addEventListener('click', event => {

		//save choise
		imageWants.set(event.srcElement.dataset.imgId, event.srcElement.checked);
		
		showPaymentButton();
	}));
}

function showPaymentButton(){
	document.getElementsByTagName('footer')[0].dataset.active = true;
}