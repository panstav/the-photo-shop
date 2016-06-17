module.exports = {
	onReady,
	ajax,
	forEachElem
};

function onReady(fn){

	if (document.readyState != 'loading') return fn();

	if (document.addEventListener) return document.addEventListener('DOMContentLoaded', fn);

	document.attachEvent('onreadystatechange', () => {
		if (document.readyState != 'loading') fn();
	});

}

function ajax(url, data, callback, fallback){

	if (typeof(data) === 'function'){
		callback = data;
		data = undefined;
	}

	const request = new XMLHttpRequest();

	request.open(data ? 'POST' : 'GET', url, true);

	if (data) request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

	request.onload = () => {
		const response = tryParse(request.responseText);

		if (request.status >= 200 && request.status < 400) return callback(null, response);

		callback({ response, status: request.status });
	};
	
	request.onerror = fallback || console.error.bind(console);

	request.send(JSON.stringify(data));

	function tryParse(resp){
		// return response, parse it in case it's encoded json
		try { return JSON.parse(resp); }
		catch(err) { return resp; }
	}

}

function forEachElem(identifier, parent, fn){

	if (typeof(parent) === 'function'){
		fn = parent;
		parent = document;
	}

	// resolve to an iterate-able list of elements
	// identifier would be either a string pointer to elements -> query by pointer
	// or a list which could be directly iterated with forEach, or something that can transformed to
	var elements = isString(identifier)
		? parent.querySelectorAll(identifier)
		: isArray(identifier)
		               ? identifier
		               : [].slice.call(identifier);

	// pass the elements one by one to the given fn
	elements.forEach(fn);
}

function isString(str){
	return typeof(str) === 'string';
}

function isArray(arr){
	// this should work for ie9+
	return {}.toString.call(arr) == '[object Array]';
}