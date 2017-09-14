(function($) {
	if(!ko) {
		throw new Error("要使用dataSource,必须先导入Knockout库");
	}
	if(!window.undfan) {
		window.undfan = {};
	}

	/*
	 * 对Date的扩展，将 Date 转化为指定格式的String 
	 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	 * 例子：
	 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	 */
	Date.prototype.format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}

	Date.prototype.addHours = function(nHours) {
		this.setTime(this.getTime() + nHours * 60 * 60 * 1000);
	}
	var undfan = window.undfan;
	undfan.SerialPortList = [{
		SerialName: '串口1',
		Id: 1
	}, {
		SerialName: '串口2',
		Id: 2
	}, {
		SerialName: '串口3',
		Id: 3
	}, {
		SerialName: '串口4',
		Id: 4
	}, {
		SerialName: '串口5',
		Id: 5
	}, {
		SerialName: '串口6',
		Id: 6
	}];
	undfan.BaudRateList = [{
		name: '1200bps',
		value: '1200'
	}, {
		name: '2400bps',
		value: '2400'
	}, {
		name: '4800bps',
		value: '4800'
	}, {
		name: '9600bps',
		value: '9600'
	}];

	undfan.DataBitList = [{
		name: '5位',
		value: 5
	}, {
		name: '6位',
		value: 6
	}, {
		name: '7位',
		value: 7
	}, {
		name: '8位',
		value: 8
	}];

	undfan.StopBitList = [{
		name: '1位',
		value: '1'
	}, {
		name: '1.5位',
		value: '1.5'
	}, {
		name: '2位',
		value: '2'
	}];

	undfan.EvenOddCheckList = [{
		name: '无效验',
		value: 0
	}, {
		name: '奇效验',
		value: 1
	}, {
		name: '偶效验',
		value: 2
	}];

	undfan.NetProtocolList = [{
		name: "TCP",
		value: true
	}, {
		name: "UDP",
		value: false
	}];
	undfan.NetLocalModelList = [{
		name: "客户端",
		value: true
	}, {
		name: "服务器",
		value: false
	}];
	undfan.VariantDataType = [{
		name: '浮点型',
		value: 'double'
	}, {
		name: '整型',
		value: 'int'
	}, {
		name: '布尔类型',
		value: 'bool'
	}, {
		name: '时间类型',
		value: 'time'
	}];
	undfan.VariantDisplayType = [{
		name: '十进制',
		value: 'Default'
	}, {
		name: '十六进制',
		value: 'Hex'
	}, {
		name: '时间格式',
		value: 'Time'
	}];
	undfan.VariantType = [{
		name: '虚拟变量',
		value: 'Virtual'
	}, {
		name: '实际变量',
		value: 'Real'
	}];
	undfan.VariantRWFlag = [{
		name: '只读',
		value: 'ReadOnly'
	}, {
		name: '只写',
		value: 'WriteOnly'
	}, {
		name: '读写',
		value: 'ReadWrite'
	}];

	/***********************DeviceTemplate start*********************************/
	undfan.deviceTypeList = ko.observableArray();
	undfan.deviceTemplateList = ko.observableArray();
	undfan.observaData_deviceTemplate = function(item) {
		var _tmp = {};
		_tmp.id = ko.observable(item.Id);
		_tmp.Name = ko.observable(item.Name).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
			}]
		});
		_tmp.DeviceType = ko.observable(item.DeviceType);
		_tmp.DeviceCode = ko.observable(item.DeviceCode);
		_tmp.DeviceName = ko.computed(function() {
			var _name = '';
			$.each(undfan.deviceTypeList(), function(index, value) {
				if(_tmp.DeviceCode() == value.devicecode()) {
					//					_name = value.devicename();
					_name = value.show();
					return false;
				}
			});
			return _name;
		});
		_tmp.Remark = ko.observable(item.DeviceRemark).extend({
			validation: [{
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
			}]
		});
		_tmp.isValide = ko.computed(function() {
			if(_tmp.Name.hasError() || _tmp.Remark.hasError()) {
				return false;
			} else {
				return true;
			}
		});
		return _tmp;
	}
	undfan.observable_deviceType = function(item) {
		var _tmp = {};
		_tmp.author = ko.observable(item.author);
		_tmp.description = ko.observable(item.description);
		_tmp.devicecode = ko.observable(item.deviceCode);
		_tmp.devicefactory = ko.observable(item.deviceManufactor);
		_tmp.devicemodel = ko.observable(item.deviceModel);
		_tmp.devicename = ko.observable(item.deviceName);
		_tmp.lastmodified = ko.observable(item.lastModified);
		_tmp.version = ko.observable(item.version);
		_tmp.show = ko.observable(item.deviceFullName);
		return _tmp;
	}

	//获取设备类型列表
	var _deviceApi = new undfan.Device();
	_deviceApi.getDeviceTypeList(function(data, textStatus, jqXHR) {
		$.each(data, function(index, value) {
			var tmp = undfan.observable_deviceType(value);
			undfan.deviceTypeList.push(tmp);
		});
		//将‘虚拟设备’添加到设备类型中去
		var _virtualDevice = {
			author: "",
			description: "虚拟设备",
			deviceCode: "VirtualDevice",
			deviceName: "虚拟设备",
			deviceManufactor: "",
			deviceFullName: "虚拟设备",
			deviceModel: "",
			lastModified: "",
			version: ""
		}
		undfan.deviceTypeList.push(undfan.observable_deviceType(_virtualDevice));
	}, function() {
		toastr.warning('获取设备类型信息失败', '提示信息：', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true
		});
	});

	//获取设备模板的数据
	var _deviceTemplateApi = new undfan.DeviceTemplate();
	_deviceTemplateApi.getTemplateList(function(data, textStatus, jqXHR) {
		$.each(data, function(index, value) {
			var tmp = undfan.observaData_deviceTemplate(value);
			undfan.deviceTemplateList.push(tmp);
		});
	}, function() {
		toastr.warning('获取设备模板信息失败', '提示信息：', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true
		});
	});
	/***********************DeviceTemplate end*********************************/

	/***********************Meter start*********************************/
	undfan.observaData_deviceMeter = function(value) {
		var _tmpItem = {};
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
				min: 10,
				max: 1000
			}]
		});
		_tmpItem.Timeout = ko.observable(value.Timeout).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'integer',
				min: 100,
				max: 5000
			}]
		});
		_tmpItem.TemplateId = ko.observable(value.TemplateId);
		_tmpItem.TemplateName = ko.observable(value.TemplateName);
		_tmpItem.InstallAddress = ko.observable(value.InstallAddress).extend({
			validation: [{
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 32
			}]
		});
		_tmpItem.Remark = ko.observable(value.Remark).extend({
			validation: [{
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
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
	undfan.deviceMeterList = ko.observableArray();
	//获取设备列表
	_deviceApi.getDeviceList(function(data, textStatus, jqXHR) {
		$.each(data, function(index, value) {
			var tmp = undfan.observaData_deviceMeter(value);
			undfan.deviceMeterList.push(tmp);
		});
	}, function() {
		toastr.warning('获取设备信息失败', '提示信息：', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true
		});
	});

	Daemon.subscribe({
		name: '/api/interfacemeter/0?statu=1', // 名称，对于一个页面，名称要惟一
		url: '/api/interfacemeter/0?statu=1', // 请求，
		success: function(data) { // 当成功时的回调函数
			data = JSON.parse(data);
			$.each(data, function(index, value) {
				$.each(undfan.deviceMeterList(), function(index2, value2) {
					if(value2.Id() == value.Id) {
						value2.statu(value.statu);
						return false;
					}
				});
			});

		},
		fail: function(data) { // 失败时的回调函数
			toastr.warning('获取设备信息失败', '提示信息：', {
				timeOut: 3000,
				closeButton: true,
				progressBar: true
			});
		},
		data: null, // 传递给ajax的数据
		interval: 60, // 请求间隔，单位秒
		autoRun: true, // 是否自动请求
		immediate: true
	});
	/***********************Meter end*********************************/

	/***********************LocalInterface start*********************************/
	undfan.observaData_localSerialPort_interface = function(item) {
		var _tmp = {};
		_tmp.interfaceId = ko.observable(item.InterfaceId);
		_tmp.interfaceName = ko.observable(item.InterfaceName).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
			}]
		});
		_tmp.interfaceDeviceId = ko.observable(item.InterfaceDeviceId);
		_tmp.interfaceCmdInterval = ko.observable(item.InterfaceCmdInterval).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'integer',
				min: 20,
				max: 1000
			}]
		});
		_tmp.interfaceTimeout = ko.observable(item.InterfaceTimeout).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'integer',
				min: 100,
				max: 5000
			}]
		});
		_tmp.interfaceRemark = ko.observable(item.InterfaceRemark).extend({
			validation: [{
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
			}]
		});
		_tmp.backupData = {
			interfaceName: "",
			interfaceCmdInterval: 0,
			interfaceTimeout: 0,
			interfaceRemark: "",
			interfaceDeviceId: 0
		};
		_tmp.editable = ko.observable(item.editable);
		_tmp.isValide = ko.computed(function() {
			if(_tmp.interfaceName.hasError() || _tmp.interfaceCmdInterval.hasError() ||
				_tmp.interfaceTimeout.hasError() || _tmp.interfaceRemark.hasError()) {
				return false;
			} else {
				return true;
			}
		});
		_tmp.children = ko.computed(function() {
			var _tmpResult = [];
			var interfaceid = _tmp.interfaceDeviceId();
			$.each(undfan.deviceMeterList(), function(index, value) {
				if(interfaceid == value.InterfaceId()) {
					_tmpResult.push(value);
				}
			});
			return _tmpResult;
		});

		return _tmp;
	}
	undfan.localSerialInterfaceList = ko.observableArray();
	//获取本地串口接口相关的数据
	var _interfaceApi = new undfan.Interface();
	_interfaceApi.getLocalSerialPortInfo(function(data, textStatus, jqXHR) {
		$.each(data, function(index, value) {
			var tmp = undfan.observaData_localSerialPort_interface(value);
			undfan.localSerialInterfaceList.push(tmp);
		});
	}, function() {
		toastr.warning('获取本地串口接口信息失败', '提示信息：', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true
		});
	});
	/***********************LocalInterface end*********************************/

	/***********************NetToSerialInterface start*********************************/
	undfan.observaData_netToSerialPort_interface = function(item) {
		var _tmp = {};
		_tmp.interfaceId = ko.observable(item.InterfaceId);
		_tmp.interfaceName = ko.observable(item.InterfaceName).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
			}]
		});
		_tmp.interfaceCmdInterval = ko.observable(item.InterfaceCmdInterval).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'integer',
				min: 20,
				max: 1000
			}]
		});
		_tmp.interfaceTimeout = ko.observable(item.InterfaceTimeout).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'integer',
				min: 100,
				max: 5000
			}]
		});
		_tmp.bTcp = ko.observable(item.BTcp);
		_tmp.bClient = ko.observable(item.BClient);
		_tmp.localPort = ko.observable(item.LocalPort).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'integer'
			}]
		});
		_tmp.remoteIP = ko.observable(item.RemoteIP).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'ip'
			}]
		});
		_tmp.remotePort = ko.observable(item.RemotePort).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'integer'
			}]
		});
		_tmp.interfaceRemark = ko.observable(item.InterfaceRemark).extend({
			validation: [{
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
			}]
		});
		_tmp.backupData = {
			interfaceName: "",
			interfaceCmdInterval: 0,
			interfaceTimeout: 0,
			bTcp: false,
			bClient: false,
			localPort: 0,
			remoteIP: "",
			remotePort: 0,
			interfaceRemark: ""
		};
		_tmp.editable = ko.observable(item.editable);
		_tmp.isValide = ko.computed(function() {
			if(_tmp.bClient()) {
				if(_tmp.interfaceName.hasError() || _tmp.remoteIP.hasError() || _tmp.remotePort.hasError() || _tmp.interfaceRemark.hasError()) {
					return false;
				} else {
					return true;
				}
			} else {
				if(_tmp.interfaceName.hasError() || _tmp.localPort.hasError() || _tmp.interfaceRemark.hasError()) {
					return false;
				} else {
					return true;
				}
			}
		});
		_tmp.children = ko.computed(function() {
			var _tmpResult = [];
			var interfaceid = _tmp.interfaceId();
			$.each(undfan.deviceMeterList(), function(index, value) {
				if(interfaceid == value.InterfaceId()) {
					_tmpResult.push(value);
				}
			});
			return _tmpResult;
		});

		return _tmp;
	}
	undfan.netToSerialInterfaceList = ko.observableArray();
	//获取网络串口接口相关的数据
	_interfaceApi.getNetSerialPortInfo(function(data, textStatus, jqXHR) {
		$.each(data, function(index, value) {
			var tmp = undfan.observaData_netToSerialPort_interface(value);
			undfan.netToSerialInterfaceList.push(tmp);
		});
	}, function() {
		toastr.warning('获取网络串口接口信息失败', '提示信息：', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true
		});
	});
	/***********************NetToSerialInterface end*********************************/

	/***********************Interface start*********************************/
	undfan.interfaceList = ko.observableArray();
	undfan.observaData_interface = function(item) {
		var _tmp = {};
		_tmp.interfaceId = ko.observable(item.InterfaceId);
		_tmp.interfaceName = ko.observable(item.InterfaceName).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
			}]
		});
		_tmp.interfaceType = ko.observable(item.InterfaceType);
		_tmp.interfaceRemark = ko.observable(item.InterfaceRemark).extend({
			validation: [{
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
			}]
		});
		_tmp.children = ko.computed(function() {
			var _tmpResult = [];
			var interfaceid = _tmp.interfaceId();
			$.each(undfan.deviceMeterList(), function(index, value) {
				if(interfaceid == value.InterfaceId()) {
					_tmpResult.push(value);
				}
			});
			return _tmpResult;
		});
		return _tmp;
	}
	undfan.updateInterfaceList = function(data) {
		if(!data.hasOwnProperty("InterfaceId")) {
			return;
		}

		$.each(undfan.interfaceList(), function(index, value) {
			if(value.interfaceId() == data.InterfaceId) {
				if(data.hasOwnProperty("InterfaceName")) {
					value.interfaceName(data.InterfaceName);
				}
				if(data.hasOwnProperty("InterfaceRemark")) {
					value.interfaceRemark(data.InterfaceRemark);
				}
				return false;
			}
		});
	}
	undfan.addInterfaceList = function(data) {
		var _tmp = undfan.observaData_interface(data);
		undfan.interfaceList.push(_tmp);
	}
	undfan.deleteOneInterfaceList = function(data) {
		$.each(undfan.interfaceList(), function(index, value) {
			if(data == value.interfaceId()) {
				undfan.interfaceList.remove(value);
				return false;
			}
		});
	}
	//获取接口相关的数据
	_interfaceApi.getInterfaceInfo(function(data, textStatus, jqXHR) {
		$.each(data, function(index, value) {
			var tmp = undfan.observaData_interface(value);
			undfan.interfaceList.push(tmp);
		});
	}, function() {
		toastr.warning('获取接口信息失败', '提示信息：', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true
		});
	});
	/***********************Interface end*********************************/

	/***********************Plat start*********************************/
	undfan.observaData_plat = function(item) {
		var _platItem = {};
		_platItem.platId = ko.observable(item.PlatId);
		_platItem.platName = ko.observable(item.Name).extend({
			validation: [{
				validate: 'notnull'
			}, {
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
			}]
		});
		_platItem.platType = ko.observable(item.PlatType);
		_platItem.platTypeName = ko.computed(function() {
			if('SST' == _platItem.platType()) {
				return "FrontView平台";
			} else if('JSDXGJ' == _platItem.platType()) {
				return "江苏大型公建";
			} else if('STL' == _platItem.platType()) {
				return "智能物联网平台";
			} else {
				return _platItem.platType();
			}
		});
		_platItem.remark = ko.observable(item.Remark).extend({
			validation: [{
				validate: 'charnumscore'
			}, {
				validate: 'strlen',
				max: 64
			}]
		});
		_platItem.isValide = ko.computed(function() {
			if(_platItem.platName.hasError() || _platItem.remark.hasError()) {
				return false;
			} else {
				return true;
			}
		});
		return _platItem;
	}
	undfan.platList = ko.observableArray();
	//获取平台列表
	var _reportService = new undfan.ReportService();
	_reportService.getReportServiceList(function(data, textStatus, jqXHR) {
		undfan.platList.removeAll();
		$.each(data, function(index, value) {
			var tmp = undfan.observaData_plat(value);
			undfan.platList.push(tmp);
		});
	}, function() {
		toastr.warning('获取平台信息失败', '提示信息：', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true
		});
	});
	/***********************Plat end*********************************/

	/***********************PlatType end*********************************/
	undfan.observaData_plattype = function(item) {
		var _platItem = {};
		_platItem.type = ko.observable(item.Type);
		_platItem.typeName = ko.computed(function() {
			if('SST' == _platItem.type()) {
				return "FrontView平台";
			} else if('JSDXGJ' == _platItem.type()) {
				return "江苏大型公建";
			} else if('STL' == _platItem.type()) {
				return "智能物联网平台";
			} else {
				return _platItem.type();
			}
		});
		_platItem.name = ko.observable(item.Name);
		_platItem.version = ko.observable(item.Version);
		_platItem.author = ko.observable(item.Author);
		_platItem.lastmodified = ko.observable(item.LastModified);
		_platItem.description = ko.observable(item.Description);
		return _platItem;
	}
	undfan.platTypeList = ko.observableArray();
	_reportService.getReportServiceTypeList(function(data, textStatus, jqXHR) {
		undfan.platTypeList.removeAll();
		$.each(data, function(index, value) {
			var tmp = undfan.observaData_plattype(value);
			undfan.platTypeList.push(tmp);
		});
	}, function() {
		toastr.warning('获取平台类型信息失败', '提示信息：', {
			timeOut: 5000,
			closeButton: true,
			progressBar: true
		});
	});
	/***********************PlatType end*********************************/

	undfan.platItemClick = function(item) {
		//		var _href = window.location.href;
		//      var _host = _href.match(/http:\/\/(\d{1,3}|\*)\.(\d{1,3}|\*)\.(\d{1,3}|\*)\.(\d{1,3}|\*)/);
		//      window.open(_host[0] + "/subSystem/" + item.platType() + "/index.html");
		window.open("subSystem/" + item.platType() + "/index.html?platId=" + item.platId() + "&platName=" + item.platName());
	}
	undfan.loadingText = ko.observable("正在加载中......");
}(jQuery));