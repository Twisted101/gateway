(function($) {

	//时间对象增加方法
	Date.prototype.addHours = function(nHours) {
		this.setTime(this.getTime() + nHours * 60 * 60 * 1000);
	}
	Date.prototype.format = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"q+": Math.floor((this.getMonth() + 3) / 3),
			"S": this.getMilliseconds()
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

	//KO对象
	function serchHistDataModel() {
		this.interfaceList = [{
			"interfaceId": "1",
			"interfaceName": "本地串口1"
		}, {
			"interfaceId": "2",
			"interfaceName": "本地串口2"
		}];
//		this.MeterList = ko.computed(function() {
//			var _tmp = [];
//			$.each(SG.deviceMeterList(), function(index, value) {
//				if(value.InterfaceId() == _histDataConfirmView.InterfaceId()) {
//					_tmp.push(value);
//				}
//			});
//			return _tmp;
//		});
		this.MeterList = [{
			"Name": "Name1",
			"MeterId": 1
		}, {
			"Name": "Name2",
			"MeterId": 2
		}];
		this.VariantList = [{
			"name": "设备1",
			"varId": 1
		}, {
			"name": "设备2",
			"varId": 2
		}];
		this.InterfaceId = ko.observable();
		this.MeterId = ko.observable();
		this.varId = ko.observable();
		//生成模态框
		$('#serchHistDataModal').modal('show');
		this.startDate = ko.observable();
		this.endDate = ko.observable();
		//生成时间选择控件
		$('#history-data-start-date').datetimepicker({
			language: 'zh-CN',
			format: "yyyy-mm-dd hh:ii",
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-right"
		});
		$('#history-data-end-date').datetimepicker({
			language: 'zh-CN',
			format: "yyyy-mm-dd hh:ii",
			autoclose: true,
			todayBtn: true,
			pickerPosition: "bottom-right"
		});
		var _now = new Date();
		_now.addHours(2);
		this.endDate(_now.format("yyyy-MM-dd hh:mm"));
		_now.addHours(-4);
		this.startDate(_now.format("yyyy-MM-dd hh:mm"));

		$('#serchHistDataTable').bootstrapTable();
		this.serchLog = function() {

		};

		this.closeModal = function() {
			$('#serchHistDataModal').on('hidden.bs.modal', function(e) {
				var iframeDom = window.parent.document.getElementById('iframeDom');
				iframeDom.style.visibility = 'hidden';
				iframeDom.setAttribute('src', '')
			})
		}
	}
	ko.applyBindings(new serchHistDataModel());
}(jQuery));