module.exports = { get, set, clear };

function get(){
	const storedValue = JSON.parse(localStorage.getItem('image-wants'));
	return storedValue && storedValue.length ? storedValue : null;
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

function clear(){
	localStorage.setItem('image-wants', JSON.stringify([]));
}