(function($) {

	if(!window.undfan) {
		window.undfan = {};
	}

	var _undfan = window.undfan;

	/**
	 * 网络设置相关的接口
	 */
	_undfan.NetSetting = function() {
		
		/**
		 * 获取网络配置信息
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 * 					"DeviceName": 网卡名称，如 "eth0"
		 * 					"HWAddr":     MAC地址， 如 "00:0C:29:0B:A5:3D"
		 * 					"IpMethod":   获取方式。 0或1,1为动态获取、0为静态获取
		 * 					"IpAddr":     Ip地址，如 "192.168.0.168"
		 * 					"NetMask":    子网掩码，如 "255.255.255.0",
		 * 					"GateWay":    默认网关， 如"192.168.0.1",
		 * 					"DNS": 
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getNetInfo = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				return;
			}
			$.ajax({
				url: 'data/netSetting.json',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		
		/**
		 * 更新网络配置信息
		 * @param {JsonString} _data 要更网络配置的参数，参数格式如
		 * 		  {
		 *	 			"DeviceName": 网卡名称，如 "eth0"
		 * 				"IpMethod":   获取方式。 0或1,1为动态获取、0为静态获取
		 * 				"IpAddr":     Ip地址，如 "192.168.0.168"
		 * 				"NetMask":    子网掩码，如 "255.255.255.0",
		 * 				"GateWay":    默认网关， 如"192.168.0.1",
		 * 				"DNS": 
		 * 		  }
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateNetInfo = function(_data, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				return;
			}
			$.ajax({
				url: '/api/net',
				type: 'PUT',
				dataType: 'text',
				data: _data,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
	}

	/**
	 * 串口配置相关的接口
	 */
	_undfan.SerialSetting = function() {
		/**
		 * 获取串口配置信息
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list 
		 * 		数据格式：[{
		 * 					"Name":         串口名称，如 "串口1"
		 * 					"BaudRate":     波特率， 如 "9600"
		 * 					"EvenOddCheck": 校验位, 0:无效验;1:奇效验;2:偶效验
		 * 					"DataBit":      数据位，如 "8"
		 * 					"StopBit":      停止位，如 "1",
		 * 					"Id":    	       串口唯一编号
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getSerialInfo = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				return;
			}
			$.ajax({
				url: 'data/serialSetting.json',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		/**
		 * 更新串口配置信息
		 * @param {JsonString} _data 要更新串口配置信息的参数，参数格式如
		 * 		  {
		 * 				"BaudRate":     波特率， 如 "9600"
		 * 				"EvenOddCheck": 校验位, 0:无效验;1:奇效验;2:偶效验
		 * 				"DataBit":      数据位，如 "8"
		 * 				"StopBit":      停止位，如 "1",
		 * 				"Id":    	       串口唯一编号
		 * 		  }
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateSerialInfo = function(_data, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/serialport',
				type: 'PUT',
				dataType: 'text',
				data: _data,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}

	}

	/**
	 * 系统信息相关的接口
	 */
	_undfan.SystemInfo = function() {
		/**
		 * 获取所有系统信息
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json string
		 * 		数据格式：{
		 * 					"Name":       		网关名称
		 * 					"SN":     			网关SN号
		 * 					"SoftwareVersion":  软件版本，如 “4.0.2600”
		 * 					"HardwareVersion":  硬件版本，如 “1.1”
		 * 					"TotalPart_In":     内部存储总容量，单位是兆
		 * 					"FreePart_In":    	内部存储剩余容量，单位是兆
		 * 					"HasSD":            是否含有SD卡，true为有
		 * 					"TotalPart_Out":	外部存储的总容量，单位是兆
		 * 					"FreePart_Out":     外部存储的剩余容量，单位是兆
		 * 				}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getAllSystemInfo = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/systeminfo?AllInfo=1',
				type: 'GET',
				dataType: 'text',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		};
		/**
		 * 获取CPU和内存信息
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json string
		 * 		数据格式：{
		 * 					"Cpu":       Cpu使用的百分比
		 * 					"MemUsed":   内存使用量
		 * 					"MemTotal":  内存总容量
		 * 				  }
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getCpuMemInfo = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/systeminfo?AllInfo=0',
				type: 'GET',
				dataType: 'text',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		/**
		 * 更新网关名称
		 * @param {JsonString} _data 要更新的参数，参数格式如
		 * 		  {
		 * 				"Name": 网关名称
		 * 		  }
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateSmartGateName = function(_data, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/systeminfo',
				type: 'PUT',
				dataType: 'text',
				data: _data,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
	}
	/**
	 * 采集接口相关的接口类 
	 */
	_undfan.Interface = function() {
		/**
		 * 获取接口相关的数据
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 * 					"InterfaceId":      接口接口唯一编号
		 * 					"InterfaceName":    接口名称
		 * 					"InterfaceType":    接口类型 SerialPortDirect
		 * 					"InterfaceRemark":  备注信息
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getInterfaceInfo = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: 'data/serialInterface.json',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}

		/**
		 * 获取本地串口接口相关的数据
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 * 					"InterfaceId":          本地串口接口唯一编号
		 * 					"InterfaceName":        本地串口接口名称
		 * 					"InterfaceDeviceId":    本地串口接口绑定的串口Id
		 * 					"InterfaceCmdInterval": 命令间隔
		 * 					"InterfaceTimeout":     通讯超时
		 * 					"InterfaceRemark":      备注信息
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getLocalSerialPortInfo = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/localserialport',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}

		/**
		 * 添加本地串口接口
		 * @param {JsonString} _data 要添加的参数，参数格式如
		 * 		  {add:[{
		 * 				"InterfaceName": 接口名称
		 * 				"InterfaceType": 接口类型  
		 * 				"InterfaceCmdInterval": 命令间隔
		 * 				"InterfaceTimeout":  超时时间
		 * 				"InterfaceRemark":   备注信息
		 * 				"InterfaceDeviceId": 本地串口接口绑定的串口Id
		 * 		  }]}
		 * @param {function} success_callback 成功回调函数
		 * 	回调函数返回数据类型： json string
		 * 		数据格式：{add:[{
		 *  				"InterfaceId": 接口唯一编号
		 * 					"InterfaceName": 接口名称
		 * 					"InterfaceType": 接口类型  
		 * 					"InterfaceCmdInterval": 命令间隔
		 * 					"InterfaceTimeout":  超时时间
		 * 					"InterfaceRemark":   备注信息
		 * 					"InterfaceDeviceId": 本地串口接口绑定的串口Id
		 * 				  }]}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addLocalSerialPort = function(_data, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/localserialport',
				type: 'POST',
				dataType: 'text',
				data: _data,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		/**
		 * 更新本地串口接口配置
		 * @param  _data 要更新的参数，
		 * 参数类型： json list string
		 * 参数格式如
		 * 		  [{
		 * 				"InterfaceName": 接口名称
		 * 				"InterfaceCmdInterval": 命令间隔
		 * 				"InterfaceTimeout":  超时时间
		 * 				"InterfaceRemark":   备注信息
		 * 				"InterfaceDeviceId": 本地串口接口绑定的串口Id
		 * 		  }]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateLocalSerialPort = function(_data, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/localserialport',
				type: 'PUT',
				dataType: 'text',
				data: _data,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		/**
		 * 删除本地串口接口
		 * @param _data 要删除的参数，参数格式如
		 * 参数类型： json list string
		 * 参数格式如
		 * 		 [{ InterfaceId: 接口Id}]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteLocalSerialPort = function(_data, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/localserialport',
				type: 'DELETE',
				dataType: 'text',
				data: _data,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		
		/**
		 * 获取网络串口接口相关的数据
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 * 					"InterfaceId":          本地串口接口唯一编号
		 * 					"InterfaceName":        本地串口接口名称
		 * 					"InterfaceCmdInterval": 命令间隔
		 * 					"InterfaceTimeout":     通讯超时
		 * 					"BTcp":                 是否是Tcp
		 * 					"BClient":              是否是客户端
		 * 					"LocalPort":            本地端口
		 * 					"RemoteIP":      		远程IP
		 * 					"RemotePort":      		远程端口
		 * 					"InterfaceRemark":      备注信息
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getNetSerialPortInfo = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/netToserial',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}

		/**
		 * 添加网络串口接口
		 * @param {JsonString} _data 要添加的参数，参数格式如
		 * 		  {add:[{
		 * 				"InterfaceName": 接口名称
		 * 				"InterfaceType": 接口类型  
		 * 				"InterfaceCmdInterval": 命令间隔
		 * 				"InterfaceTimeout":  超时时间
		 * 				"BTcp":   是否是Tcp协议
		 * 				"BClient":  是否是客户端
		 * 				"LocalPort":  本地端口
		 * 				"RemoteIP":   远程Ip
		 * 				"RemotePort": 远程端口
		 * 				"InterfaceRemark":   备注信息
		 * 		  }]}
		 * @param {function} success_callback 成功回调函数
		 * 	回调函数返回数据类型： json string
		 * 		数据格式：{add:[{
		 *  				"InterfaceId": 接口唯一编号
		 * 					"InterfaceName": 接口名称
		 * 					"InterfaceCmdInterval": 命令间隔
		 * 					"InterfaceTimeout":  超时时间
		 * 					"InterfaceRemark":   备注信息
		 *	 				"BTcp":   是否是Tcp协议
		 * 					"BClient":  是否是客户端
		 * 					"LocalPort":  本地端口
		 * 					"RemoteIP":   远程Ip
		 * 					"RemotePort": 远程端口
		 * 				  }]}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addNetSerialPort = function(_data, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/netToserial',
				type: 'POST',
				dataType: 'text',
				data: _data,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		/**
		 * 更新网络串口接口配置
		 * @param _data 要更新的参数，
		 * 参数类型：json list string
		 * 参数格式如
		 * 		  [{
		 * 				"InterfaceName": 接口名称
		 * 				"InterfaceCmdInterval": 命令间隔
		 * 				"InterfaceTimeout":  超时时间
		 * 				"BTcp":   是否是Tcp协议
		 * 				"BClient":  是否是客户端
		 * 				"LocalPort":  本地端口
		 * 				"RemoteIP":   远程Ip
		 * 				"RemotePort": 远程端口
		 * 				"InterfaceRemark":   备注信息
		 * 		  }]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateNetSerialPort = function(_data, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/netToserial',
				type: 'PUT',
				dataType: 'text',
				data: _data,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		/**
		 * 删除网络串口接口
		 * @param {JsonString} _data 要删除的参数
		 * 参数类型：json list string
		 * 参数格式如
		 * 		 [{ InterfaceId: 接口Id}]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteNetSerialPort = function(_data, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/netToserial',
				type: 'DELETE',
				dataType: 'text',
				data: _data,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		
		/**
		 * 获取所有设备模板的变量
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 * 					"Name":       变量名称
		 * 					"Code":       变量编码
		 * 					"TemplateId": 设备模板Id
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getAllTemplateVariants = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/interface/0/meter/0/template/0?Model=ALL',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
		
		/**
		 * 获取一个实际设备的数据
		 * @param {Number} _interfaceId  接口Id
		 * @param {Number} _meterId  设备Id
		 * @param {Number} _templateId  设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 * 					"Name":       变量名称
		 * 					"Code":       变量编码
		 * 					"DataType":   数据类型
		 *                  "DisplayType": 显示类型:'Hex'、'Time'、'Default'
		 * 					"Value":      实际值
		 * 					"Unit":       单位
		 * 					"ValueTime":  变量值获取时间
		 * 					"Formula":    公式（虚拟设备的时候才使用）
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getOneRealDeviceData = function(_interfaceId, _meterId, _templateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/interface/' + _interfaceId + '/meter/' + _meterId + '/template/' + _templateId + '?Model=One',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		};
		
		/**
		 * 获取一个虚拟设备的数据
		 * @param {Number} _interfaceId  接口Id
		 * @param {Number} _meterId  设备Id
		 * @param {Number} _templateId  设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 * 					"Name":       变量名称
		 * 					"Code":       变量编码
		 * 					"DataType":   数据类型
		 *                  "DisplayType": 显示类型:'Hex'、'Time'、'Default'
		 * 					"Value":      实际值
		 * 					"Unit":       单位
		 * 					"ValueTime":  变量值获取时间
		 * 					"Formula":    公式（虚拟设备的时候才使用）
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getOneVirtualDeviceData = function(_interfaceId, _meterId, _templateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/interface/' + _interfaceId + '/meter/' + _meterId + '/template/' + _templateId + '?Model=OneVirtual',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		};

		/**
		 * 更新虚拟设备变量的公式
		 * @param {Json String} _updateData 要更新的数据
		 * 		  {
		 * 				"Code": 变量标签
		 * 				"Formula": 新的公式
		 * 		  }
		 * @param {Number} _interfaceId  接口Id
		 * @param {Number} _meterId  设备Id
		 * @param {Number} _templateId  设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateVirtualDeviceVariantFormula = function(_updateData, _interfaceId, _meterId, _templateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/interface/' + _interfaceId + '/meter/' + _meterId + '/template/' + _templateId,
				type: 'POST',
				dataType: 'text',
				data: _updateData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}

		/**
		 * 获取指定接口的通讯报文
		 * @param {Json list String} _interfaceList 指定的接口列表
		 * 			[{inerfaceId: 接口Id}]
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list string
		 * 		数据格式：[{
		 * 					"type":       报文类型：send或者recv
		 * 					"interface":  接口Id
		 * 					"time":       报文时间
		 *                  "data":       报文
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getInterfaceRealCmdData = function(_interfaceList, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/interfacerealdata',
				type: 'POST',
				dataType: 'text',
				data: _interfaceList,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}

		/**
		 * 指定接口发送调试命令,可以同时向多个串口发送 ,不能获取返回命令
		 * @param {JsonString} _sendObj 要发送的数据
		 * 		  {
		 * 				"Interface": [
		 * 					{InterfaceId: 接口1},
		 * 					{InterfaceId: 接口2}
		 * 				]
		 * 				"Data": 要发送的数据
		 * 		  }
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.sendDataOfInterfaces = function(_sendObj, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/interfacerealdata',
				type: 'PUT',
				dataType: 'text',
				data: _sendObj,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		
		/**
		 * 指定接口发送调试命令,只能同时向一个串口发送 ,可以获取返回命令
		 * @param {JsonString} _sendObj 要发送的数据
		 * 		  {
		 * 				"Interface": 接口1的Id
		 * 				"Data": 要发送的数据
		 * 		  }
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json string
		 * 		数据格式：{
		 * 					"time":  返回命令的时间，格式（yyyy-mm-dd hh:mm:ss(ms) ）
		 * 					"data":  返回报文数据
		 * 				}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.sendDataOfInterface = function(_sendObj, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/interfaceDataDirect',
				type: 'POST',
				dataType: 'text',
				data: _sendObj,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
	}

	/**
	 * 表具相关的接口类
	 */
	_undfan.Device = function() {
		/**
		 * 获取设备列表
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list 
		 * 		数据格式：[{
		 * 					"Id":            设备唯一编号
		 * 					"InterfaceId":   接口Id
		 * 					"InterfaceName": 接口名称
		 *                  "MeterNumber":   设备地址
		 * 					"Name":          设备名称
		 *                  "Period":        采集周期
		 * 					"Timeout":       在线超时时间
		 * 					"TemplateId":    设备模板编号
		 * 					"TemplateName":  设备模板名称
		 * 					"InstallAddress":安装地址
		 * 					"Remark":        备注
		 * 					"statu":         是否在线，true在线
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getDeviceList = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
//				url: '/api/interfacemeter/0',
				url:'data/deviceManager.json',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}

		/**
		 * 添加设备
		 * @param {JsonString} _addData 要添加的设备，参数格式如
		 * 		  {add:[{
		 * 				"InterfaceId": 接口编号
		 * 				"InterfaceName": 接口名称
		 * 				"TemplateId": 设备模板编号
		 * 				"TemplateName":  设备模板名称
		 * 				"Name":   设备名称
		 * 				"MeterNumber":  设备表号
		 * 				"Period":  采集周期
		 * 				"Timeout":   在线超时时间
		 * 				"InstallAddress": 安装地址
		 * 				"Remark":   备注信息
		 * 		  }]}
		 * @param {function} success_callback 成功回调函数
		 * 	回调函数返回数据类型： json text
		 * 		数据格式：{add:[{
		 *              "Id":   设备编号
		 * 				"InterfaceId": 接口编号
		 * 				"InterfaceName": 接口名称  
		 * 				"TemplateId": 设备模板编号
		 * 				"TemplateName":  设备模板名称
		 * 				"Name":   设备名称
		 * 				"MeterNumber":  设备表号
		 * 				"Period":  采集周期
		 * 				"Timeout":   在线超时时间
		 * 				"InstallAddress": 安装地址
		 * 				"Remark":   备注信息
		 * 				"statu":  是否在线，true在线
		 * 				  }]}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addDevice = function(_addData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/interfacemeter/0',
				type: 'POST',
				dataType: 'text',
				data: _addData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		
		/**
		 * 更新设备信息
		 * @param {JsonString} _updateData 要更新的设备数据
		 * 		  {update:[{
		 *              "Id":             设备编号
		 * 				"Period":         采集周期
		 * 				"Timeout":        在线超时时间
		 * 				"InstallAddress": 安装地址
		 * 				"Remark":         备注信息
		 * 		  }]}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateDevice = function(_updateData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/interfacemeter/0',
				type: 'PUT',
				dataType: 'text',
				data: _updateData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}

		/**
		 * 删除设备
		 * @param {Json list String} _deleteData 要删除的设备数据
		 * 		  [{
		 *              "Id":             设备编号
		 * 		  }]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteDevice = function(_deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/interfacemeter/0',
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		
		/**
		 * 获取设备类型列表
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list 
		 * 		数据格式：[{
		 * 					"Author":        驱动作者
		 * 					"Description":   描述
		 * 					"DeviceCode":    设备唯一编码
		 *                  "DeviceManufactor":   设备厂商
		 * 					"DeviceModel":        设备型号
		 *                  "DeviceName":         设备名称
		 * 					"LastModified":       最近修改时间
		 * 					"Version":            版本
		 * 					"DeviceFullName":     设备全称
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getDeviceTypeList = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/devicetypelist',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
	}

	/**
	 * 设备模板相关的接口类
	 */
	_undfan.DeviceTemplate = function() {
		/**
		 * 获取设备模板列表
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list 
		 * 		数据格式：[{
		 * 					"Id":     模板Id
		 * 					"Name":   模板名称
		 * 					"DeviceType":   设备类型
		 *                  "DeviceCode":   设备编码
		 * 					"DeviceRemark": 备注信息
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getTemplateList = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: 'data/deviceTemplate.json',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
		/**
		 * 增加设备模板
		 * @param {JsonString} _addTemplate 增加模板或者复制模板
		 *  数据类型： json string
		 * 	增加：
		 * 		  {add:[{
		 * 				"Name": 模板名称
		 * 				"DeviceType": 设备类型  
		 * 				"DeviceCode": 设备编码
		 * 				"DeviceRemark":  备注信息
		 * 		  }]}
		 *   复制：
		 * 		  {add:[{
		 * 				"SourceId": 已存在设备模板的Id
		 * 		  }]}
		 * @param {function} success_callback 成功回调函数
		 * 	回调函数返回数据类型： json text
		 * 		数据格式：{add:[{
		 * 					"Id":     模板Id
		 * 					"Name":   模板名称
		 * 					"DeviceType":   设备类型
		 *                  "DeviceCode":   设备编码
		 * 					"DeviceRemark": 备注信息
		 * 				  }]}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addTemplate = function(_addTemplate, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/devicetemplate',
				type: 'POST',
				dataType: 'text',
				data: _addTemplate,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
		/**
		 * 更新模板
		 * @param _updateTemplate 更新模板
		 * 	数据类型： json list string
		 * 		  [{
		 * 				"Id": 模板Id
		 * 				"Name": 模板名称
		 * 				"DeviceRemark":  备注信息
		 * 		  }]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateTemplate = function(_updateTemplate, success_callback, fail_callback) {
			$.ajax({
				url: '/api/devicetemplate',
				type: 'PUT',
				dataType: 'text',
				data: _updateTemplate,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
		/**
		 * 删除模板
		 * @param _deleteTemplate 删除模板
		 * 	数据类型： json list string
		 * 		  [{
		 * 				"Id": 模板Id
		 * 		  }]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteTemplate = function(_deleteTemplate, success_callback, fail_callback) {
			$.ajax({
				url: '/api/devicetemplate',
				type: 'DELETE',
				dataType: 'text',
				data: _deleteTemplate,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
	}

	_undfan.TemplateVariant = function() {
		/**
		 * 获取设备模板变量列表
		 * @param _templateId 设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list 
		 * 		数据格式：[{
		 * 					"Code":   变量编码
		 * 					"Name":   变量名称
		 * 					"Type":   变量类型
		 *                  "DisplayType":  显示类型
		 * 					"DataType":  数据类型
		 * 					"Precision": 小数位数
		 * 					"Unit": 单位
		 * 					"RWFlag": 读写标识
		 * 					"Period": 采集周期
		 * 					"RangeFilter": 范围筛选
		 * 					"IsStore": 是否存储
		 * 					"RangeMin": 范围删选最小值
		 * 					"RangeMax": 范围筛选最大值
		 * 					"SlopeFilter": 斜率筛选
		 * 					"SlopeMin": 斜率筛选最小值
		 * 					"SlopeMax": 斜率筛选最大值
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getTemplateVariant = function(_templateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
//				url: '/api/devicetemplate/' + _templateId + '/variant/?Model=Template',
				url:'data/variantList.json',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
		/**
		 * 获取设备变量列表
		 * @param _templateId 设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list 
		 * 		数据格式：[{
		 * 					"Code":   变量编码
		 * 					"Name":   变量名称
		 * 					"Type":   变量类型
		 *                  "DisplayType":  显示类型
		 * 					"DataType":  数据类型
		 * 					"Precision": 小数位数
		 * 					"Unit": 单位
		 * 					"RWFlag": 读写标识
		 * 					"Period": 采集周期
		 * 					"RangeFilter": 范围筛选
		 * 					"IsStore": 是否存储
		 * 					"RangeMin": 范围删选最小值
		 * 					"RangeMax": 范围筛选最大值
		 * 					"SlopeFilter": 斜率筛选
		 * 					"SlopeMin": 斜率筛选最小值
		 * 					"SlopeMax": 斜率筛选最大值
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getDeviceVariant = function(_templateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}

			$.ajax({
//				url: '/api/devicetemplate/' + _templateId + '/variant/?Model=Device',
				url:'data/templateVariant.json',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
		
		/**
		 * 增加设备模板变量
		 * @param _addData 要增加的数据
		 *  数据类型： json list string 
		 *       [{
         *				Name:        变量名称
         *				Code:        变量编码
         *				Type:        变量类型
         *				DisplayType: 显示类型
         *				DataType:    数据类型
         *				Precision:   小数位数
         *				Unit:        单位
         *				RWFlag:      读写标识
         *				Period:      采集周期
         *				RangeFilter: 范围筛选
         *				RangeMin:    范围筛选最小值
         *				RangeMax:    范围筛选最大值
         *				SlopeFilter: 斜率筛选
         *				SlopeMin:    斜率筛选最小值
         *				SlopeMax:    斜率筛选最大值
         *				IsStore:     是否存储
		 * 		  }]
		 * @param _templateId 设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addTemplateVariant = function(_addData, _templateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/devicetemplate/' + _templateId + '/variant/',
				type: 'PUT',
				dataType: 'text',
				data: _addData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
		/**
		 * 更新设备模板变量
		 * @param _updateData
		 *  数据类型： json string
		 * 		  {update:[{
         *				Period:      采集周期
         *				RangeFilter: 范围筛选
         *				RangeMin:    范围筛选最小值
         *				SlopeFilter: 斜率筛选
         *				RangeMax:    范围筛选最大值
         *				SlopeMin:    斜率筛选最小值
         *				SlopeMax:    斜率筛选最大值
         *				IsStore:     是否存储
		 * 		  }]}
		 * @param _templateId 设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateTemplateVariant = function(_updateData, _templateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/devicetemplate/' + _templateId + '/variant/',
				type: 'POST',
				dataType: 'text',
				data: _updateData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
		/**
		 * 删除设备模板变量
		 * @param _deleteData
		 *  数据类型： json list string
		 * 		  [{
         *				Code:      变量标签
		 * 		  }]
		 * @param _templateId 设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteTemplateVariant = function(_deleteData, _templateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/devicetemplate/' + _templateId + '/variant/',
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			});
		}
	}
	
	/**
	 * 上报服务相关的接口类
	 */
	_undfan.ReportService = function() {
		/**
		 * 获取上报服务列表
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list 
		 * 		数据格式：[{
		 * 					"PlatId":   平台Id
		 * 					"Name":     平台名称
		 * 					"PlatType": 平台类型
		 *                  "Remark":   备注信息
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getReportServiceList = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/plat?Model=platlist',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		/**
		 * 获取上报服务类型列表
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list 
		 * 		数据格式：[{
		 * 					"Type":    平台类型
		 * 					"Name":    平台类型名称
		 * 					"Version": 版本
		 *                  "Author":  作者
		 *                  "LastModified":  上次修改描述
		 *                  "Description":   描述
		 * 				  }]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getReportServiceTypeList = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/plat?Model=plattypelist',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}

		/**
		 * 增加一个上报服务
		 * @param {JsonString} _addData 要增加服务信息
		 * 		数据类型： json string 
		 * 		数据格式：{
		 * 					"Name":     平台名称
		 * 					"PlatType": 平台类型
		 *                  "Remark":   备注信息
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json String 
		 * 		数据格式：{
		 * 					"PlatId":   平台Id
		 * 					"Name":     平台名称
		 * 					"PlatType": 平台类型
		 *                  "Remark":   备注信息
		 * 				}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addReportService = function(_addData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/plat',
				type: 'POST',
				dataType: 'text',
				data: _addData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		/**
		 * 修改上报服务信息
		 * @param _updateData 要更新服务信息
		 * 		数据类型： json string 
		 * 		数据格式：{
		 * 					"name":     平台名称
		 *                  "remark":   备注信息
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateReportService = function(_updateData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/plat',
				type: 'PUT',
				dataType: 'text',
				data: _updateData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		/**
		 * 删除上报服务
		 * @param _deleteData 要删除服务
		 * 		数据类型： json string 
		 * 		数据格式：{
		 * 					"platId":     平台Id
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteReportService = function(_deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/plat',
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
	}

	/**
	 * 历史日志相关的接口类
	 */
	_undfan.HistLog = function() {
		/**
		 * 按条件搜索日志 {JsonString} _searchData 搜索日志的条件
		 * 		数据类型： json string 
		 * 		数据格式：{
         *    	  StartTime: 开始时间 格式yyyy-MM-dd hh:mm
         *        EndTime  : 结束时间 格式yyyy-MM-dd hh:mm
         *        Type     : 日志类型 （1：提示；4：警告；8：严重；16：错误；31：全部）
         *	      Limit    : 一次返回最大限制，默认20
		 *        Page     : 第几页的数据
		 * 		 }
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json String 
		 * 		数据格式：{
		 * 					type        :日志类型
         *    				dataTime    :日志时间
         *    				milliSecond :毫秒
         *    				data        :日志内容
		 * 			   }
		 * @param {function} fail_callback 失败回调函数
		 */
		this.searchHistLog = function(_searchData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/histlog',
				type: 'POST',
				dataType: 'text',
				data: _searchData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}

		/**
		 * 按条件导出日志，XML格式。
		 * @param _exportData 导出日志的条件
		 * 		数据类型： json string 
		 * 		数据格式：{
         *    	  StartTime: 开始时间 格式yyyy-MM-dd hh:mm
         *        EndTime  : 结束时间 格式yyyy-MM-dd hh:mm
         *        Type     : 日志类型 （1：提示；4：警告；8：严重；16：错误；31：全部）
         *      }
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json String 
		 * 		数据格式：{
		 * 					CheckResult : true为成功；false为要导出的日志太大，需要缩小日志范围
		 * 				}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.exportHistLog = function(_exportData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/export?StartTime=' + _exportData.StartTime + '&EndTime=' + _exportData.EndTime + '&Type=' + _exportData.Type + '&Check=1',
				type: 'GET',
				dataType: 'text',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			}).always(function(jqXHR) {

			});
		}
	}

	/**
	 * 系统工具相关接口类
	 */
	_undfan.SystemTool = function() {

		/**
		 * 重启网关
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.restartSmartGate = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/restartsys?Action=1',
				type: 'GET',
				dataType: 'text',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		
		/**
		 * 重启网关服务
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.restartundfanService = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/restartsys?Action=2',
				type: 'GET',
				dataType: 'text',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		/**
		 * 确认网关或者服务是否重启成功
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.restartConfirmSuccess = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/restartsys?Action=3',
				type: 'GET',
				dataType: 'text',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function() {
				fail_callback();
			})
		}
		
		/**
		 * 获取升级结果
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json String 
		 * 		数据格式：{
		 * 					result : true为成功；
		 * 					type: 升级操作的类型，driver和system
		 * 					msg: 升级结果信息
		 * 				}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getUpdateResult = function(success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/systemupdate',
				type: 'GET',
				dataType: 'text',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(data) {
				fail_callback(data);
			})
		}

		/**
		 * 获取历史数据
		 * @param _data  参数
		 * 		数据类型： json string 
		 * 		数据格式：{
         *    	  meterId: 设备编号
         *        varCode  : 变量标签
         *        startTime: 开始时间 格式yyyy-MM-dd hh:mm
         *        endTime  : 结束时间 格式yyyy-MM-dd hh:mm
         *      }
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list String 
		 * 		数据格式：[{
		 * 					varCode : 变量标签
		 * 					value: 变量值
		 * 					varTime: 采集时间
		 * 					recordTime: 存储时间
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getHistData = function(_data, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/histdata',
				type: 'POST',
				dataType: 'text',
				data: _data,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 获取所有变量信息
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list 
		 * 		数据格式：[{
		 * 					templateId : 模板Id
		 * 					code: 变量标签
		 * 					name: 变量名称
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getAllVariant = function( success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
	
			$.ajax({
				url: '/api/histdata',
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
	}

	/**
	 * 江苏大型公建相关的接口类
	 */
	_undfan.JSDXGJ = function() {
		/**
		 * 获取JSDXGJ服务的配置信息
		 * @param {Number} _serviceId
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json  
		 * 		数据格式：{
		 * 					Ip : 远程上报平台Ip
		 * 					Port: 远程上报平台端口
		 * 					Period: 上报周期
		 * 					IsEncrypt: 上报协议是否加密
		 * 					BuildName: 建筑名称
		 * 					BuildCode: 建筑编码
		 * 					GatewayCode: 网关编码
		 * 				}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getServiceInfo = function(_serviceId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgj?platid=' + _serviceId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 更新JSDXGJ服务的配置信息
		 * @param {JsonString} _updateData 要更新的信息
		 * 		数据格式：{
		 *                  Id: 上报服务Id 
		 * 					Ip : 远程上报平台Ip
		 * 					Port: 远程上报平台端口
		 * 					Period: 上报周期
		 * 					IsEncrypt: 上报协议是否加密
		 * 					BuildName: 建筑名称
		 * 					BuildCode: 建筑编码
		 * 					GatewayCode: 网关编码
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateServiceInfo = function(_updateData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgj',
				type: 'PUT',
				dataType: 'text',
				data: _updateData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 获取JSDXGJ结点列表
		 * @param {Number} _serviceId 服务Id
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 *					Id : 结点Id 
		 * 					InterfaceId : 接口Id
		 * 					MeterId: 设备Id
		 * 					MeterName: 设备名称
		 * 					MeterNumber: 设备地址
		 * 					SubSystemId: 上报服务Id
		 * 					DataTempId: 传输模板Id
		 * 					DataTempName: 传输模板名称
		 * 					Ratio: 变比
		 * 					Code: 支路标签
		 * 					Remark: 备注信息
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getNodeList = function(_serviceId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjnode?platid=' + _serviceId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 添加JSDXGJ结点
		 * @param {JsonString} _postData
		 * 		数据格式：  
		 *            {add:[{
		 *                  InterfaceId: 接口Id
		 * 					MeterId : 设备Id
		 * 					MeterName: 设备名称
		 * 					MeterNumber: 设备地址
		 * 					SubSystemId: 上报服务Id
		 * 					Code: 支路编码
		 * 					Ratio: 变比
		 * 					Remark: 备注信息
		 * 					DataTempId: 传输模板Id
		 * 					DataTempName: 传输模板名称
		 * 				}]}
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json string
		 *            {add:[{
		 *                  NodeId: 结点Id 
		 *                  InterfaceId: 接口Id
		 * 					MeterId : 设备Id
		 * 					MeterName: 设备名称
		 * 					MeterNumber: 设备地址
		 * 					SubSystemId: 上报服务Id
		 * 					Code: 支路编码
		 * 					Ratio: 变比
		 * 					Remark: 备注信息
		 * 					DataTempId: 传输模板Id
		 * 					DataTempName: 传输模板名称
		 * 			   }]}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addNode = function(_postData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjnode',
				type: 'POST',
				dataType: 'text',
				data: _postData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}		
		/**
		 * 更新JSDXGJ结点信息
		 * @param {JsonString} _putData
		 * 		数据格式：  
		 *            {update:[{
		 *                  Code: 支路编码
		 * 					MeterId : 设备编号
		 * 					DataTempId: 传输模板Id
		 * 					Remark: 备注信息
		 * 					Ratio: 变比
		 * 					SusSystemId: 上报服务Id
		 * 					NodeId: 结点Id
		 * 				}]}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateNode = function(_putData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjnode',
				type: 'PUT',
				dataType: 'text',
				data: _putData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 删除JSDXGJ结点
		 * @param  _deleteData
		 * 		数据格式：  json list string
		 *            [{
		 *                  Id: 结点Id
		 * 			   }]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteNode = function(_deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjnode',
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		
		/**
		 * 获取JSDXGJ上报服务传输模板
		 * @param {Number}  _serviceId 参数
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 *					dataTemplateId : 传输模板Id
		 * 					subSystemId : 上报服务Id
		 * 					dataTemplateName: 传输模板名称
		 * 					deviceTemplateId: 设备模板Id
		 * 					deviceTemplateName: 设备模板名称
		 * 					remark: 备注信息
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getDataTemplateList = function(_serviceId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjdatatemplate?platid=' + _serviceId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 添加JSDXGJ传输模板
		 * @param {JsonString} _postData
		 * 		数据格式：  
		 *            {
		 *                  name: 传输模板名称
		 * 					templateId : 设备模板Id
		 * 					subSystemId: 上报服务Id
		 * 					remark: 备注信息
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json string
		 *            {
		 *					dataTemplateId : 传输模板Id
		 * 					subSystemId : 上报服务Id
		 * 					dataTemplateName: 传输模板名称
		 * 					deviceTemplateId: 设备模板Id
		 * 					deviceTemplateName: 设备模板名称
		 * 					remark: 备注信息
		 * 			   }
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addDataTemplate = function(_postData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjdatatemplate',
				type: 'POST',
				dataType: 'text',
				data: _postData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}		
		/**
		 * 更新JSDXGJ传输模板
		 * @param {JsonString} _putData
		 * 		数据格式：  
		 *            {
		 *                  name: 传输模板名称
		 * 					remark : 备注信息
		 * 					id: 传输模板Id
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateDataTemplate = function(_putData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjdatatemplate',
				type: 'PUT',
				dataType: 'text',
				data: _putData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 删除JSDXGJ传输模板
		 * @param  _deleteData
		 * 		数据格式：  json string
		 *            {
		 *                  Id: 传输模板Id
		 * 			  }
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteDataTemplate = function(_deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjdatatemplate',
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		
		/**
		 * 获取JSDXGJ上报服务传输模板变量列表
		 * @param {Number}  _dataTemplateId 传输模板Id
		 * @param {Number}  _deviceTemplateId 设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 *					Id :         变量Id
		 * 					Name :       变量名称
		 * 					VariantCode: 变量标签
		 * 					Code:        测量点标签
		 * 					EnergyCode:  能源编码
		 * 					Remark:      备注信息
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getDataTemplateVariantList = function(_dataTemplateId, _deviceTemplateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjdataTemplateVariant?datatemplate=' + _dataTemplateId + '&devicetemplate=' + _deviceTemplateId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 添加JSDXGJ传输模板变量
		 * @param  _postData
		 * 		数据格式： json list string  
		 *            [{
		 *                  DataTemplateId: 传输模板Id
		 * 					Name : 传输模板名称
		 * 					VariantCode: 变量标签
		 * 					Code: 测量点标签
		 * 					EnergyCode: 能源编码
		 * 					Remark: 备注信息
		 * 				}]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addDataTemplateVariant = function(_postData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjdataTemplateVariant',
				type: 'POST',
				dataType: 'text',
				data: _postData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}		
		/**
		 * 更新JSDXGJ传输模板变量
		 * @param {Number}  _dataTemplateId 传输模板Id
		 * @param {JsonString} _putData
		 * 		数据格式：  
		 *            {update:[{
		 *                  code:        测量点标签
		 * 					reMark :     备注信息
		 * 					energyCode:  能源编码
		 *                  variantCode: 变量标签
		 * 			   }]}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateDataTemplateVariant = function(_dataTemplateId, _putData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjdataTemplateVariant?datatemplate=' + _dataTemplateId,
				type: 'PUT',
				dataType: 'text',
				data: _putData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 删除JSDXGJ传输模板变量
		 * @param {Number}  _dataTemplateId 传输模板Id
		 * @param  _deleteData
		 * 		数据格式：  json string
		 *            {
		 *                  Code: 变量标签
		 * 			  }
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteDataTemplateVariant = function(_dataTemplateId, _deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/jsdxgjdataTemplateVariant?datatemplate=' + _dataTemplateId,
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
	}

	/**
	 * FrontView相关的接口类
	 */
	_undfan.FrontView = function() {
		/**
		 * 获取SST服务的配置信息
		 * @param {Number} _serviceId
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json  
		 * 		数据格式：{
		 * 					Ip : 远程上报平台Ip
		 * 					Port: 远程上报平台端口
		 * 					Period: 上报周期
		 * 				}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getServiceInfo = function(_serviceId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/sst?platid=' + _serviceId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 更新SST服务的配置信息
		 * @param {JsonString} _updateData 要更新的信息
		 * 		数据格式：{
		 *                  Id: 上报服务Id 
		 * 					Ip : 远程上报平台Ip
		 * 					Port: 远程上报平台端口
		 * 					Period: 上报周期
		 * 					Timeout: 离线超时
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateServiceInfo = function(_updateData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/sst',
				type: 'PUT',
				dataType: 'text',
				data: _updateData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		
		/**
		 * 获取SST结点列表
		 * @param {Number} _serviceId 服务Id
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 *					Id : 结点Id 
		 * 					InterfaceId : 接口Id
		 * 					MeterId: 设备Id
		 * 					MeterName: 设备名称
		 * 					MeterNumber: 设备地址
		 * 					SubSystemId: 上报服务Id
		 * 					DataTempId: 传输模板Id
		 * 					DataTempName: 传输模板名称
		 * 					Code: 结点标签
		 * 					Remark: 备注信息
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getNodeList = function(_serviceId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/node?platid=' + _serviceId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 添加SST结点
		 * @param {JsonString} _postData
		 * 		数据格式：  
		 *            {add:[{
		 *                  InterfaceId: 接口Id
		 * 					MeterId : 设备Id
		 * 					MeterName: 设备名称
		 * 					MeterNumber: 设备地址
		 * 					SubSystemId: 上报服务Id
		 * 					Code: 结点标签
		 * 					Remark: 备注信息
		 * 					DataTempId: 传输模板Id
		 * 					DataTempName: 传输模板名称
		 * 				}]}
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json string
		 *            {add:[{
		 *					Id : 结点Id 
		 *                  InterfaceId: 接口Id
		 * 					MeterId : 设备Id
		 * 					MeterName: 设备名称
		 * 					MeterNumber: 设备地址
		 * 					SubSystemId: 上报服务Id
		 * 					Code: 结点标签
		 * 					Remark: 备注信息
		 * 					DataTempId: 传输模板Id
		 * 					DataTempName: 传输模板名称
		 * 			   }]}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addNode = function(_postData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/node',
				type: 'POST',
				dataType: 'text',
				data: _postData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}		
		/**
		 * 更新SST结点信息
		 * @param {JsonString} _putData
		 * 		数据格式：  
		 *            {update:[{
		 *                  Code: 结点标签
		 * 					MeterId : 设备编号
		 * 					DataTempId: 传输模板Id
		 * 					Remark: 备注信息
		 * 					SusSystemId: 上报服务Id
		 * 					NodeId: 结点Id
		 * 				}]}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateNode = function(_putData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/node',
				type: 'PUT',
				dataType: 'text',
				data: _putData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 删除SST结点
		 * @param  _deleteData
		 * 		数据格式：  json list string
		 *            [{
		 *                  Id: 结点Id
		 * 			   }]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteNode = function(_deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/node',
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 获取SST上报服务传输模板
		 * @param {Number}  _serviceId 参数
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 *					dataTemplateId : 传输模板Id
		 * 					subSystemId : 上报服务Id
		 * 					dataTemplateName: 传输模板名称
		 * 					deviceTemplateId: 设备模板Id
		 * 					deviceTemplateName: 设备模板名称
		 * 					remark: 备注信息
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getDataTemplateList = function(_serviceId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/datatemplate?platid=' + _serviceId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 添加SST传输模板
		 * @param {JsonString} _postData
		 * 		数据格式：  
		 *            {
		 *                  name: 传输模板名称
		 * 					templateId : 设备模板Id
		 * 					subSystemId: 上报服务Id
		 * 					remark: 备注信息
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json string
		 *            {
		 *					dataTemplateId : 传输模板Id
		 * 					subSystemId : 上报服务Id
		 * 					dataTemplateName: 传输模板名称
		 * 					deviceTemplateId: 设备模板Id
		 * 					deviceTemplateName: 设备模板名称
		 * 					remark: 备注信息
		 * 			   }
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addDataTemplate = function(_postData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/datatemplate',
				type: 'POST',
				dataType: 'text',
				data: _postData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}		
		/**
		 * 更新SST传输模板
		 * @param {JsonString} _putData
		 * 		数据格式：  
		 *            {
		 *                  name: 传输模板名称
		 * 					remark : 备注信息
		 * 					id: 传输模板Id
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateDataTemplate = function(_putData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/datatemplate',
				type: 'PUT',
				dataType: 'text',
				data: _putData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 删除SST传输模板
		 * @param  _deleteData
		 * 		数据格式：  json string
		 *            {
		 *                  Id: 传输模板Id
		 * 			  }
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteDataTemplate = function(_deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/datatemplate',
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		
		/**
		 * 获取SST上报服务传输模板变量列表
		 * @param {Number}  _dataTemplateId 传输模板Id
		 * @param {Number}  _deviceTemplateId 设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 * 					Name :       变量名称
		 * 					VariantCode: 变量标签
		 * 					Code:        测量点标签
		 * 					HistReport:  是否上报历史数据
		 * 					StepChange:  阶跃阈值
		 * 					SlopeChange: 斜率阈值
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getDataTemplateVariantList = function(_dataTemplateId, _deviceTemplateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/dataTemplateVariant?datatemplate=' + _dataTemplateId + '&devicetemplate=' + _deviceTemplateId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 添加SST传输模板变量
		 * @param  _postData
		 * 		数据格式： json list string  
		 *            [{
		 *                  DataTemplateId: 传输模板Id
		 * 					Name : 传输模板名称
		 * 					VariantCode: 变量标签 (不可修改)
		 * 					Code: 变量标签 (可修改)
		 * 					HistReport:  是否上报历史数据
		 * 					StepChange:  阶跃阈值
		 * 					SlopeChange: 斜率阈值
		 * 				}]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addDataTemplateVariant = function(_postData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/dataTemplateVariant',
				type: 'POST',
				dataType: 'text',
				data: _postData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}		
		/**
		 * 更新SST传输模板变量
		 * @param {Number}  _dataTemplateId 传输模板Id
		 * @param {JsonString} _putData
		 * 		数据格式：  
		 *            {update:[{
		 *                  code:          变量标签 (可修改)
		 * 					histReport :   是否上报历史数据
		 * 					StepChange:  阶跃阈值
		 * 					SlopeChange: 斜率阈值
		 * 					variantCode: 变量标签 (不可修改)
		 * 			   }]}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateDataTemplateVariant = function(_dataTemplateId, _putData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/dataTemplateVariant?datatemplate=' + _dataTemplateId,
				type: 'PUT',
				dataType: 'text',
				data: _putData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 删除SST传输模板变量
		 * @param {Number}  _dataTemplateId 传输模板Id
		 * @param  _deleteData
		 * 		数据格式：  json string
		 *            {
		 *                  Code: 变量标签
		 * 			  }
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteDataTemplateVariant = function(_dataTemplateId, _deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/dataTemplateVariant?datatemplate=' + _dataTemplateId,
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
	}
	
	/**
	 * STLServer智能物联网平台相关的接口类
	 */
	_undfan.STLServer = function() {
		/**
		 * 获取STL服务的配置信息
		 * @param {Number} _serviceId
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json  
		 * 		数据格式：{
		 * 					Ip : 远程上报平台Ip
		 * 					Port: 远程上报平台端口
		 * 					Period: 上报周期
		 * 				}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getServiceInfo = function(_serviceId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stl?platid=' + _serviceId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 更新STL服务的配置信息
		 * @param {JsonString} _updateData 要更新的信息
		 * 		数据格式：{
		 *                  Id: 上报服务Id 
		 * 					Ip : 远程上报平台Ip
		 * 					Port: 远程上报平台端口
		 * 					Period: 上报周期
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateServiceInfo = function(_updateData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stl',
				type: 'PUT',
				dataType: 'text',
				data: _updateData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		
		/**
		 * 获取STL结点列表
		 * @param {Number} _serviceId 服务Id
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 *					Id : 结点Id 
		 * 					InterfaceId : 接口Id
		 * 					MeterId: 设备Id
		 * 					MeterName: 设备名称
		 * 					MeterNumber: 设备地址
		 * 					SubSystemId: 上报服务Id
		 * 					DataTempId: 传输模板Id
		 * 					DataTempName: 传输模板名称
		 * 					Code: 结点标签
		 * 					Remark: 备注信息
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getNodeList = function(_serviceId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlNode?platid=' + _serviceId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 添加STL结点
		 * @param {JsonString} _postData
		 * 		数据格式：  
		 *            {add:[{
		 *                  InterfaceId: 接口Id
		 * 					MeterId : 设备Id
		 * 					MeterName: 设备名称
		 * 					MeterNumber: 设备地址
		 * 					SubSystemId: 上报服务Id
		 * 					Code: 结点标签
		 * 					Remark: 备注信息
		 * 					DataTempId: 传输模板Id
		 * 					DataTempName: 传输模板名称
		 * 				}]}
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json string
		 *            {add:[{
		 *					Id : 结点Id 
		 *                  InterfaceId: 接口Id
		 * 					MeterId : 设备Id
		 * 					MeterName: 设备名称
		 * 					MeterNumber: 设备地址
		 * 					SubSystemId: 上报服务Id
		 * 					Code: 结点标签
		 * 					Remark: 备注信息
		 * 					DataTempId: 传输模板Id
		 * 					DataTempName: 传输模板名称
		 * 			   }]}
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addNode = function(_postData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlNode',
				type: 'POST',
				dataType: 'text',
				data: _postData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}		
		/**
		 * 更新STL结点信息
		 * @param {JsonString} _putData
		 * 		数据格式：  
		 *            {update:[{
		 *                  Code: 结点标签
		 * 					MeterId : 设备编号
		 * 					DataTempId: 传输模板Id
		 * 					Remark: 备注信息
		 * 					SusSystemId: 上报服务Id
		 * 					NodeId: 结点Id
		 * 				}]}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateNode = function(_putData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlNode',
				type: 'PUT',
				dataType: 'text',
				data: _putData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 删除STL结点
		 * @param  _deleteData
		 * 		数据格式：  json list string
		 *            [{
		 *                  Id: 结点Id
		 * 			   }]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteNode = function(_deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlNode',
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 获取STL上报服务传输模板
		 * @param {Number}  _serviceId 参数
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 *					dataTemplateId : 传输模板Id
		 * 					subSystemId : 上报服务Id
		 * 					dataTemplateName: 传输模板名称
		 * 					deviceTemplateId: 设备模板Id
		 * 					deviceTemplateName: 设备模板名称
		 * 					remark: 备注信息
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getDataTemplateList = function(_serviceId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlDataTemplate?platid=' + _serviceId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 添加STL传输模板
		 * @param {JsonString} _postData
		 * 		数据格式：  
		 *            {
		 *                  name: 传输模板名称
		 * 					templateId : 设备模板Id
		 * 					subSystemId: 上报服务Id
		 * 					remark: 备注信息
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json string
		 *            {
		 *					dataTemplateId : 传输模板Id
		 * 					subSystemId : 上报服务Id
		 * 					dataTemplateName: 传输模板名称
		 * 					deviceTemplateId: 设备模板Id
		 * 					deviceTemplateName: 设备模板名称
		 * 					remark: 备注信息
		 * 			   }
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addDataTemplate = function(_postData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlDataTemplate',
				type: 'POST',
				dataType: 'text',
				data: _postData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}		
		/**
		 * 更新STL传输模板
		 * @param {JsonString} _putData
		 * 		数据格式：  
		 *            {
		 *                  name: 传输模板名称
		 * 					remark : 备注信息
		 * 					id: 传输模板Id
		 * 				}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateDataTemplate = function(_putData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlDataTemplate',
				type: 'PUT',
				dataType: 'text',
				data: _putData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 删除STL传输模板
		 * @param  _deleteData
		 * 		数据格式：  json string
		 *            {
		 *                  Id: 传输模板Id
		 * 			  }
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteDataTemplate = function(_deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlDataTemplate',
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		
		/**
		 * 获取STL上报服务传输模板变量列表
		 * @param {Number}  _dataTemplateId 传输模板Id
		 * @param {Number}  _deviceTemplateId 设备模板Id
		 * @param {function} success_callback 成功回调函数
		 * 		回调函数返回数据类型： json list
		 * 		数据格式：[{
		 * 					Name :       变量名称
		 * 					VariantCode: 变量标签
		 * 					Code:        测量点标签
		 * 					HistReport:  是否上报历史数据
		 * 					StepChange:  阶跃阈值
		 * 					SlopeChange: 斜率阈值
		 * 				}]
		 * @param {function} fail_callback 失败回调函数
		 */
		this.getDataTemplateVariantList = function(_dataTemplateId, _deviceTemplateId, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlDataTemplateVariant?datatemplate=' + _dataTemplateId + '&devicetemplate=' + _deviceTemplateId,
				type: 'GET',
				dataType: 'json',
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 添加STL传输模板变量
		 * @param  _postData
		 * 		数据格式： json list string  
		 *            [{
		 *                  DataTemplateId: 传输模板Id
		 * 					Name : 传输模板名称
		 * 					VariantCode: 变量标签 (不可修改)
		 * 					Code: 变量标签 (可修改)
		 * 					HistReport:  是否上报历史数据
		 * 					StepChange:  阶跃阈值
		 * 					SlopeChange: 斜率阈值
		 * 				}]
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.addDataTemplateVariant = function(_postData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlDataTemplateVariant',
				type: 'POST',
				dataType: 'text',
				data: _postData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}		
		/**
		 * 更新STL传输模板变量
		 * @param {Number}  _dataTemplateId 传输模板Id
		 * @param {JsonString} _putData
		 * 		数据格式：  
		 *            {update:[{
		 *                  code:          变量标签 (可修改)
		 * 					histReport :   是否上报历史数据
		 * 					StepChange:  阶跃阈值
		 * 					SlopeChange: 斜率阈值
		 * 					variantCode: 变量标签 (不可修改)
		 * 			   }]}
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.updateDataTemplateVariant = function(_dataTemplateId, _putData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlDataTemplateVariant?datatemplate=' + _dataTemplateId,
				type: 'PUT',
				dataType: 'text',
				data: _putData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
		/**
		 * 删除STL传输模板变量
		 * @param {Number}  _dataTemplateId 传输模板Id
		 * @param  _deleteData
		 * 		数据格式：  json string
		 *            {
		 *                  Code: 变量标签
		 * 			  }
		 * @param {function} success_callback 成功回调函数
		 * @param {function} fail_callback 失败回调函数
		 */
		this.deleteDataTemplateVariant = function(_dataTemplateId, _deleteData, success_callback, fail_callback) {
			if(!$.isFunction(success_callback) || !$.isFunction(fail_callback)) {
				console.log('回调函数类型有误！');
				fail_callback();
				return;
			}
			$.ajax({
				url: '/api/stlDataTemplateVariant?datatemplate=' + _dataTemplateId,
				type: 'DELETE',
				dataType: 'text',
				data: _deleteData,
				async: true
			}).done(function(data, textStatus, jqXHR) {
				success_callback(data, textStatus, jqXHR);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				fail_callback();
			});
		}
	}

}(jQuery));