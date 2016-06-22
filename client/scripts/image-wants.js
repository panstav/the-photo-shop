module.exports = { get, set };

function get(){
	return JSON.parse(localStorage.getItem('image-wants'));
}

function set(imgID, toggle){
	const wants = get() || [];

	if (toggle){
		wants.push(imgID);

	} else {
		let index = wants.indexOf(imgID);
		wants.splice(index, 1);
	}

	localStorage.setItem('image-wants', JSON.stringify(wants));
}