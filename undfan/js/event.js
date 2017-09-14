(function($) {
	if(!window.undfan) {
		window.undfan = {};
	}
	var _undfan = window.undfan;

	_undfan.event = function(options) {
		var _events = {};

		var _event_self = this;

		this.bind = function(eventName, callback) {
			var _callbackArray = _events[eventName] = _events[eventName] || [];

			if(_callbackArray.indexOf(callback) == -1) {
				_callbackArray.push(callback);
			}
		}

		this.unbind = function(eventName, callback) {
			var _callbackArray = _events[eventName] || [],
				_index = 0;

			_index = _callbackArray.indexOf(callback);
			if(_index >= 0) {
				_callbackArray.splice(_index, 1);
				if(_callbackArray.length === 0) {
					delete _events[eventName];
				}
			}
		}

		this.trigger = function(eventName, scope, data) {
			var _callbackArray = _events[eventName] || [],
				_i = 0,
				_j = 0;

			for(_j = _callbackArray.length; _i < _j; _i++) {
				_callbackArray[_i].call(scope, data);
			}
		}

		$.each(options, function(key, value) {
			if($.isFunction(value)) {
				_event_self.bind(key, value);
			}
		});
	}
}(jQuery));