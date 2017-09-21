(function($) {
	if(!window.FV) {
		window.FV = {};
	}
	var Template = function() {
		var _template = this;
		this.dataTemplate = [];
		this.editItem = {};
		this.deleteItem = {};
		this.deleteItemName = ko.observable();
		this.templateListKO = ko.observableArray();
		this.templateList = [];
		this.relevanceTemplateList = ko.observableArray();
		this.addTemplateItem = {
			"devTemplate": ko.observable(),
			"relevanceTemplate": ko.observable(),
			"remark": ko.observable()
		};
		this.editTemplateItem = {
			"devTemplate": ko.observable(),
			"id": ko.observable(),
			"idTemplate": ko.observable(),
			"relevanceTemplate": ko.observable(),
			"remark": ko.observable()
		};

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
		this.parsrrelevanceTemplateList = function(item) {
			var _tmp = {};
			_tmp.name = ko.observable(item.name);
			_tmp.value = ko.observable(item.id);
			return _tmp;
		};
		this.openTemplate = function(item) {
			$.ajax({
				url: '../frontView/template/template.html',
				dataType: "html",
				cache: true,
				async: false
			}).done(function(data, textStatus, jqXHR) {
				$('body').append(data);
			}).fail(function(jqXHR, textStatus, errorThrown) {
				console.log("不能加载上报服务HTML文件");
			});
			FV.changePage.showTemplate(true);
			FV.changePage.showTemplateTable(false);
			FV.changePage.showReport(false);
			FV.changePage.showReportTable(false);
			$('#templateTable').bootstrapTable('removeAll');
			//豆腐块数据
			var dataTemplateAJAX = $.ajax({
				url: 'data/dataTemplate.json',
				type: 'GET',
				dataType: 'json',
				success: function(data, textStatus, jqXHR) {
					_template.dataTemplate = data;
				},
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
					_template.relevanceTemplateList.removeAll();
					$.each(data, function(index, value) {
						_template.relevanceTemplateList.push(_template.parsrrelevanceTemplateList(value));
					});
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
				};
				$.each(_template.templateList, function(index, value) {
					_template.templateListKO.push(_template.parseTemplateList(value));
				});
			})
			$('.modal').on('show.bs.modal', function() {
				$('#wrapper').css('position', 'static');
			})
			$('.modal').on('hidden.bs.modal', function() {
				$('#wrapper').css('position', 'fixed');
			})
		};
		this.openTemplate();

		this.addTemplate = function() {
			$('#addTemplate').modal('hide');
			var _addItem = {};
			_addItem.devTemplate = _template.addTemplateItem.devTemplate();
			_addItem.relevanceTemplate = ko.computed(function() {
				for(var i = 0; i < _template.relevanceTemplateList().length; i++) {
					if(_template.addTemplateItem.relevanceTemplate() == _template.relevanceTemplateList()[i].value()) {
						return _template.relevanceTemplateList()[i].name()
					}
				}
			});
			_addItem.remark = _template.addTemplateItem.remark();
			_template.templateListKO.push(_addItem);

			//清空模态框数据
			_template.addTemplateItem.devTemplate('');
			_template.addTemplateItem.remark('');
			_template.addTemplateItem.relevanceTemplate('');
		};
		this.editTemplateModal = function(item) {
			_template.item = item;//item存在全局变量里  修改
			_template.editTemplateItem.devTemplate(item.devTemplate());
			_template.editTemplateItem.id(item.id());
			_template.editTemplateItem.idTemplate(item.idTemplate());
			_template.editTemplateItem.relevanceTemplate(item.relevanceTemplate());
			_template.editTemplateItem.remark(item.remark());
			$('#editTemplate').modal('show');
		};
		this.editTemplate = function() {
			_template.item.devTemplate(_template.editTemplateItem.devTemplate())
			var _editData = {};
			_editData.devTemplate = _template.editTemplateItem.devTemplate();
			_editData.relevanceTemplate = _template.editTemplateItem.relevanceTemplate();
			_editData.remark = _template.editTemplateItem.remark();
			_editData.id = _template.editTemplateItem.id();
			_editData.idTemplate = _template.editTemplateItem.idTemplate();
			//_editData传输给后台的数据
			$('#editTemplate').modal('hide');
		};
		
		
		this.deleteTemplateModal = function(item) {
			$('#deleteTemplate').modal('show');
			_template.deleteItem = item;
			_template.deleteItemName(item.devTemplate());
		};
		this.deleteTemplate = function(){
			$('#deleteTemplate').modal('hide');
			var deleteID = _template.deleteItem.id();//发给后台然后重新请求
		}
	};
	FV.template = new Template();
}(jQuery));