(function($) {
	var SystemTools = function() {
		var _systemTools = this;

		var _pattern = /^\/systemTools\/?$/;

		undfan.routeItem.call(this, {
			htmlUrl: 'template/systemTools.html',
			pattern: _pattern,
			templateId: 'template-systemTools'
		});

		this.bind('init', function() {

		});

		this.bind('show', function(strUrl) {
			undfan.route.changeItem(_systemTools);
		});

		this.bind('afterRender', function() {

		});

		this.importJS = function() {
			var restartSGsrc = document.createElement("script");
			restartSGsrc.setAttribute('src', 'js/restartSG.js');
			document.body.appendChild(restartSGsrc);
			//			window.undfan.window.showModal({
			//				viewModel: _editTVMod,
			//				template: 'systemTools-restartSG',
			//				width: 400
			//			});
		}

		this.goToiframe = function() {
			var _data_iframe = arguments[1].currentTarget.getAttribute("data-iframe");
			if(_data_iframe === '' || _data_iframe === null) {
				return;
			}
			var iframeSrc = './systemTools/' + _data_iframe + '/' + _data_iframe + '.html';
			$('#iframeDom').css('visibility', 'initial');
			iframeDom.setAttribute('src', iframeSrc);
		}

		this.bind('hide', function(strUrl) {

		});

	}

	//创建该模块
	undfan.systemTools = new SystemTools();

	//把该模块添加到系统中
	undfan.route.add(undfan.systemTools);

}(jQuery));