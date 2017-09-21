(function($) {
	if(!window.FV) {
		window.FV = {}
	};
	var ReportTable = function() {
		var _reportTable = this;
		this.deviceList = [];
		this.nodeList = [];
		this.reportTableList = []; //表格数据
		this.title = ko.observable('xx');

		this.openReportTable = function(item) {
			$.ajax({
				url: '../frontView/template/reportTable.html',
				dataType: "html",
				cache: true,
				async: false
			}).done(function(data, textStatus, jqXHR) {
				$('body').append(data);
				FV.changePage.showTemplate(false);
				FV.changePage.showTemplateTable(false);
				FV.changePage.showReport(false);
				FV.changePage.showReportTable(true);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("不能加载上报服务表格HTML文件");
			});

			var deviceListAJAX = $.ajax({
				url: 'data/deviceList.json',
				type: 'GET',
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {},
				error: function() {
					console.log('请求失败')
				}
			});

			var nodeListAJAX = $.ajax({
				url: 'data/nodeList.json',
				type: 'GET',
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {},
				error: function() {
					console.log('请求失败')
				}
			});

			$.when(deviceListAJAX, nodeListAJAX).done(function(deviceList, nodeList) {
				_reportTable.reportTableList = [];
				var dataTemplate = FV.template.dataTemplate;
				_reportTable.deviceList = deviceList[0];
				_reportTable.nodeList = nodeList[0];
				for(var i = 0; i < _reportTable.deviceList.length; i++) {
					var _tmp = {};
					_tmp.deviceFullName = _reportTable.deviceList[i].deviceFullName; //设备名称
					_tmp.deviceNumber = _reportTable.deviceList[i].deviceNumber; //设备标签
					_tmp.collectName = _reportTable.deviceList[i].collectName; //采集单元
					var deviceId = _reportTable.deviceList[i].deviceId;
					for(var j = 0; j < _reportTable.nodeList.length; j++) {
						var nodeCode;
						var remark;
						if(deviceId == _reportTable.nodeList[j].deviceId) {
							_tmp.nodeCode = _reportTable.nodeList[j].code; //结点标签
							_tmp.remark = _reportTable.nodeList[j].remark; //备注信息
						}
					};
					var devTemplateId = _reportTable.nodeList[i].dataTemplateId;
					for(var k = 0; k < dataTemplate.length; k++) {
						var devTemplate;
						if(devTemplateId == dataTemplate[k].id) {
							_tmp.devTemplate = dataTemplate[k].devTemplate; //传输模板
						}
					};
					_reportTable.reportTableList.push(_tmp);
				};
				$('#templateTable').bootstrapTable({'data':_reportTable.reportTableList})
			})

		}
	};
	FV.reportTable = new ReportTable;
}(jQuery))