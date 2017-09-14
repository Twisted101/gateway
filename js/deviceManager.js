(function($) {
	var DeviceManager = function() {
		var _deviceManager = this;
		var _deviceApi = new undfan.Device();
		var _pattern = /^\/deviceManager\/?$/;

		undfan.routeItem.call(this, {
			htmlUrl: 'template/deviceManager.html',
			pattern: _pattern,
			templateId: 'template-deviceManager'
		});

		this.onlineSelected = ko.observable(false);
		this.outlineSelected = ko.observable(false);
		this.allSelected = ko.observable(true);

		var parseData_back = function(item) {
			var _tmp = {}
			_tmp.Id = item.Id();
			_tmp.InterfaceId = item.InterfaceId();
			_tmp.InterfaceName = item.InterfaceName();
			_tmp.MeterNumber = item.MeterNumber();
			_tmp.Name = item.Name();
			_tmp.Period = item.Period();
			_tmp.Timeout = item.Timeout();
			_tmp.TemplateId = item.TemplateId();
			_tmp.TemplateName = item.TemplateName();
			_tmp.InstallAddress = item.InstallAddress();
			_tmp.Remark = item.Remark();
			return _tmp;
		}
		var editVariantData_back = function(item, data) {
			item.Id(data.Id);
			item.InterfaceId(data.InterfaceId);
			item.InterfaceName(data.InterfaceName);
			item.MeterNumber(data.MeterNumber);
			item.Name(data.Name);
			item.Period(data.Period);
			item.Timeout(data.Timeout);
			item.TemplateId(data.TemplateId);
			item.TemplateName(data.TemplateName);
			item.InstallAddress(data.InstallAddress);
			item.Remark(data.Remark);
		}
		//ko过滤
		var observaData_deviceMeter = function(value) {
			var _tmpItem = {};
			_tmpItem.nowIndex = value.index;
			_tmpItem.Id = ko.observable(value.Id);
			_tmpItem.InterfaceId = ko.observable(value.InterfaceId);
			_tmpItem.InterfaceName = ko.observable(value.InterfaceName);
			_tmpItem.MeterNumber = ko.observable(value.MeterNumber).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_tmpItem.Name = ko.observable(value.Name).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'charnumscore'
				}, {
					validate: 'strlen',
					max: 64
				}]
			});
			_tmpItem.Period = ko.observable(value.Period).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer',
					min: 60,
					max: 3600
				}]
			});
			_tmpItem.Timeout = ko.observable(value.Timeout).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer',
					min: 300,
					max: 7200
				}]
			});
			_tmpItem.TemplateId = ko.observable(value.TemplateId);
			_tmpItem.TemplateName = ko.observable(value.TemplateName);
			_tmpItem.InstallAddress = ko.observable(value.InstallAddress).extend({
				validation: [{
					validate: 'charnumscore'
				}, {
					validate: 'strlen',
					max: 64
				}]
			});
			_tmpItem.Remark = ko.observable(value.Remark).extend({
				validation: [{
					validate: 'charnumscore'
				}, {
					validate: 'strlen',
					max: 255
				}]
			});
			_tmpItem.isValide = ko.computed(function() {
				if(_tmpItem.MeterNumber.hasError() || _tmpItem.Name.hasError() ||
					_tmpItem.Period.hasError() || _tmpItem.Timeout.hasError() ||
					_tmpItem.InstallAddress.hasError() || _tmpItem.Remark.hasError()) {
					return false;
				} else {
					return true;
				}
			});
			_tmpItem.isSelected = ko.observable(false);
			_tmpItem.statu = ko.observable(value.statu);
			_tmpItem.children = ko.observableArray();
			return _tmpItem;
		}
		this.bind('init', function() {

		});
		
		//表格在线筛选功能，传递给后台的参数
		this.bOnlineShow = ko.observable("全部");
		this.bOnlineParam = ko.observable("all");
		this.bind('show', function(strUrl) {
			undfan.route.changeItem(_deviceManager);

			window.paginationParam = function(params) {
				console.log(params)
				var tmp = {
					bOnline:_deviceManager.bOnlineParam(),
					limit:params.limit,
					offset:params.Offset,
					order:params.order
				};
				console.log(tmp)
				return tmp;
			};

			window.mergeName = function(value, row, index) {
				var nameStatu;
				if(row.bOnline == true) {
					var nameStatu = row.Name + "<span style='color:green'>(在线)</span>"
				};
				if(row.bOnline == false) {
					var nameStatu = row.Name + "<span style='color:red'>(离线)</span>"
				}
				return nameStatu;
			};

			window.operateEvents = {
				'click .check-device': function(e, value, row, index) {
					console.log(e)
					console.log(value)
					console.log(row)
					console.log(index)
					var _undfan_href = '#/deviceVariantData/Id/' + row.Id + '/TemplateId/' + row.TemplateId;
					console.log(_undfan_href)
					if(null === _undfan_href || "" === _undfan_href) {
						return;
					}
					if('#' == _undfan_href.charAt(0)) {
						_undfan_href = _undfan_href.substr(1);
					}
					undfan.route.load(_undfan_href);
				},
			};
			$('#devicemanagertable').bootstrapTable();

			if(undfan.serialSetting.serialDataList() && undfan.serialSetting.serialDataList().length == 0) {
				//之前没有获取串口数据   获取数据
			};
			if(undfan.deviceTemplate.deviceTemplateList() && undfan.deviceTemplate.deviceTemplateList().length == 0) {
				//之前没有获取设备模板数据   获取数据
			};
		});
		//选择在线设备
		this.chooseOnline = function(item) {
			_deviceManager.onlineSelected(true);
			_deviceManager.outlineSelected(false);
			_deviceManager.allSelected(false);
			_deviceManager.bOnlineParam('online');
			_deviceManager.bOnlineShow('在线');
			$('#devicemanagertable').bootstrapTable('refresh');
		};
		//选择离线设备
		this.chooseOutline = function(item) {
			_deviceManager.onlineSelected(false);
			_deviceManager.outlineSelected(true);
			_deviceManager.allSelected(false);
			_deviceManager.bOnlineParam('outline');
			_deviceManager.bOnlineShow('离线');
			$('#devicemanagertable').bootstrapTable('refresh');
		};
		//选择全部设备
		this.chooseAll = function(item) {
			_deviceManager.onlineSelected(false);
			_deviceManager.outlineSelected(false);
			_deviceManager.allSelected(true);
			_deviceManager.bOnlineParam('all');
			_deviceManager.bOnlineShow('全部');
			$('#devicemanagertable').bootstrapTable('refresh');
		};

		this.bind('afterRender', function() {

		});

		this.bind('hide', function(strUrl) {

		});

		this.addDeviceManager = function() {
			_deviceManager.addDeviceManagerModal.show();
		};

		this.addDeviceManagerModal = function() {
			var _addDMMod = {};
			_addDMMod.title = '添加设备';
			_addDMMod.InterfaceId = ko.observable();
			_addDMMod.MeterNumber = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer'
					}
				]
			});
			_addDMMod.Name = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 64
					}
				]
			});
			_addDMMod.Period = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer',
						min: 60,
						max: 3600
					}
				]
			});
			_addDMMod.Timeout = ko.observable().extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer',
						min: 300,
						max: 7200
					}
				]
			});
			_addDMMod.TemplateId = ko.observable();
			_addDMMod.InstallAddress = ko.observable().extend({
				validation: [{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 64
					}
				]
			});
			_addDMMod.Remark = ko.observable().extend({
				validation: [{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 255
					}
				]
			});
			_addDMMod.isValide = ko.computed(function() {
				if(_addDMMod.MeterNumber.hasError() || _addDMMod.Name.hasError() ||
					_addDMMod.Period.hasError() || _addDMMod.Timeout.hasError() ||
					_addDMMod.InstallAddress.hasError() || _addDMMod.Remark.hasError()) {
					return false;
				} else {
					return true;
				}
			});
			_addDMMod.btnOk = function() {
				if(!_addDMMod.isValide()) {
					return;
				}
				//检查当前输入的表号是否已经在当前接口中存在
				//...
				//根据interfaceId获得interfaceName
				var _interfaceName = '';
				//				$.each(undfan.deviceManager.interfaceList(), function(index, value) {
				//					if(value.interfaceId() == _addDMMod.InterfaceId()) {
				//						_interfaceName = value.interfaceName();
				//						return false;
				//					}
				//				});
				//根据templateId获得templateName
				var _templateName = '';
				//				$.each(undfan.deviceManager.deviceTemplateList(), function(index, value) {
				//					if(value.id() == _addDMMod.TemplateId()) {
				//						_templateName = value.Name();
				//						return false;
				//					}
				//				});
				var _addData = {};
				var _addDataList = [];
				var _tmp = {};
				_tmp.InterfaceId = _addDMMod.InterfaceId();
				_tmp.InterfaceName = _interfaceName;
				_tmp.TemplateId = _addDMMod.TemplateId();
				_tmp.TemplateName = _templateName;
				_tmp.Name = _addDMMod.Name();
				_tmp.MeterNumber = _addDMMod.MeterNumber();
				_tmp.Period = _addDMMod.Period();
				_tmp.Timeout = _addDMMod.Timeout();
				_tmp.InstallAddress = _addDMMod.InstallAddress();
				_tmp.Remark = _addDMMod.Remark();
				_addDataList.push(_tmp);
				_addData.add = _addDataList;

				$('#devicemanagertable').bootstrapTable('append', _addDataList);
				_deviceApi.addDevice(ko.utils.stringifyJson(_addData), function(data, textStatus, jqXHR) {
					//将数据添加到view的数据源中
					//step 1 ：将数据加到总的设备列表数据源中
					//  				var tmp = SG.observaData_deviceMeter(_tmp);
					data = $.parseJSON(data);
					var tmp = SG.observaData_deviceMeter(data.add[0]);
					SG.deviceMeterList.push(tmp);
					//step 2: 将数据加到当前所处的页面中,
					//如果当前页面不是所添加设备的对应的接口页面，则不需要添加
					if(0 == _DeviceManager.interfaceId) {
						_DeviceManager.meterDeviceList.push(tmp);
					} else if(_DeviceManager.interfaceId == _tmp.InterfaceId) {
						_DeviceManager.meterDeviceList.push(tmp);
					}

				}, function() {
					toastr.warning('添加 [' + _addDeviceModalView.Name() + ']设备失败', '提示信息：', {
						timeOut: 5000,
						closeButton: true,
						progressBar: true
					});
				});
			}
			return {
				show: function() {
					_addDMMod.Name('默认设备名称');
					_addDMMod.MeterNumber(0);
					_addDMMod.InterfaceId(0);
					_addDMMod.TemplateId(0);
					_addDMMod.Period(300);
					_addDMMod.Timeout(900);
					_addDMMod.InstallAddress('');
					_addDMMod.Remark('');

					window.undfan.window.showModal({
						viewModel: _addDMMod,
						template: 'template-addDeviceManager-modal',
						width: 400
					});
				}
			}
		}();
		var _editData = [];
		this.editDeviceManager = function() {
			_editData = [];
			var _formData = $('#devicemanagertable').bootstrapTable('getSelections'); //得到选择行的数据的数组
			for(var i = 0; i < _formData.length; i++) {
				var parsedata = observaData_deviceMeter(_formData[i])
				_editData.push(parsedata);
			}
			if(_editData.length == 0) {
				alert('请选择要bianji的项');
				return;
			}
			_deviceManager.editDeviceManagerModal.show();
		};
		this.editDeviceManagerModal = function() {
			var _editDMMod = {};
			_editDMMod.title = '编辑设备';
			_editDMMod.remind = ko.observable('');
			_editDMMod.isEditOne = ko.observable(false);
			_editDMMod.isEditOne_DataBack = null;
			_editDMMod.editItem = null;
			_editDMMod.multipleEditPeriod = ko.observable(100).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer',
						min: 60,
						max: 3600
					}
				]
			});
			_editDMMod.multipleEditTimeout = ko.observable(100).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer',
						min: 300,
						max: 7200
					}
				]
			});
			_editDMMod.multipleEditInstallAddress = ko.observable('').extend({
				validation: [{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 64
					}
				]
			});
			_editDMMod.multipleEditRemark = ko.observable('').extend({
				validation: [{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 255
					}
				]
			});
			_editDMMod.isMultipleEditPeriod = ko.observable(false);
			_editDMMod.isMultipleEditTimeout = ko.observable(false);
			_editDMMod.isMultipleEditInstallAddress = ko.observable(false);
			_editDMMod.isMultipleEditRemark = ko.observable(false);
			_editDMMod.isValide = null;
			_editDMMod.btnOk = function() {
				if(!_editDMMod.isValide()) {
					return;
				}
				var _dataList = [];
				//单向编辑
				if(_editDMMod.isEditOne()) {
					var _tmp = {};
					var _hasChange = false;
					_tmp.nowIndex = _editDMMod.editItem.nowIndex;
					if(_editDMMod.isEditOne_DataBack.Name != _editDMMod.editItem.Name()) {
						_hasChange = true;
						_tmp.Name = _editDMMod.editItem.Name();
					}
					if(_editDMMod.isEditOne_DataBack.MeterNumber != _editDMMod.editItem.MeterNumber()) {
						_hasChange = true;
						_tmp.MeterNumber = _editDMMod.editItem.MeterNumber();
					}
					if(_editDMMod.isEditOne_DataBack.InterfaceId != _editDMMod.editItem.InterfaceId()) {
						_hasChange = true;
						_tmp.InterfaceId = _editDMMod.editItem.InterfaceId();
					}
					if(_editDMMod.isEditOne_DataBack.TemplateId != _editDMMod.editItem.TemplateId()) {
						_hasChange = true;
						_tmp.TemplateId = _editDMMod.editItem.TemplateId();
					}
					if(_editDMMod.isEditOne_DataBack.Period != _editDMMod.editItem.Period()) {
						_hasChange = true;
						_tmp.Period = _editDMMod.editItem.Period();
					}
					if(_editDMMod.isEditOne_DataBack.Timeout != _editDMMod.editItem.Timeout()) {
						_hasChange = true;
						_tmp.Timeout = _editDMMod.editItem.Timeout();
					}
					if(_editDMMod.isEditOne_DataBack.InstallAddress != _editDMMod.editItem.InstallAddress()) {
						_hasChange = true;
						_tmp.InstallAddress = _editDMMod.editItem.InstallAddress();
					}
					if(_editDMMod.isEditOne_DataBack.Remark != _editDMMod.editItem.Remark()) {
						_hasChange = true;
						_tmp.Remark = _editDMMod.editItem.Remark();
					}
					if(!_hasChange) {
						//没有数据要更新，直接返回
						return;
					}
					_tmp.Id = _editDMMod.editItem.Id();
					_dataList.push(_tmp);
				} else {
					//多项编辑
					var _hasChanged = false;
					var _tmpChangedProperty = {};
					if(_editDMMod.isMultipleEditPeriod()) {
						_hasChange = true;
						_tmpChangedProperty.Period = _editDMMod.multipleEditPeriod();
					}
					if(_editDMMod.isMultipleEditTimeout()) {
						_hasChange = true;
						_tmpChangedProperty.TimeOut = _editDMMod.multipleEditTimeout();
					}
					if(_editDMMod.isMultipleEditInstallAddress()) {
						_hasChange = true;
						_tmpChangedProperty.InstallAddress = _editDMMod.multipleEditInstallAddress();
					}
					if(_editDMMod.isMultipleEditRemark()) {
						_hasChange = true;
						_tmpChangedProperty.Remark = _editDMMod.multipleEditRemark();
					}
					if(_hasChange) {
						for(var i = 0; i < _editData.length; i++) {
							var _tmpData = {};
							_tmpData.nowIndex = _editData[i].nowIndex;
							if(_tmpChangedProperty.hasOwnProperty('Period')) {
								_tmpData.Period = _tmpChangedProperty.Period;
							}
							if(_tmpChangedProperty.hasOwnProperty('TimeOut')) {
								_tmpData.Timeout = _tmpChangedProperty.TimeOut;
							}
							if(_tmpChangedProperty.hasOwnProperty('InstallAddress')) {
								_tmpData.InstallAddress = _tmpChangedProperty.InstallAddress;
							}
							if(_tmpChangedProperty.hasOwnProperty('Remark')) {
								_tmpData.Remark = _tmpChangedProperty.Remark;
							}
							_tmpData.Id = _editData[i].Id();
							_dataList.push(_tmpData);
						}
					} else {
						//没有数据要更新，直接返回
						return;
					}
				}
				//前端更新表格数据
				for(var i = 0; i < _dataList.length; i++) {
					console.log(_dataList[i])
					$('#devicemanagertable').bootstrapTable('updateRow', {
						index: _dataList[i].nowIndex,
						row: _dataList[i]
					});
				}
				//发送请求更新数据库
				var _updateData = {};
				_updateData.update = _dataList;
				_deviceApi.updateDevice(ko.utils.stringifyJson(_updateData), function(data, textStatus, jqXHR) {
					//将view数据源中对应的数据更新
					$.each(_dataList, function(index, value) {
						//更新设备列表总的数据源
						for(var i = 0; i < SG.deviceMeterList().length; i++) {
							if(value.Id == SG.deviceMeterList()[i].Id()) {
								if(value.hasOwnProperty('Name')) {
									SG.deviceMeterList()[i].Name(value.Name);
								}
								if(value.hasOwnProperty('MeterNumber')) {
									SG.deviceMeterList()[i].MeterNumber(value.MeterNumber);
								}
								if(value.hasOwnProperty('InterfaceId')) {
									SG.deviceMeterList()[i].InterfaceId(value.InterfaceId);
									//根据InterfaceId找到InterfaceName
									$.each(SG.interfaceList(), function(index_Interface, value_Interface) {
										if(value.InterfaceId == value_Interface.interfaceId()) {
											SG.deviceMeterList()[i].InterfaceName(value_Interface.interfaceName());
											return false;
										}
									});

								}
								if(value.hasOwnProperty('TemplateId')) {
									SG.deviceMeterList()[i].TemplateId(value.TemplateId);
									//根据templateId找到templateName
									$.each(SG.deviceTemplateList(), function(index2, value2) {
										if(value2.id() == value.TemplateId) {
											SG.deviceMeterList()[i].TemplateName(value2.Name());
											return false;
										}
									});

								}
								if(value.hasOwnProperty('Period')) {
									SG.deviceMeterList()[i].Period(value.Period);
								}
								if(value.hasOwnProperty('Timeout')) {
									SG.deviceMeterList()[i].Timeout(value.Timeout);
								}
								if(value.hasOwnProperty('InstallAddress')) {
									SG.deviceMeterList()[i].InstallAddress(value.InstallAddress);
								}
								if(value.hasOwnProperty('Remark')) {
									SG.deviceMeterList()[i].Remark(value.Remark);
								}

								break;
							}
						}

					});
				}, function() {
					toastr.warning('更新设备失败', '提示信息：', {
						timeOut: 5000,
						closeButton: true,
						progressBar: true
					});
				});
			}
			return {
				show: function() {
					//判断同时编辑几个设备
					if(1 == _editData.length) {
						_editDMMod.remind('');
						_editDMMod.isEditOne(true);
						_editDMMod.editItem = _editData[0];
						_editDMMod.isEditOne_DataBack = parseData_back(_editData[0]);
					} else {
						_editDMMod.remind('请勾选左侧选框确定所需编辑的选项');
						_editDMMod.isEditOne(false);
						_editDMMod.editItem = _editData[0];
						_editDMMod.multipleEditPeriod(100);
						_editDMMod.multipleEditTimeout(100);
						_editDMMod.multipleEditInstallAddress('');
						_editDMMod.multipleEditRemark('');
						_editDMMod.isMultipleEditPeriod(false);
						_editDMMod.isMultipleEditTimeout(false);
						_editDMMod.isMultipleEditInstallAddress(false);
						_editDMMod.isMultipleEditRemark(false);
					}
					_editDMMod.isValide = ko.computed(function() {
						if(_editDMMod.isEditOne()) {
							if(_editDMMod.editItem.Name.hasError() ||
								_editDMMod.editItem.MeterNumber.hasError() ||
								_editDMMod.editItem.Period.hasError() ||
								_editDMMod.editItem.Timeout.hasError() ||
								_editDMMod.editItem.InstallAddress.hasError() ||
								_editDMMod.editItem.Remark.hasError()) {
								return false;
							} else {
								return true;
							}
						} else {
							if((_editDMMod.isMultipleEditPeriod() && _editDMMod.multipleEditPeriod.hasError()) ||
								(_editDMMod.isMultipleEditTimeout() && _editDMMod.multipleEditTimeout.hasError()) ||
								(_editDMMod.isMultipleEditInstallAddress() && _editDMMod.multipleEditInstallAddress.hasError()) ||
								(_editDMMod.isMultipleEditRemark() && _editDMMod.multipleEditRemark.hasError())) {
								return false;
							} else {
								return true;
							}
						}
					});
					window.undfan.window.showModal({
						viewModel: _editDMMod,
						template: 'template-editDeviceManager-modal',
						width: 400
					});
				}
			}
		}();

		var _deleteId = [];
		this.deleteDeviceManager = function() {
			_deleteId = [];
			var _formData = $('#devicemanagertable').bootstrapTable('getSelections'); //得到选择行的数据的数组
			for(var i = 0; i < _formData.length; i++) {
				var parseid = _formData[i].Id;
				_deleteId.push(parseid);
			}
			if(_deleteId.length == 0) {
				alert('请选择要shanchu的项');
				return;
			}
			_deviceManager.deleteDeviceManagerModal.show();
		};
		this.deleteDeviceManagerModal = function() {
			var _deleteDMMod = {};
			_deleteDMMod.title = "确认删除";
			_deleteDMMod.btnOk = function() {
				//删除操作
				$('#devicemanagertable').bootstrapTable('remove', {
					field: 'Id',
					values: _deleteId
				});
			};
			return {
				show: function() {
					window.undfan.window.showModal({
						viewModel: _deleteDMMod,
						template: 'template-deleteDeviceManager-modal',
						width: 400
					});
				}
			}
		}();
	}

	//创建该模块
	undfan.deviceManager = new DeviceManager();

	//把该模块添加到系统中
	undfan.route.add(undfan.deviceManager);

}(jQuery));