(function($) {
	var SerialSetting = function() {
		var _serialSetting = this;
		this.serialDataList = ko.observableArray();
		var _pattern = /^\/SerialSetting\/?$/;
		undfan.routeItem.call(this, {
			htmlUrl: 'template/SerialSetting.html',
			pattern: _pattern,
			templateId: 'template-SerialSetting'
		});

		var parseSerialSettingData = function(item) {
			var _tmpItem = {};
			_tmpItem.name = ko.observable(item.Name);
			_tmpItem.baudrate = ko.observable(item.BaudRate);
			_tmpItem.evenoddcheck = ko.observable(item.EvenOddCheck);
			_tmpItem.databit = ko.observable(item.DataBit);
			_tmpItem.stopbit = ko.observable(item.StopBit);
			_tmpItem.Id = ko.observable(item.Id);
			return _tmpItem;
		}

		var _serialSettingApi = new undfan.SerialSetting();
		this.bind('init', function() {
			console.log("test2 init");
		});

		this.bind('show', function(strUrl) {
			this.serialDataList.removeAll();
			_serialSettingApi.getSerialInfo(function(data, textStatus, jqXHR) {
				$.each(data, function(index, value) {
					_serialSetting.serialDataList.push(parseSerialSettingData(value));
				});
			}, function() {
				console.log('请求失败')
			});
			undfan.route.changeItem(_serialSetting);
		});

//		this.bind('afterRender', function() {
//			console.log("_serialSetting afterRender");
//		});
//
//		this.bind('hide', function(strUrl) {
//			console.log("_serialSetting hide");
//		});

		this.edit = function(item) {
			_serialSetting.editSerialSettingModal.show(item);
		};
		this.editSerialSettingModal = function() {
			var _editSerialSettingModal = {};
			_editSerialSettingModal.name = ko.observable();
			_editSerialSettingModal.baudrate = ko.observable();
			_editSerialSettingModal.evenoddcheck = ko.observable();
			_editSerialSettingModal.databit = ko.observable();
			_editSerialSettingModal.stopbit = ko.observable();
			_editSerialSettingModal.edit = null;
			_editSerialSettingModal.btnOk = function() {
				_editSerialSettingModal.edit.baudrate(_editSerialSettingModal.baudrate());
				_editSerialSettingModal.edit.evenoddcheck(_editSerialSettingModal.evenoddcheck());
				_editSerialSettingModal.edit.databit(_editSerialSettingModal.databit());
				_editSerialSettingModal.edit.stopbit(_editSerialSettingModal.stopbit());
				var _putData = {
					BaudRate: _editSerialSettingModal.edit.baudrate(),
					EvenOddCheck: _editSerialSettingModal.edit.evenoddcheck(),
					DataBit: _editSerialSettingModal.edit.databit(),
					StopBit: _editSerialSettingModal.edit.stopbit(),
					"Id": _editSerialSettingModal.edit.stopbit()
				};
				_serialSettingApi.updateSerialInfo(ko.utils.stringifyJson(_putData), function(data, textStatus, jqXHR) {
					//成功
				}, function() {
					//失败
				})
			}
			return {
				show: function(item) {
					_editSerialSettingModal.name(item.name());
					_editSerialSettingModal.baudrate(item.baudrate());
					_editSerialSettingModal.evenoddcheck(item.evenoddcheck());
					_editSerialSettingModal.databit(item.databit());
					_editSerialSettingModal.stopbit(item.stopbit());
					_editSerialSettingModal.edit = item;
					window.undfan.window.showModal({
						viewModel: _editSerialSettingModal,
						template: 'template-editSerialSetting-modal',
						width: 400
					});
				}
			}
		}();
	}

	//创建该模块
	undfan.serialSetting = new SerialSetting();

	//把该模块添加到系统中
	undfan.route.add(undfan.serialSetting);

}(jQuery));