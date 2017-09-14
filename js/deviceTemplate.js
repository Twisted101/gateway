(function($) {
	var DeviceTemplate = function() {
		var _deviceTemplate = this;
		this.deviceTemplateList = ko.observableArray(); //设备模板豆腐块的list
		this.deviceNameList = ko.observableArray([{
			"deviceNameValue": "型号value1",
			"show": "型号text1"
		}, {
			"deviceNameValue": "型号value2",
			"show": "型号text2"
		}, {
			"deviceNameValue": "型号value3",
			"show": "型号text3"
		}]); //设备型号的list
		var _pattern = /^\/deviceTemplate\/?$/;

		undfan.routeItem.call(this, {
			htmlUrl: 'template/deviceTemplate.html',
			pattern: _pattern,
			templateId: 'template-deviceTemplate'
		});

		var parseDeviceTemplateData = function(item) {
			var _tmpItem = {};
			_tmpItem.name = ko.observable(item.Name);
			_tmpItem.deviceCode = ko.observable(item.DeviceCode);
			_tmpItem.deviceType = ko.observable(item.DeviceType);
			_tmpItem.devicename = ko.observable(item.DeviceName);
			_tmpItem.remark = ko.observable(item.Remark);
			_tmpItem.id = ko.observable(item.Id);
			return _tmpItem;
		}
		var _deviceTemplateApi = new undfan.DeviceTemplate();
		var _serialSettingApi = new undfan.SerialSetting();
		this.bind('init', function() {

		});

		this.bind('show', function(strUrl) {
			this.deviceTemplateList.removeAll();
			_deviceTemplateApi.getTemplateList(function(data, textStatus, jqXHR) {
				$.each(data, function(index, value) {
					_deviceTemplate.deviceTemplateList.push(parseDeviceTemplateData(value));
				});
			}, function() {

			});
			//获取设备类型list的接口未知
			//			this.deviceNameList.removeAll();
			//			_deviceTemplateApi.getTemplateList(function(data, textStatus, jqXHR) {
			//				$.each(data, function(index, value) {
			//					_deviceTemplate.deviceTemplateList.push(parseDeviceTemplateData(value));
			//				});
			//			}, function() {
			//
			//			});
			undfan.route.changeItem(_deviceTemplate);
		});

		this.bind('afterRender', function() {

		});

		this.bind('hide', function(strUrl) {

		});

		this.add = function() {
			_deviceTemplate.addDeviceTemplateModal.show();
		};
		this.jump = function(item) {
			console.log(item);
			undfan.undfanNavigateView();
		};
		this.edit = function(item) {
			_deviceTemplate.editDeviceTemplateModal.show(item);
		};
		this.remove = function(item) {
			_deviceTemplate.deleteDeviceTemplateModal.show(item);
		};
		this.addDeviceTemplateModal = function(item) {
			var _addDTMol = {};
			_addDTMol.name = ko.observable().extend({
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
			_addDTMol.devicename = ko.observable();
			_addDTMol.remark = ko.observable().extend({
				validation: [{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 255
					}
				]
			});
			_addDTMol.isValide = ko.computed(function() {
				if(_addDTMol.name.hasError() || _addDTMol.remark.hasError()) {
					return false;
				} else {
					return true;
				}
			});
			_addDTMol.btnOk = function(item) {
				if(!item.isValide.peek()) {
					return;
				}
				var _postData = {};
				_postData.add = [];
				var _tmp = {};
				_tmp.Name = _addDTMol.name();
				_tmp.DeviceName = _addDTMol.devicename();
				_tmp.Remark = _addDTMol.remark();
				_postData.add.push(_tmp);
				var _addData = parseDeviceTemplateData(_postData.add[0]);
				_deviceTemplate.deviceTemplateList.push(_addData);
			};
			return {
				show: function() {
					_addDTMol.name('');
					_addDTMol.devicename('');
					_addDTMol.remark('');
					window.undfan.window.showModal({
						viewModel: _addDTMol,
						template: 'template-addDeviceTemplate-modal',
						width: 400
					});
				}
			}
		}();
		this.editDeviceTemplateModal = function(item) {
			var _editDTMol = {};
			_editDTMol.name = ko.observable().extend({
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
			_editDTMol.devicename = ko.observable();
			_editDTMol.remark = ko.observable().extend({
				validation: [{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 255
					}
				]
			});
			_editDTMol.id = ko.observable();
			_editDTMol.isValide = ko.computed(function() {
				if(_editDTMol.name.hasError() || _editDTMol.remark.hasError()) {
					return false;
				} else {
					return true;
				}
			});
			_editDTMol.btnOk = function(item) {
				if(!item.isValide.peek()) {
					return;
				}
				_editDTMol.edit.name(_editDTMol.name());
				_editDTMol.edit.devicename(_editDTMol.devicename());
				_editDTMol.edit.remark(_editDTMol.remark());
				var _putData = {
					Name: _editDTMol.edit.name(),
					DeviceName: _editDTMol.edit.devicename(),
					Remark: _editDTMol.edit.remark(),
					"Id": _editDTMol.edit.id()
				};
				_serialSettingApi.updateSerialInfo(ko.utils.stringifyJson(_putData), function(data, textStatus, jqXHR) {
					//成功
				}, function() {
					//失败
				})
			};
			return {
				show: function(item) {
					_editDTMol.name(item.name());
					_editDTMol.devicename(item.devicename());
					_editDTMol.remark(item.remark());
					_editDTMol.id(item.id());
					_editDTMol.edit = item;
					window.undfan.window.showModal({
						viewModel: _editDTMol,
						template: 'template-editDeviceTemplate-modal',
						width: 400
					});
				}
			}
		}();
		this.deleteDeviceTemplateModal = function() {
			var _deleteDTMod = {};
			_deleteDTMod.deleteName = ko.observable();
			_deleteDTMod.btnOk = function() {
				//发送的数据
				var _deleteData = [];
				_deleteData.push({
					Id: _deleteDTMod.Id
				});
				$.each(_deviceTemplate.deviceTemplateList(), function(index, value) {
					console.log(_deviceTemplate.deviceTemplateList)
					_deviceTemplate.deviceTemplateList.remove(value);
					return false;
				});
			};
			return {
				show: function(item) {
					_deleteDTMod.Id = item.id();
					window.undfan.window.showModal({
						viewModel: _deleteDTMod,
						template: 'template-deleteDeviceTemplate-modal',
						width: 400
					});
				}
			}
		}();
	}

	//创建该模块
	undfan.deviceTemplate = new DeviceTemplate();

	//把该模块添加到系统中
	undfan.route.add(undfan.deviceTemplate);

}(jQuery));