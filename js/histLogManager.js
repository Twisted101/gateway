(function($) {
	var HistLogManager = function() {
		var _histLogManager = this;

		var _pattern = /^\/histLogManager\/?$/;

		undfan.routeItem.call(this, {
			htmlUrl: 'template/histLogManager.html',
			pattern: _pattern,
			templateId: 'template-histLogManager'
		});

		this.startDate = ko.observable();
		this.endDate = ko.observable();
		this.logType = ko.observable('全部');
		this.logTypeValue = ko.observable(31);
		this.hasNext = ko.observable(false);
		this.logCurPage = ko.observable(1);
		//把接受数据转化为表格数据
		this.parseData = function(item) {
			var _item = {};
			_item.logType = function() {
				switch(item.type) {
					case 2:
						return "提示";
						break;
					case 4:
						return "警告";
						break;
					case 8:
						return "严重";
						break;
					case 16:
						return "错误";
						break;
					default:
						return "全部";
						break;
				}
			}();
			_item.logTime = item.dataTime + "(" + item.milliSecond + ")";
			_item.logValue = item.data;
			return _item;
		}

		this.bind('init', function() {

		});

		this.bind('show', function(strUrl) {
			undfan.route.changeItem(_histLogManager);
			$('#hisLogManagerTable').bootstrapTable();
			var _now = new Date();
			_now.addHours(2);
			_histLogManager.endDate(_now.format("yyyy-MM-dd hh:mm"));
			_now.addHours(-4);
			_histLogManager.startDate(_now.format("yyyy-MM-dd hh:mm"));
		});

		this.bind('afterRender', function() {
			//初始化时间控件
			$('#history-log-start-date').datetimepicker({
				language: 'zh-CN',
				format: "yyyy-mm-dd hh:ii",
				autoclose: true,
				todayBtn: true,
				pickerPosition: "bottom-right"
			});
			$('#history-log-end-date').datetimepicker({
				language: 'zh-CN',
				format: "yyyy-mm-dd hh:ii",
				autoclose: true,
				todayBtn: true,
				pickerPosition: "bottom-right"
			});
		});
		this.logTypeSelect = function(type) {
			switch(type) {
				case 2:
					_histLogManager.logType("提示");
					_histLogManager.logTypeValue(2);
					break;
				case 4:
					_histLogManager.logType("警告");
					_histLogManager.logTypeValue(4);
					break;
				case 8:
					_histLogManager.logType("严重");
					_histLogManager.logTypeValue(8);
					break;
				case 16:
					_histLogManager.logType("错误");
					_histLogManager.logTypeValue(16);
					break;
				default:
					_histLogManager.logType("全部");
					_histLogManager.logTypeValue(31);
					break;
			}
		}

		//模拟查询的数据
		var hisLogManagerData = [{
			"data": "接口(串口1)的命令间隔为:100",
			"dataTime": "2017-08-28 09:46:21",
			"milliSecond": 238,
			"type": 2
		}, {
			"data": "Open Serial Port : true",
			"dataTime": "2017-08-28 09:46:21",
			"milliSecond": 270,
			"type": 2
		}, {
			"data": "接口(串口2)的命令间隔为:100",
			"dataTime": "2017-08-28 09:46:21",
			"milliSecond": 271,
			"type": 2
		}, {
			"data": "Open Serial Port : true",
			"dataTime": "2017-08-28 09:46:21",
			"milliSecond": 272,
			"type": 2
		}];
		//AJAX请求
		this.lastLogItem = null;
		var _histLogApi = new undfan.HistLog();

		this.postDataAjax = function(postData) {
			_histLogApi.searchHistLog(ko.utils.stringifyJson(postData), function(data, textStatus, jqXHR) {
				data = $.parseJSON(data);
				if(0 == data.Data.length) {
					console.log('没查询的项')
					return;
				}
				$.each(data.Data, function(index, value) {
					_histLogManager.histLogList.push(_logManager.parseData(value));
				});
			}, function() {
				toastr.warning('获取日志信息失败', '提示：', {
					timeOut: 5000,
					closeButton: true,
					progressBar: true
				});
			});
		}
		//查询
		var _histLogList = [];
		this.serchLog = function() {
			_histLogList = [];
			var _postData = {};
			_postData.StartTime = _histLogManager.startDate();
			_postData.EndTime = _histLogManager.endDate();
			_postData.Type = _histLogManager.logTypeValue();
			_histLogManager.postDataAjax(_postData);
			for(var i = 0; i < hisLogManagerData.length; i++) {
				_histLogList.push(_histLogManager.parseData(hisLogManagerData[i]))
			}
			console.log(_histLogList);
			$('#hisLogManagerTable').bootstrapTable('append', _histLogList);
		}

		//导出
		this.exportLog = function() {
			var _postData = {};
			_postData.StartTime = _histLogManager.startDate();
			_postData.EndTime = _histLogManager.endDate();
			_postData.Type = _histLogManager.logTypeValue();
			_histLogApi.exportHistLog(_postData, function(data, textStatus, jqXHR) {
				data = $.parseJSON(data);
				if(1 == data.CheckResult) {
					window.location.href = '/api/export?StartTime=' + _postData.StartTime + '&EndTime=' + _postData.EndTime + '&Type=' + _postData.Type + '&Check=0';

				} else {
					toastr.warning('要导出的日志过大，请缩小筛选范围', '提示：', {
						timeOut: 5000,
						closeButton: true,
						progressBar: true
					});
				}
			}, function() {
				toastr.warning('导出日志失败', '提示：', {
					timeOut: 5000,
					closeButton: true,
					progressBar: true
				});
			});
		}

		this.bind('hide', function(strUrl) {

		});

	}

	//创建该模块
	undfan.histLogManager = new HistLogManager();

	//把该模块添加到系统中
	undfan.route.add(undfan.histLogManager);

}(jQuery));