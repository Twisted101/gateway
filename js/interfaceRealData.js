(function($) {
	var InterfaceRealData = function() {
		var _interfaceRealData = this;

		var _pattern = /^\/interfaceRealData\/?$/;
		undfan.routeItem.call(this, {
			htmlUrl: 'template/interfaceRealData.html',
			pattern: _pattern,
			templateId: 'template-interfaceRealData'
		});
		var _timeId = 0;
		this.interfaceList = ko.observableArray();
		this.dataList = ko.observableArray();
		this.btnType = ko.observable(1);
		var parseListItem = function(item) {
			var _tmp = {};
			_tmp.dataType = ko.observable(item.type);
			_tmp.interfaceId = ko.observable(item.interface);
			_tmp.interfaceName = ko.computed(function() {
				var _tmpName = _tmp.interfaceId;
				$.each(undfan.serialInterface.interfaceDataList(), function(index, value) {
					if(value.interfaceId() == item.interface) {
						_tmpName = value.interfacename();
						return false;
					}
				});
				return _tmpName;
			});
			_tmp.dataTime = ko.observable(item.time);
			_tmp.data = ko.observable(item.data);
			return _tmp;
		}

		//将KO数据转化为普通数据  bootstraptable使用
		var parseBTList = function(item) {
			var _tmp = {};
			_tmp.dataType = item.dataType();
			_tmp.interfaceName = item.interfaceName();
			_tmp.dataTime = item.dataTime();
			_tmp.data = item.data();
		};

		this.bind('init', function() {

		});

		this.bind('show', function(strUrl) {
			_interfaceRealData.btnType(1);
			_interfaceRealData.dataList.removeAll();

			$.each(undfan.serialInterface.interfaceDataList(), function(index, value) {
				var _tmp = {};
				_tmp.interfaceId = ko.observable(value.InterfaceId);
				_tmp.interfaceName = ko.observable(value.interfacename());
				_tmp.isSelected = ko.observable(false);
				_interfaceRealData.interfaceList.push(_tmp);
			});

			undfan.route.changeItem(_interfaceRealData);
			$('#interfaceRealDataTable').bootstrapTable();
			$('.dropdown-menu').click(function(ev) {
				return false;
			});
		});

		this.bind('afterRender', function() {

		});

		this.bind('hide', function(strUrl) {
			clearTimeout(_timeId);
			_interfaceRealData.interfaceList.removeAll();
		});

		this.toggleItemSelected = function(item) {
			item.isSelected(!item.isSelected());
		}

		var _interfaceApi = new undfan.Interface();
		this.startDebugger = function() {
			var _selectedInterface = [];
			$.each(_interfaceRealData.interfaceList(), function(index, value) {
				if(value.isSelected()) {
					_selectedInterface.push({
						interfaceId: value.interfaceId()
					});
				}
			});
			if(0 == _selectedInterface.length) {
				console.log('未选择')
				toastr.warning('请至少选择一个要调试的接口', '提示信息：', {
					timeOut: 5000,
					closeButton: true,
					progressBar: true
				});
				return;
			}

			_interfaceRealData.btnType(0);

			var testData = [{
				"dataType": "模拟数据",
				"interfaceName": "接口1",
				"dataTime": "2017 - 08 - 28 09: 46: 21",
				"data": "11 22 33"
			}, {
				"dataType": "模拟数据",
				"interfaceName": "接口2",
				"dataTime": "2017 - 08 - 28 09: 46: 21",
				"data": "33 22 11"
			}];

			var bootstrapTableList = [];

			function getData() {
				//				for(var i = 0; i < testData.length; i++) {
				//					_interfaceRealData.dataList.unshift(parseListItem(testData[i]))
				//				}
				for(var i = 0; i < testData.length; i++) {
					bootstrapTableList.unshift(testData[i])
				}
				console.log(bootstrapTableList)
				$('#interfaceRealDataTable').bootstrapTable('load', bootstrapTableList);
				//				_interfaceApi.getInterfaceRealCmdData(ko.utils.stringifyJson(_selectedInterface), function(data, textStatus, jqXHR) {
				//					data = $.parseJSON(data);
				//
				//					$.each(data, function(index, value) {
				//						_interfaceRealData.dataList.push(parseListItem(value));
				//					});
				//				}, function() {
				//					toastr.error('调试失败', '提示：', {
				//						timeOut: 1000,
				//						closeButton: true,
				//						progressBar: true
				//					});
				//				});
			};
			getData();
			_timeId = setInterval(getData, 3 * 1000);
		}
		//停止调试
		this.stopDebugger = function() {
			clearInterval(_timeId);
			_interfaceRealData.btnType(1);
		}
		//清除报文
		this.clearData = function() {
			$('#interfaceRealDataTable').bootstrapTable('removeAll');
		}
		
		this.serialHelp = function() {
			_interfaceRealData.serialHelpShowModel.show();
		}
		
		this.serialHelpShowModel = function() {
			var _serialHelpShowModel = {};
			var _selectedInterface = null;
			_serialHelpShowModel.title = "串口助手";
			_serialHelpShowModel.serialHelpRecvTextarea = ko.observable('');//接收区内容
			_serialHelpShowModel.serialHelpSendTextarea = ko.observable('');//发送区内容
			_serialHelpShowModel.showRecvTime = ko.observable(false);//是否显示接受时间
			_serialHelpShowModel.interfaceId = ko.observable(0);
			//清空
			_serialHelpShowModel.clearRecv = function() {
				_serialHelpShowModel.serialHelpRecvTextarea('');
			}
			_serialHelpShowModel.clearSend = function() {
				_serialHelpShowModel.serialHelpSendTextarea('');
			}

			_serialHelpShowModel.sendData = function() {
				var _data = _serialHelpShowModel.serialHelpSendTextarea();
				//去除空格
				_data = _data.replace(/\s/g, "");
//				var _selectInterface = [{
//					InterfaceId: _serialHelpShowModel.interfaceId()
//				}];
				var _putData = {
					"Interface": _serialHelpShowModel.interfaceId(),
					"Data": _data
				};

				_interfaceApi.sendDataOfInterface(ko.utils.stringifyJson(_putData), function(data, textStatus, jqXHR) {
					var value = $.parseJSON(data);
					var _appendData = '';
					//是否需要显示时间
					if(_serialHelpShowModel.showRecvTime()) {
						var _value = "【" + value.time + "】 " + value.data + "\n";
						_appendData = _appendData + _value;
					} else {
						_appendData = _appendData + " " + value.data;
					}
					$('#serialHelpRecvTextarea').append(_appendData);
					_serialHelpShowModel.serialHelpRecvTextarea(_appendData)
					toastr.success('发送成功', '提示：', {
						timeOut: 1000,
						closeButton: true,
						progressBar: true
					});

				}, function() {				
					toastr.error('发送失败', '提示：', {
						timeOut: 1000,
						closeButton: true,
						progressBar: true
					});
				});
			}
			return {
				show: function() {
					_serialHelpShowModel.showRecvTime(false);
					window.undfan.window.showModal({
						viewModel: _serialHelpShowModel,
						template: 'template-dialnog-interfaceRealData-serialhelper-modal',
						width: 1000
					});
				}
			}
		}();
	}

	//创建该模块
	undfan.interfaceRealData = new InterfaceRealData();

	//把该模块添加到系统中
	undfan.route.add(undfan.interfaceRealData);

}(jQuery));