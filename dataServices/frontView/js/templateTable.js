(function($) {
	if(!window.FV) {
		window.FV = {}
	};
	var TemplateTable = function() {
		var _templateTable = this;
		this.templateID = ''; //点击的传输模板的ID
		this.templateTableTitle = ko.observable('');
		this.dataTemplateVariant = []; //模板数据列表
		this.deviceVariantList = []; //设备变量与变量标签列表
		this.templateTableList = []; //表格的列表
		this.nameSelectList = ko.observableArray();
		this.editOption = {
			"editNone": ko.observable(true),
			"editOne": ko.observable(false),
			"editMulti": ko.observable(false)
		};
		this.addTemTabItem = {
			"name": ko.observable(''),
			"deviceCode": ko.observable(''),
			"histReport": ko.observable(false),
			"stepChangeThreshold": ko.observable(''),
			"slopeChangeThreshold": ko.observable('')
		};
		this.addAllTemTabItem = {
			"histReport": ko.observable(false),
			"stepChangeThreshold": ko.observable(''),
			"slopeChangeThreshold": ko.observable('')
		};
		this.editCheck = {
			"histReport": ko.observable(false),
			"step": ko.observable(false),
			"slope": ko.observable(false)
		};
		this.editTemTabItem = {
			"histReport": false,
			"stepChangeThreshold": '',
			"slopeChangeThreshold": ''
		};
		//整合2个list的数据到新数组 用于表格
		var parseTemplateTableList = function(data, name) {
			_templateTable.templateTableList = [];
			for(var i = 0; i < data.length; i++) {
				var _tmp = {};
				_tmp.deviceCode = data[i].deviceCode;
				_tmp.histReport = data[i].histReport;
				_tmp.stepChangeThreshold = data[i].stepChangeThreshold;
				_tmp.slopeChangeThreshold = data[i].slopeChangeThreshold;
				for(var j = 0; j < name.length; j++) {
					if(data[i].deviceCode == name[j].code) {
						_tmp.name = name[j].name;
					}
				}
				_templateTable.templateTableList.push(_tmp);
			}
		};

		//将添加变量下拉数组变成KO数组
		var parseNameSelectList = function(list) {
			for(var i = 0; i < list.length; i++) {
				var _tmp = {
					"name": ko.observable(list[i].name),
					"deviceCode": ko.observable(list[i].code)
				};
				_templateTable.nameSelectList.push(_tmp)
			}
		};

		//获取添加变量时的设备变量下拉
		var getNameSelectList = function(nowList, nameList) {
			_templateTable.nameSelectList.removeAll();
			for(var i = 0; i < nameList.length; i++) {
				var _tmp = {};
				for(var j = 0; j < nowList.length; j++) {
					if(nameList[i].code == nowList[j].deviceCode) {
						nameList.splice(i, 1)
					}
				}
			}
			parseNameSelectList(nameList);
		};

		this.openTemplateTable = function(item) {
			_templateTable.templateID = item.id();
			$.ajax({
				url: '../frontView/template/templateTable.html',
				dataType: "html",
				cache: true,
				async: false
			}).done(function(data, textStatus, jqXHR) {
				$('body').append(data);
				FV.changePage.showTemplate(false);
				FV.changePage.showTemplateTable(true);
				FV.changePage.showReport(false);
				FV.changePage.showReportTable(false);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("不能加载上报服务HTML文件");
			});
			_templateTable.templateTableTitle(item.devTemplate()); //表格页面标题头

			//item.id()发送后台
			var dataAJAX = $.ajax({
				url: 'data/dataTemplateVariant.json',
				type: 'GET',
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					_templateTable.dataTemplateVariant = data;
				},
				error: function() {
					console.log('请求失败')
				}
			});

			var nameAJAX = $.ajax({
				url: 'data/deviceVariantList.json',
				type: 'GET',
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					_templateTable.deviceVariantList = data;
				},
				error: function() {
					console.log('请求失败')
				}
			});
			$.when(dataAJAX, nameAJAX).done(function(data, name) {
				parseTemplateTableList(data[0], name[0]);
				$('#templateTable').bootstrapTable({
					data: _templateTable.templateTableList
				});
				//获取下拉数据并且转化为KO数组
				getNameSelectList(_templateTable.templateTableList, _templateTable.deviceVariantList);
			})
			$('.modal').on('show.bs.modal', function() {
				$('#wrapper').css('position', 'static');
			})
			$('.modal').on('hidden.bs.modal', function() {
				$('#wrapper').css('position', 'fixed');
			})
		};

		this.addTemplateTableModal = function() {
			_templateTable.addTemTabItem.name(_templateTable.nameSelectList()[0].deviceCode());
			$('#addTemplateTable').modal('show');
		};
		this.addTemplateTable = function() {
			$('#addTemplateTable').modal('hide');
			//发送给后台
			var _addData = {
				"templateID": _templateTable.templateID,
				"name": _templateTable.addTemTabItem.name(),
				"deviceCode": _templateTable.addTemTabItem.deviceCode(),
				"histReport": _templateTable.addTemTabItem.histReport(),
				"stepChangeThreshold": _templateTable.addTemTabItem.stepChangeThreshold(),
				"slopeChangeThreshold": _templateTable.addTemTabItem.slopeChangeThreshold()
			};
			//这是测试用 有后台是直接请求数据再刷新表格
			$('#templateTable').bootstrapTable('append', _addData);
			getNameSelectList(_templateTable.templateTableList, _templateTable.deviceVariantList);
		};

		this.addAllTemplateTableModal = function() {
			$('#addAllTemplateTable').modal('show');

		};
		this.addAllTemplateTable = function() {
			$('#addAllTemplateTable').modal('hide');
			var _addAllData = {
				"templateID": _templateTable.templateID,
				"histReport": _templateTable.addAllTemTabItem.histReport(),
				"stepChangeThreshold": _templateTable.addAllTemTabItem.stepChangeThreshold(),
				"slopeChangeThreshold": _templateTable.addAllTemTabItem.slopeChangeThreshold()
			}
		};

		this.editTemplateTableModal = function() {
			var tableChooseList = $('#templateTable').bootstrapTable('getSelections');
			//			未选择
			if(tableChooseList.length == 0) {
				_templateTable.editOption.editNone(true);
				_templateTable.editOption.editOne(false);
				_templateTable.editOption.editMulti(false);
			};
			//			单向编辑
			if(tableChooseList.length == 1) {
				_templateTable.editOption.editNone(false);
				_templateTable.editOption.editOne(true);
				_templateTable.editOption.editMulti(false);
			};
			//			多项编辑
			if(tableChooseList.length > 1) {
				_templateTable.editOption.editNone(false);
				_templateTable.editOption.editOne(false);
				_templateTable.editOption.editMulti(true);
			};
			$('#editTemplateTable').modal('show');
		};
		this.editTemplateTable = function() {
			var _postData = [];
			var tableChooseList = $('#templateTable').bootstrapTable('getSelections');
			if(tableChooseList.length == 1) {
				var _editOne = {
					"templateID": _templateTable.templateID,
					"deviceCode": tableChooseList[0].deviceCode,
					"histReport": _templateTable.editTemTabItem.histReport,
					"stepChangeThreshold": _templateTable.editTemTabItem.stepChangeThreshold,
					"slopeChangeThreshold": _templateTable.editTemTabItem.slopeChangeThreshold
				};
				//发送给后台
				_postData.push(_editOne);
			}
			if(tableChooseList.length>1){
				
			}
			$('#editTemplateTable').modal('hide');
		};

		this.deleteTemplateTableModal = function() {
			$('#deleteTemplateTable').modal('show');
		};
		this.deleteTemplateTable = function() {
			$('#deleteTemplateTable').modal('hide');
		};
		this.addChange = function() {
			for(var i = 0; i < _templateTable.deviceVariantList.length; i++) {
				if(_templateTable.addTemTabItem.name() == _templateTable.deviceVariantList[i].name) {
					_templateTable.addTemTabItem.deviceCode(_templateTable.deviceVariantList[i].code);
				}
			}
		};
	};
	FV.templateTable = new TemplateTable();
}(jQuery))