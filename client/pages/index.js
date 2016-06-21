const intense = require('../vendor/intense');

const util = require('../util');
const imageWants = require('../image-wants');

window.onload = () => {
	intense(document.querySelectorAll('img'));
};

util.onReady(() => {
	handleCheckboxToggle();
});

function handleCheckboxToggle(){
	util.forEachElem('[type="checkbox"]', elem => elem.addEventListener('click', event => {

		// ensure button to continue to 'payment' is visible
		document.getElementsByTagName('footer')[0].dataset.active = true;

		//save choise
		imageWants.set(event.srcElement.dataset.imgId, event.srcElement.checked);

	}));
}