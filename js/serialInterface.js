(function($) {
	var SerialInterface = function() {
		var _serialInterface = this;
		this.interfaceDataList = ko.observableArray();
		var _pattern = /^\/serialInterface\/?$/;
		undfan.routeItem.call(this, {
			htmlUrl: 'template/serialInterface.html',
			pattern: _pattern,
			templateId: 'template-serialInterface'
		});
		var _serialInterfaceApi = new undfan.Interface();
		var parseSerialInterfaceData = function(item) {
			var _tmpItem = {};
			_tmpItem.interfacetype = ko.observable(item.InterfaceType);
			_tmpItem.interfacename = ko.observable(item.InterfaceName);
			_tmpItem.interfaceId = ko.observable(item.interfaceId);
			_tmpItem.interfacedeviceid = ko.observable(item.InterfaceDeviceId);
			_tmpItem.interfacetimeout = ko.observable(item.InterfaceTimeout);
			_tmpItem.interfacecmdinterval = ko.observable(item.InterfaceCmdInterval);
			_tmpItem.localport = ko.observable(item.LocalPort);
			_tmpItem.remoteip = ko.observable(item.RemoteIP);
			_tmpItem.remoteport = ko.observable(item.RemotePort);
			_tmpItem.interfaceremark = ko.observable(item.InterfaceRemark);
			return _tmpItem;
		}

		this.bind('init', function() {

		});
		this.bind('show', function(strUrl) {
			_serialInterface.interfaceDataList.removeAll();
			_serialInterfaceApi.getInterfaceInfo(function(data, textStatus, jqXHR) {
				$.each(data, function(index, value) {
					_serialInterface.interfaceDataList.push(parseSerialInterfaceData(value));
				});
			}, function() {
				console.log('请求失败')
			});
			undfan.route.changeItem(_serialInterface);
		});

		this.bind('afterRender', function() {

		});

		this.bind('hide', function(strUrl) {

		});

		this.add = function(item) {
			_serialInterface.addSerialInterfaceModal.show();
		}
		this.edit = function(item) {
			_serialInterface.editSerialInterfaceModal.show(item);
		};

		this.delete = function(item) {
			_serialInterface.deleteInterfaceModel.show(item);
		};
		this.addSerialInterfaceModal = function() {
			var _addSIMod = {};
			_addSIMod.interfacetype = ko.observable();
			_addSIMod.interfacedeviceid = ko.observable();
			_addSIMod.interfacename = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 255
					}
				]
			});
			_addSIMod.interfacetimeout = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer',
						min: 100,
						max: 5000
					}
				]
			});
			_addSIMod.interfacecmdinterval = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer',
						min: 10,
						max: 1000
					}
				]
			});
			_addSIMod.localport = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer'
					}
				]
			});
			_addSIMod.remoteip = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'ip'
					}
				]
			});
			_addSIMod.remoteport = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer'
					}
				]
			});
			_addSIMod.interfaceremark = ko.observable('').extend({
				validation: [{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 255
					}
				]
			});
			_addSIMod.isValide = ko.computed(function() {
				if(_addSIMod.interfacetype() == "localSerial") {
					if(_addSIMod.interfacename.hasError() || _addSIMod.interfacecmdinterval.hasError() || _addSIMod.interfacetimeout.hasError() || _addSIMod.interfaceremark.hasError()) {
						return false;
					} else {
						return true;
					}
				}
				if(_addSIMod.interfacetype() == "tcpServerToSerial") {
					if(_addSIMod.localport.hasError() || _addSIMod.interfacename.hasError() || _addSIMod.interfacecmdinterval.hasError() || _addSIMod.interfacetimeout.hasError() || _addSIMod.interfaceremark.hasError()) {
						return false;
					} else {
						return true;
					}
				}
				if(_addSIMod.interfacetype() == "tcpClientToSerial") {
					if(_addSIMod.remoteport.hasError() || _addSIMod.remoteip.hasError() || _addSIMod.interfacename.hasError() || _addSIMod.interfacecmdinterval.hasError() || _addSIMod.interfacetimeout.hasError() || _addSIMod.interfaceremark.hasError()) {
						return false;
					} else {
						return true;
					}
				}
				if(_addSIMod.interfacetype() == "udpToserial") {
					if(_addSIMod.localport.hasError() || _addSIMod.interfacename.hasError() || _addSIMod.interfacecmdinterval.hasError() || _addSIMod.interfacetimeout.hasError() || _addSIMod.interfaceremark.hasError()) {
						return false;
					} else {
						return true;
					}
				}
			});
			_addSIMod.btnOk = function(item) {
				if(!item.isValide.peek()) {
					return;
				}
				var _postData = {};
				_postData.add = [];
				var _tmp = {};
				_tmp.InterfaceName = _addSIMod.interfacename();
				_tmp.InterfaceType = _addSIMod.interfacetype();
				_tmp.InterfaceDeviceId = _addSIMod.interfacedeviceid();
				_tmp.InterfaceTimeout = _addSIMod.interfacetimeout();
				_tmp.InterfaceCmdInterval = _addSIMod.interfacecmdinterval();
				_tmp.LocalPort = _addSIMod.localport();
				_tmp.RemoteIp = _addSIMod.remoteip();
				_tmp.RemotePort = _addSIMod.remoteport();
				_tmp.InterfaceRemark = _addSIMod.interfaceremark();
				_postData.add.push(_tmp);
				var _addData = parseSerialInterfaceData(_postData.add[0]);
				_serialInterface.interfaceDataList.push(_addData);
				//发送请求
				_serialInterfaceApi.addNetSerialPort(ko.utils.stringifyJson(_postData), function(data, textStatus, jqXHR) {

				}, function() {

				});
			};
			return {
				show: function() {
					_addSIMod.interfacetype('netSerial');
					_addSIMod.interfacecmdinterval(100);
					_addSIMod.interfacename("默认接口名称");
					_addSIMod.interfacetimeout(500);
					_addSIMod.interfacetimeout('')
					_addSIMod.localport(0);
					_addSIMod.remoteip("127.0.0.1");
					_addSIMod.remoteport(0);
					_addSIMod.interfaceremark('');
					window.undfan.window.showModal({
						viewModel: _addSIMod,
						template: 'template-addSerialInterface-modal',
						width: 400
					});
				}
			}
		}();

		this.editSerialInterfaceModal = function(item) {
			var _editSIMod = {}; //editSerialInterfaceModal
			_editSIMod.edit = null;
			_editSIMod.interfacetype = ko.observable();
			_editSIMod.interfacename = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 255
					}
				]
			});
			_editSIMod.interfacedeviceid = ko.observable();
			_editSIMod.interfacetimeout = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer',
						min: 100,
						max: 5000
					}
				]
			});
			_editSIMod.interfacecmdinterval = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer',
						min: 10,
						max: 1000
					}
				]
			});
			_editSIMod.localport = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer'
					}
				]
			});
			_editSIMod.remoteip = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'ip'
					}
				]
			});
			_editSIMod.remoteport = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer'
					}
				]
			});
			_editSIMod.interfaceremark = ko.observable().extend({
				validation: [{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 255
					}
				]
			});
			_editSIMod.isValide = ko.computed(function() {
				if(_editSIMod.interfacetype() == "localSerial") {
					if(_editSIMod.interfacename.hasError() || _editSIMod.interfacecmdinterval.hasError() || _editSIMod.interfacetimeout.hasError() || _editSIMod.interfaceremark.hasError()) {
						return false;
					} else {
						return true;
					}
				}
				if(_editSIMod.interfacetype() == "tcpServerToSerial") {
					if(_editSIMod.localport.hasError() || _editSIMod.interfacename.hasError() || _editSIMod.interfacecmdinterval.hasError() || _editSIMod.interfacetimeout.hasError() || _editSIMod.interfaceremark.hasError()) {
						return false;
					} else {
						return true;
					}
				}
				if(_editSIMod.interfacetype() == "tcpClientToSerial") {
					if(_editSIMod.remoteport.hasError() || _editSIMod.remoteip.hasError() || _editSIMod.interfacename.hasError() || _editSIMod.interfacecmdinterval.hasError() || _editSIMod.interfacetimeout.hasError() || _editSIMod.interfaceremark.hasError()) {
						return false;
					} else {
						return true;
					}
				}
				if(_editSIMod.interfacetype() == "udpToserial") {
					if(_editSIMod.localport.hasError() || _editSIMod.interfacename.hasError() || _editSIMod.interfacecmdinterval.hasError() || _editSIMod.interfacetimeout.hasError() || _editSIMod.interfaceremark.hasError()) {
						return false;
					} else {
						return true;
					}
				}
			});
			_editSIMod.btnOk = function(item) {
				if(!item.isValide.peek()) {
					return;
				}
				_editSIMod.edit.interfacetype(_editSIMod.interfacetype());
				_editSIMod.edit.interfacename(_editSIMod.interfacename());
				_editSIMod.edit.interfacedeviceid(_editSIMod.interfacedeviceid());
				_editSIMod.edit.interfacetimeout(_editSIMod.interfacetimeout());
				_editSIMod.edit.interfacecmdinterval(_editSIMod.interfacecmdinterval());
				_editSIMod.edit.localport(_editSIMod.localport());
				_editSIMod.edit.remoteip(_editSIMod.remoteip());
				_editSIMod.edit.remoteport(_editSIMod.remoteport());
				_editSIMod.edit.interfaceremark(_editSIMod.interfaceremark());
				var _putData = {
					InterfaceType: _editSIMod.edit.interfacetype(),
					InterfaceName: _editSIMod.edit.interfacename(),
					InterfaceDeviceId: _editSIMod.edit.interfacedeviceid(),
					InterfaceTimeout: _editSIMod.edit.interfacetimeout(),
					InterfaceTimeout: _editSIMod.edit.interfacecmdinterval(),
					LocalPort: _editSIMod.edit.localport(),
					RemoteIP: _editSIMod.edit.remoteip(),
					RemotePort: _editSIMod.edit.remoteport(),
					InterfaceRemark: _editSIMod.edit.interfaceremark()
				}
				_serialInterfaceApi.updateLocalSerialPort(ko.utils.stringifyJson(_putData), function(data, textStatus, jqXHR) {
					//成功
				}, function() {
					//失败
				})
			}
			return {
				show: function(item) {
					_editSIMod.interfacetype(item.interfacetype());
					_editSIMod.interfacename(item.interfacename());
					_editSIMod.interfacedeviceid(item.interfacedeviceid());
					_editSIMod.interfacetimeout(item.interfacetimeout());
					_editSIMod.interfacecmdinterval(item.interfacecmdinterval());
					_editSIMod.localport(item.localport());
					_editSIMod.remoteip(item.remoteip());
					_editSIMod.remoteport(item.remoteport());
					_editSIMod.interfaceremark(item.interfaceremark());
					_editSIMod.edit = item;
					window.undfan.window.showModal({
						viewModel: _editSIMod,
						template: 'template-editSerialInterface-modal',
						width: 400
					});
				}
			}

			function editBtnOk(option) {
				_editSIMod.edit.option(_editSIMod.option());
			}
		}();
		this.deleteInterfaceModel = function() {
			var _deleteSIMod = {};
			_deleteSIMod.deleteName = ko.observable();
			_deleteSIMod.btnOk = function() {
				var _deleteData = [];
				_deleteData.push({
					InterfaceId: _deleteSIMod.interfacedeviceid
				});
				$.each(_serialInterface.interfaceDataList(), function(index, value) {
					if(_deleteSIMod.interfacedeviceid == value.interfacedeviceid()) {
						_serialInterface.interfaceDataList.remove(value);
						return false;
					}
				});
			}
			return {
				show: function(item) {
					_deleteSIMod.interfacedeviceid = item.interfacedeviceid();
					_deleteSIMod.interfacename = item.interfacename();
					window.undfan.window.showModal({
						viewModel: _deleteSIMod,
						template: 'template-deleteSerialInterface-modal',
						width: 400
					});
				}
			}
		}();
	}
	//创建该模块
	undfan.serialInterface = new SerialInterface();
	//把该模块添加到系统中
	undfan.route.add(undfan.serialInterface);
}(jQuery));