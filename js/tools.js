var cl = function (msg) {
	console.log(msg);
}

var _get = function (key) {
	return localStorage[key] || _mns.default[key];
}

