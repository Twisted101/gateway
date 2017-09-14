(function($) {
	var NetSetting = function() {
		var _netSetting = this;
		this.netDataList = ko.observableArray();
		var _pattern = /^\/netSetting\/?$/;

		undfan.routeItem.call(this, {
			htmlUrl: 'template/netSetting.html',
			pattern: _pattern,
			templateId: 'template-netSetting'
		});

		var parseNetSettingData = function(item) {
			var _tmpItem = {};
			_tmpItem.name = ko.observable(item.DeviceName);
			_tmpItem.mac = ko.observable(item.HWAddr);
			_tmpItem.method = ko.observable(item.IpMethod);
			_tmpItem.ip = ko.observable(item.IpAddr).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'ip'
					}
				]
			});
			_tmpItem.netmask = ko.observable(item.NetMask).extend({
				validation: [{
					validate: 'ip'
				}]
			});
			_tmpItem.gateway = ko.observable(item.GateWay).extend({
				validation: [{
					validate: 'ip'
				}]
			});
			_tmpItem.dns = ko.observable(item.DNS).extend({
				validation: [{
					validate: 'ip'
				}]
			});
			_tmpItem.isValide = ko.computed(function() {
				if(_tmpItem.ip.hasError() || _tmpItem.netmask.hasError() ||
					_tmpItem.gateway.hasError() || _tmpItem.dns.hasError()) {
					return false;
				} else {
					return true;
				}
			});
			return _tmpItem;
		}

		this.bind('init', function() {

		});

		var _netSettingApi = new undfan.NetSetting();
		this.bind('show', function(strUrl) {
			this.netDataList.removeAll();
			_netSettingApi.getNetInfo(function(data, textStatus, jqXHR) {
				var that = _netSetting;
				$.each(data, function(index, value) {
					_netSetting.netDataList.push(parseNetSettingData(value));
				});
			}, function() {
				console.log('请求失败')
			});
			undfan.route.changeItem(_netSetting);
		});

		this.bind('afterRender', function() {
			console.log("This is test1 afterRender");
		});

		this.bind('hide', function(strUrl) {
			console.log("This is test1 hide");
		});

		//修改
		this.edit = function(item) {
			_netSetting.editNetSettingModal.show(item);
		}

		this.editNetSettingModal = function() {
			var _editNetSettingModal = {};
			_editNetSettingModal.ipDisabled = ko.observable(true);
			_editNetSettingModal.netmaskDisabled = ko.observable(true);
			_editNetSettingModal.gatewayDisabled = ko.observable(true);
			_editNetSettingModal.dnsDisabled = ko.observable(true);
			_editNetSettingModal.method = ko.observable();
			_editNetSettingModal.netmask = ko.observable().extend({
				validation: [{
					validate: 'ip'
				}]
			});
			_editNetSettingModal.gateway = ko.observable().extend({
				validation: [{
					validate: 'ip'
				}]
			});
			_editNetSettingModal.dns = ko.observable().extend({
				validation: [{
					validate: 'ip'
				}]
			});
			_editNetSettingModal.ip = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'ip'
					}
				]
			});
			_editNetSettingModal.mac = ko.observable();
			_editNetSettingModal.methodChange = function() {
				if(_editNetSettingModal.method() == '0') {
					_editNetSettingModal.ipDisabled(true)
				}
				if(_editNetSettingModal.method() == '1') {
					_editNetSettingModal.ipDisabled(false);
				}
			};
			_editNetSettingModal.edit = null;
			_editNetSettingModal.isValide = ko.computed(function() {
				if(_editNetSettingModal.ip.hasError() || _editNetSettingModal.netmask.hasError() ||
					_editNetSettingModal.gateway.hasError() || _editNetSettingModal.dns.hasError()) {
					return false;
				} else {
					return true;
				}
			});
			_editNetSettingModal.btnOk = function() {
				if(!_editNetSettingModal.isValide()) {
					return;
				}
				_editNetSettingModal.edit.ip(_editNetSettingModal.ip());
				_editNetSettingModal.edit.method(_editNetSettingModal.method());
				_editNetSettingModal.edit.netmask(_editNetSettingModal.netmask());
				_editNetSettingModal.edit.gateway(_editNetSettingModal.gateway());
				_editNetSettingModal.edit.mac(_editNetSettingModal.mac());
				_editNetSettingModal.edit.dns(_editNetSettingModal.dns());
				var _putData = {
					DeviceName: _editNetSettingModal.edit.name(),
					IpAddr: _editNetSettingModal.edit.ip(),
					IpMethod: _editNetSettingModal.edit.method(),
					NetMask: _editNetSettingModal.edit.netmask(),
					GateWay: _editNetSettingModal.edit.gateway(),
					HWAddr: _editNetSettingModal.edit.mac(),
					DNS: _editNetSettingModal.edit.dns()
				};
				_netSettingApi.updateNetInfo(ko.utils.stringifyJson(_putData), function(data, textStatus, jqXHR) {
					//成功
				}, function() {
					//失败
				})
			}
			return {
				show: function(item) {
					_editNetSettingModal.ip(item.ip());
					_editNetSettingModal.method(item.method());
					_editNetSettingModal.netmask(item.netmask());
					_editNetSettingModal.gateway(item.gateway());
					_editNetSettingModal.dns(item.dns());
					_editNetSettingModal.mac(item.mac());
					_editNetSettingModal.edit = item;
					if(_editNetSettingModal.method() == '0') {
						_editNetSettingModal.ipDisabled(true)
					}
					if(_editNetSettingModal.method() == '1') {
						_editNetSettingModal.ipDisabled(false);
					}
					window.undfan.window.showModal({
						viewModel: _editNetSettingModal,
						template: 'template-editNetSetting-modal',
						width: 400
					});
				}
			}
		}();

	}

	//创建该模块
	undfan.netSetting = new NetSetting();

	//把该模块添加到系统中
	undfan.route.add(undfan.netSetting);

}(jQuery));