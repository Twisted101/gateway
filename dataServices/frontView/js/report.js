(function($) {
	if(!window.FV) {
		window.FV = {};
	}
	var Report = function() {
		var _report = this;
		this.reportList = [];
		this.reportListKO = ko.observableArray();
		this.parseReportList = function(item) {
			var _tmp = {};
			_tmp.addressSev = ko.observable(item.addressSev);
			_tmp.id = ko.observable(item.id);
			_tmp.infoSev = ko.observable(item.infoSev);
			_tmp.portSev = ko.observable(item.portSev);
			_tmp.szCode = ko.observable(item.szCode);
			_tmp.timeSev = ko.observable(item.timeSev);
			_tmp.nameSev = ko.observable(item.nameSev);
			if(item.onLine == true) {
				_tmp.showinlinesev = true;
				_tmp.showoutlinesev = false;
			} else {
				_tmp.showinlinesev = false;
				_tmp.showoutlinesev = true;
			}
			return _tmp;
		};
		this.openReport = function() {
			$.ajax({
				url: '../frontView/template/report.html',
				dataType: "html",
				cache: true,
				async: false
			}).done(function(data, textStatus, jqXHR) {
				$('body').append(data);
				FV.changePage.showTemplate(false);
				FV.changePage.showTemplateTable(false);
				FV.changePage.showReport(true);
				FV.changePage.showReportTable(false);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("不能加载上报服务HTML文件");
			});
			$.ajax({
				url: 'data/reportServer.json',
				type: 'GET',
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					_report.reportList = data;
					_report.reportListKO.removeAll();
					$.each(_report.reportList, function(index, value) {
						_report.reportListKO.push(_report.parseReportList(value));
					});

				},
				error: function() {
					console.log('请求失败')
				}
			});
		};
		this.addReport = function() {
			$('#addReport').modal('show');
		};
		this.editReport = function() {

		};
		this.deleteReport = function() {

		};

	};

	FV.report = new Report();
}(jQuery))