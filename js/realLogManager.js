(function($) {
	var RealLogManager = function() {
		var _realLogManager = this;

		var _pattern = /^\/realLogManager\/?$/;

		undfan.routeItem.call(this, {
			htmlUrl: 'template/realLogManager.html',
			pattern: _pattern,
			templateId: 'template-realLogManager'
		});
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

		var nTimeManager = null;
		var realLogManagerData = []; //表格使用的数据s
		var RLMObject = {}; //模拟请求接收到的数据
		
		
		var postDataAjax = function(){
			var hisLogManagerData = [{
					"data": "接口(串口1)的命令间隔为:100",
					"dataTime": "2017-08-28 09:46:21",
					"milliSecond": 238,
					"type": 1
				}, {
					"data": "Open Serial Port : true",
					"dataTime": "2017-08-28 09:46:21",
					"milliSecond": 270,
					"type": 2
				}];
				for(var i = 0; i < hisLogManagerData.length; i++) {
					realLogManagerData.unshift(_realLogManager.parseData(hisLogManagerData[i]))
				}
				$('#realLogManagerTable').bootstrapTable('load', realLogManagerData);
		};


		this.bind('show', function(strUrl) {
			undfan.route.changeItem(_realLogManager);
			$('#realLogManagerTable').bootstrapTable();
		});
		this.bind('afterRender', function() {

		});

		this.getData = function() {
			clearInterval(nTimeManager);
			postDataAjax();
			nTimeManager = setInterval(postDataAjax, 5000)
		};
		this.stopGetData = function(){
			clearInterval(nTimeManager)
		}
		this.clearData = function(){
			$('#realLogManagerTable').bootstrapTable('removeAll');
		}


		this.bind('hide', function(strUrl) {
			clearInterval(nTimeManager);
			$('#realLogManagerTable').bootstrapTable('removeAll');
		});

	}

	//创建该模块
	undfan.realLogManager = new RealLogManager();

	//把该模块添加到系统中
	undfan.route.add(undfan.realLogManager);

}(jQuery));