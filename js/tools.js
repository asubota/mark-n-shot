var cl = function (msg) {
	console.log(msg);
}

var _get = function (key) {
	return localStorage[key] || ((typeof _mns_settings.default[key] === 'function') ? _mns_settings.default[key]() : _mns_settings.default[key]);
}