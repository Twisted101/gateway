(function($) {
	if(!window.FV) {
		window.FV = {};
	}

	var Template = function() {
		var _template = this;
		this.showTemplate = ko.observable(true);
		this.showTemplateTable = ko.observable(false);
		this.showReport = ko.observable(false);
		this.showReportTable = ko.observable(false);
		this.templateListKO = ko.observableArray();
		this.templateList = [];
		//传输模板

		//转化为KO
		this.parseTemplateList = function(item) {
			var _tmp = {};
			_tmp.devTemplate = ko.observable(item.devTemplate);
			_tmp.id = ko.observable(item.id);
			_tmp.idTemplate = ko.observable(item.idTemplate);
			_tmp.relevanceTemplate = ko.observable(item.relevanceTemplate);
			_tmp.remark = ko.observable(item.remark);
			return _tmp;
		};

		this.openTemplate = function(item) {
			_template.showTemplate(true);
			_template.showTemplateTable(false);
			_template.showReport(false);
			_template.showReportTable(false);
			$('#templateTable').bootstrapTable('removeAll');

			//豆腐块数据
			var dataTemplateAJAX = $.ajax({
				url: 'data/dataTemplate.json',
				type: 'GET',
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {},
				error: function() {
					console.log('请求失败')
				}
			});
			//关联模板相关
			var relevanceTemplateAJAX = $.ajax({
				url: 'data/getAllDeviceTemplate.json',
				type: 'GET',
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {

				},
				error: function() {
					console.log('请求失败')
				}
			});
			$.when(dataTemplateAJAX, relevanceTemplateAJAX).done(function(templateData, relevanceTemplate) {
				_template.templateList = [];
				_template.templateListKO.removeAll();
				for(var i = 0; i < templateData[0].length; i++) {
					var _tmp = {};
					_tmp.devTemplate = templateData[0][i].devTemplate;
					_tmp.id = templateData[0][i].id;
					_tmp.remark = templateData[0][i].remark;
					for(var j = 0; j < templateData[0].length; j++) {
						if(templateData[0][i].idTemplate == relevanceTemplate[0][j].id) {
							_tmp.relevanceTemplate = relevanceTemplate[0][j].name
						}
					}
					_template.templateList.push(_tmp);
				}
				$.each(_template.templateList, function(index, value) {
					_template.templateListKO.push(_template.parseTemplateList(value));
				});
			})
		};

		this.openTemplate();

		this.addTemplateContent = {
			devTemplate: ko.observable(''),
			relevanceTemplate: ko.observable(''),
			remark: ko.observable('')
		}
		this.addTemplate = function() {
			$('#addTemplate').modal('show');
		};
		this.editTemplate = function(item) {
			$('#editTemplate').modal('show');
		};
		this.deleteTemplate = function(item) {
			$('#deleteTemplate').modal('show');
		}

		this.openReport = function() {
			$.ajax({
				url: '../frontView/template/report.html',
				dataType: "html",
				cache: true,
				async: false
			}).done(function(data, textStatus, jqXHR) {
				$('body').append(data);

			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("不能加载上报服务HTML文件");
			});

			_template.showTemplate(false);
			_template.showTemplateTable(false);
			_template.showReport(true);
			_template.showReportTable(false);

			//清除表格数据
			$('#templateTable').bootstrapTable('removeAll');
		};

		//传输模板表格
		this.templateTableTitle = ko.observable('');
		this.dataTemplateVariant = []; //模板数据列表
		this.deviceVariantList = []; //设备变量与变量标签列表
		this.templateTableList = []; //表格的列表
		//整合2个list的数据到新数组 用于表格
		var parseTemplateTableList = function(name, data) {
			for(var i = 0; i < name.length; i++) {
				var _tmp = {};
				_tmp.name = name[i].name;
				_tmp.deviceCode = data[i].deviceCode;
				_tmp.histReport = data[i].histReport;
				_tmp.stepChangeThreshold = data[i].stepChangeThreshold;
				_tmp.slopeChangeThreshold = data[i].slopeChangeThreshold;
				_template.templateTableList.push(_tmp);
			}
		}

		this.openTemplateTable = function(item) {
			_template.showTemplate(false);
			_template.showTemplateTable(true);
			_template.showReport(false);
			_template.showReportTable(false);
			_template.templateTableTitle(item.devTemplate()); //表格页面标题头

			var dataAJAX = $.ajax({
				url: 'data/dataTemplateVariant.json',
				type: 'GET',
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					_template.dataTemplateVariant = data;
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
					_template.deviceVariantList = data;
				},
				error: function() {
					console.log('请求失败')
				}
			});

			$.when(dataAJAX, nameAJAX).done(function(data, name) {
				parseTemplateTableList(_template.deviceVariantList, _template.dataTemplateVariant);
				console.log(_template.templateTableList)
				$('#templateTable').bootstrapTable({
					data: _template.templateTableList
				})
			})
		};
	};
	
	FV.template = new Template();
}(jQuery));