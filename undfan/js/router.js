(function($) {
	if(!window.undfan) {
		window.undfan = {};
	}
	var _undfan = window.undfan;
	_undfan.routeItem = function(options) {
		var _options = {};

		var _routeItem = this;

		//指示是否已经初始化
		var _inited = false;
		var _initSuccess = false;

		_undfan.event.call(this, options);

		if(options.htmlUrl) {
			_options.htmlUrl = options.htmlUrl;
		} else {
			_options.htmlUrl = '';
		}

		if(options.templateId) {
			_options.templateId = options.templateId;
		} else {
			_options.templateId = '';
		}

		if(options.pattern) {
			_options.pattern = options.pattern;
		} else {
			_options.pattern = '';
		}

		function _loadHtml(strUrl, fn, scope, param) {
			_inited = true;
			$.ajax({
				url: strUrl,
				dataType: "html",
				cache: true,
				async: false
			}).done(function(data, textStatus, jqXHR) {
				$('body').append(data);

				_routeItem.trigger('init', _routeItem);
				_initSuccess = true;
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("不能加载" + strUrl + "文件");
				_initSuccess = false;
			}).always(function(data, textStatus, errorThrown) {
				if(fn && $.isFunction(fn)) {
					fn.call(scope, param);
				}
			});
		}

		this.setHtmlUrl = function(strHtmlUrl) {
			_options.htmlUrl = strHtmlUrl;
		}

		this.getHtmlUrl = function() {
			return _options.htmlUrl || '';
		}

		this.setPattern = function(pattern) {
			_options.pattern = pattern;
		}

		this.getPattern = function() {
			return _options.pattern;
		}

		this.setTemplate = function(strTemplateId) {
			_options.templateId = strTemplateId;
		}

		this.getTemplate = function() {
			return _options.templateId;
		}

		this.match = function(strUrl) {
			if(!_options.pattern) {
				return false;
			}

			return _options.pattern.test(strUrl);
		}

		this.load = function(fn, scope, param) {
			if(_inited) {
				return _initSuccess;
			}

			_loadHtml(_options.htmlUrl, fn, scope, param);
			return false;
		}

		this.bind('show', function(strUrl) {
			console.log("show " + strUrl);
		});

		this.bind('hide', function(strUrl) {
			console.log("before hide, and New Url : " + strUrl);
		});
	}

	var route = function() {
		var _listRouteItem = [];

		var _route = this;

		this.curTemplate = ko.observable('');
		this.curRouteItem = null;

		this.add = function(objRouteItem) {
			
			_listRouteItem.push(objRouteItem);
		}

		this.load = function(strUrl) {
			if('#' == strUrl.charAt(0)) {
				strUrl = strUrl.substr(1);
			}
			for(var i = 0; i < _listRouteItem.length; i++) {
				var _tmpItem = _listRouteItem[i];

				if(!_tmpItem) {
					continue;
				}

				if(_tmpItem.match(strUrl)) {
					if(!_tmpItem.load(_route.load, _route, strUrl)) {
						break;
					}

					_tmpItem.trigger('show', _tmpItem, strUrl);
					break;
				}
			};
		}

		this.changeItem = function(newItem) {
			if(newItem == _route.curRouteItem) {
				return;
			}
			if(null != _route.curRouteItem) {
				_route.curRouteItem.trigger('hide', _route.curRouteItem, newItem.getHtmlUrl());
			}
			_route.curRouteItem = newItem;
			_route.curTemplate(newItem.getTemplate());
		}

		this.afterRender = function(element) {
			console.log("afterRender");
			if(null != _route.curRouteItem) {
				_route.curRouteItem.trigger('afterRender', _route.curRouteItem, element);
			}

			$(window).resize();
		}
	}

	_undfan.route = new route();
}($));