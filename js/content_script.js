var cl = function(msg) {
	console.log(msg);
};

var _mns = (function() {

	var port = chrome.runtime.connect({"name": "mns"}),

		listen = function() {
			port.onMessage.addListener(function(request) {
				if (request.action === 'start') {
					start();
				};
			});
		},

		data = {
			"inserted": false
		},

		init = function() {
			data.action = _get('action'),
			data.$container = $("<div id='mns-container'></div>").
				css({
					"position": 'absolute',
					"backgroundColor": '#' + _get('color'),
					"opacity": _get('opacity')
				})
				.draggable()
				.resizable({
					"animate": true,
					"ghost": true,
				});
		};

		bindEvents = function() {
			data.$container.on("dblclick", function() {
				port.postMessage({"action": data.action});
			});
		},

		inserted = function() {
			return !!$('body #mns-container').length;
		},

		insert = function() {
			$('body').prepend(data.$container);
			data.inserted = true;
		},

		start = function() {
			if (!data.inserted) {
				init();
				bindEvents();
				insert();
			}
		};

	// Public Endpoints
	return {
		"listen": listen
	};

})();

_mns.listen();
