(function($) {
	var DeviceTemplateVariant = function() {
		var _deviceTemplateVariant = this;
		this.curId = ko.observable(); //选中设备模板的ID
		this.title = ko.observable(); //选中设备模板的名称展示在顶部
		this._deviceCodeName = ko.observable(); //判断是否是‘虚拟设备模板’
		this.virtualDevice = ko.observable(false); //添加所有变量的按钮
		this.deviceVariantList = ko.observableArray();
		var parseData_deviceVariant = function(item) {
			var _tmp = {};
			_tmp.Code = ko.observable(item.Code);
			_tmp.DataType = ko.observable(item.DataType);
			_tmp.DisplayType = ko.observable(item.DisplayType);
			_tmp.Name = ko.observable(item.Name);
			_tmp.Precision = ko.observable(item.Precision);
			_tmp.RWFlag = ko.observable(item.RwFlag);
			_tmp.Type = ko.observable(item.Type);
			_tmp.UnitName = ko.observable(item.Unit);
			return _tmp;
		}

		var editVariantData_back = function(item, data) {
			item.name(data.name);
			item.code(data.code);
			item.variantType(data.variantType);
			item.variantDisplayType(data.variantDisplayType);
			item.variantDataType(data.variantDataType);
			item.variantPrecision(data.variantPrecision);
			item.variantUint(data.variantUint);
			item.RWFlag(data.RWFlag);
			item.variantPeriod(data.variantPeriod);
			item.rangeFilter(data.rangeFilter);
			item.isStore(data.isStore);
			item.rangeMin(data.rangeMin);
			item.rangeMax(data.rangeMax);
			item.slopeFilter(data.slopeFilter);
			item.slopeMin(data.slopeMin);
			item.slopeMax(data.slopeMax);
		}

		//还原KO数据
		var parseData_back = function(item) {
			var _tmp = {}
			_tmp.name = item.name();
			_tmp.code = item.code();
			_tmp.variantType = item.variantType();
			_tmp.variantDisplayType = item.variantDisplayType();
			_tmp.variantDataType = item.variantDataType();
			_tmp.variantPrecision = item.variantPrecision();
			_tmp.variantUint = item.variantUint();
			_tmp.RWFlag = item.RWFlag();
			_tmp.variantPeriod = item.variantPeriod();
			_tmp.isStore = item.isStore();
			_tmp.rangeFilter = item.rangeFilter();
			_tmp.rangeMin = item.rangeMin();
			_tmp.rangeMax = item.rangeMax();
			_tmp.slopeFilter = item.slopeFilter();
			_tmp.slopeMin = item.slopeMin();
			_tmp.slopeMax = item.slopeMax();
			return _tmp;
		}

		this.VariantDataType = [{
			"name": "浮点型",
			"value": "double"
		}, {
			"name": "整型",
			"value": "int"
		}, {
			"name": "布尔类型",
			"value": "bool"
		}, {
			"name": "时间类型",
			"value": "time"
		}];

		this.VariantDisplayType = [{
			"name": "十进制",
			"value": "Default"
		}, {
			"name": "十六进制",
			"value": "Hex"
		}, {
			"name": "时间格式",
			"value": "Time"
		}];

		this.VariantRWFlag = [{
			"name": "只读",
			"value": "ReadOnly"
		}, {
			"name": "只写",
			"value": "WriteOnly"
		}, {
			"name": "读写",
			"value": "ReadWrite"
		}];

		var _pattern = /^\/deviceTemplateVariant\/(\d+)\/Name\/(.*)\/?$/;
		undfan.routeItem.call(this, {
			htmlUrl: 'template/deviceTemplateVariant.html',
			pattern: _pattern,
			templateId: 'template-deviceTemplateVariant'
		});
		var parseData = function(item) {
			var _tmp = {};
			_tmp.index = item.index;
			_tmp.name = ko.observable(item.Name).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 64
					}
				]
			});
			_tmp.code = ko.observable(item.Code).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'alphanum'
					},
					{
						validate: 'strlen',
						max: 64
					}
				]
			});
			_tmp.variantType = ko.observable(item.Type);
			_tmp.variantType_display = ko.computed(function() {
				if('Virtual' === _tmp.variantType()) {
					return "虚拟变量";
				} else {
					return "实际变量";
				}
			});
			_tmp.variantDisplayType = ko.observable(item.DisplayType);
			_tmp.variantDataType = ko.observable(item.DataType);
			_tmp.variantPrecision = ko.observable(item.Precision).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer',
						min: 0,
						max: 5
					}
				]
			});
			_tmp.variantUint = ko.observable(item.Unit).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 16
					}
				]
			});
			_tmp.RWFlag = ko.observable(item.RWFlag);
			_tmp.RWFlag_display = ko.computed(function() {
				if('ReadOnly' === _tmp.RWFlag()) {
					return "只读";
				} else if("WriteOnly" === _tmp.RWFlag()) {
					return "只写";
				} else {
					return "读写";
				}
			});
			_tmp.variantPeriod = ko.observable(item.Period).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integerAllow0',
						min: 10,
						max: 300
					}
				]
			});
			_tmp.rangeFilter = ko.observable(item.RangeFilter * 1);
			_tmp.rangeFilter_display = ko.computed(function() {
				if(_tmp.rangeFilter() * 1) {
					return "Yes";
				} else {
					return "No";
				}
			});
			_tmp.isStore = ko.observable(item.IsStore);
			//			_tmp.isStore_display = ko.computed(function() {
			//				if(_tmp.isStore() * 1) {
			//					return "Yes";
			//				} else {
			//					return "No";
			//				}
			//			});
			_tmp.rangeMin = ko.observable(item.RangeMin).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_tmp.rangeMax = ko.observable(item.RangeMax).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_tmp.slopeFilter = ko.observable(item.SlopeFilter);
			_tmp.slopeFilter_display = ko.computed(function() {
				if(_tmp.slopeFilter() * 1) {
					return "Yes";
				} else {
					return "No";
				}
			});
			_tmp.slopeMin = ko.observable(item.SlopeMin).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_tmp.slopeMax = ko.observable(item.SlopeMax).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_tmp.isValide = ko.computed(function() {
				var _rangeHasError = false;
				if(_tmp.rangeFilter() && (_tmp.rangeMin.hasError() || _tmp.rangeMax.hasError())) {
					_rangeHasError = true;
				} else {
					_rangeHasError = false;
				}
				var _slopeHasError = false;
				if(_tmp.slopeFilter() && (_tmp.slopeMin.hasError() || _tmp.slopeMax.hasError())) {
					_slopeHasError = true;
				} else {
					_slopeHasError = false;
				}
				var _commonHasError = false;
				//如果是虚拟设备
				if('VirtualDevice' == _deviceTemplateVariant._deviceCodeName()) {
					if(_tmp.name.hasError() || _tmp.code.hasError() || _tmp.variantPrecision.hasError() ||
						_tmp.variantPeriod.hasError() || _tmp.variantUint.hasError()) {
						_commonHasError = true;
					} else {
						_commonHasError = false;
					}
				} else {
					if(_tmp.variantPeriod.hasError()) {
						_commonHasError = true;
					} else {
						_commonHasError = false;
					}
				}
				if(_rangeHasError || _slopeHasError || _commonHasError) {
					return false;
				} else {
					return true;
				}
			});
			_tmp.isSelected = ko.observable(0);
			return _tmp;
		}
		var _templateVariantApi = new undfan.TemplateVariant();
		this.bind('init', function() {

		});

		this.bind('show', function(strUrl) {

			undfan.route.changeItem(_deviceTemplateVariant);
			_deviceTemplateVariant.curId(strUrl.replace(_pattern, '$1')); //获取到设备模板Id
			_deviceTemplateVariant.title(strUrl.replace(_pattern, '$2')); //获取到设备模板的名称，展示在顶部
			$('#devicetemplatetable').bootstrapTable(); //生成表格

			//获取到 _deviceCodeName，来判断是否是虚拟设备
			var devicetemplatelist = undfan.deviceTemplate.deviceTemplateList();
			for(var i = 0; i < devicetemplatelist.length; i++) {
				if(_deviceTemplateVariant.curId() == devicetemplatelist[i].id()) {
					console.log('获取点击设备模板的下标     ' + i);
					_deviceTemplateVariant._deviceCodeName(devicetemplatelist[i].deviceCode());
					break;
				}
			}

			if(_deviceTemplateVariant._deviceCodeName() == 'VirtualDevice') {
				//虚拟设备
				_deviceTemplateVariant.virtualDevice(false); //虚拟设备不显示添加所有变量按钮
				_deviceTemplateVariant.deviceVariantList.removeAll();
			} else {
				//不是虚拟设备
				_deviceTemplateVariant.virtualDevice(true);
				_deviceTemplateVariant.deviceVariantList.removeAll();
				//获取所有的列表数据
				_templateVariantApi.getDeviceVariant(_deviceTemplateVariant.curId, function(data, textStatus, jqXHR) {
					$.each(data, function(index, value) {
						var tmp = parseData_deviceVariant(value);
						_deviceTemplateVariant.deviceVariantList.push(tmp);
					});
				}, function() {

				});
			}

			//初始化数据  展示在表格里
			_deviceTemplateVariant.deviceVariant.getData();
		});

		this.bind('afterRender', function() {

		});

		this.bind('hide', function(strUrl) {

		});

		this.addVariant = function() {
			_deviceTemplateVariant.addTemplateVariantModal.show(false);

		};
		this.addAllVariant = function() {
			_deviceTemplateVariant.addTemplateVariantModal.show(true);
			$("[name='my-checkbox']").bootstrapSwitch();
		};

		//_deviceTemplateVariant.deviceVariant.variantList()是展示在表格里的列表数据
		this.deviceVariant = {
			"variantList": ko.observableArray(),
			"getData": function() {
				_deviceTemplateVariant.deviceVariant.variantList.removeAll();
				_templateVariantApi.getTemplateVariant(_deviceTemplateVariant.curId, function(data, textStatus, jqXHR) {
					$.each(data, function(index, value) {
						var tmp = parseData(value);
						_deviceTemplateVariant.deviceVariant.variantList.push(tmp);
					});
				}, function() {
					//					toastr.warning('获取设备模板变量信息失败', '提示信息：', {
					//						timeOut: 5000,
					//						closeButton: true,
					//						progressBar: true
					//					});
				});
			}
		};

		//该list里面存放的是用户还可以添加的变量列表，如果变量已全部添加，那么该list为空
		//添加虚拟设备的变量时，不需要用到该list
		this.addVariant_DeviceVariants = ko.computed(function() {
			var _tmp = [];
			$.each(_deviceTemplateVariant.deviceVariantList(), function(index, value) {
				var deviceVariantCode = value.Code();
				//检查当前变量是否已经被添加
				var flag = false;
				for(var i = 0; i < _deviceTemplateVariant.deviceVariant.variantList().length; i++) {
					var templateVariantCode = _deviceTemplateVariant.deviceVariant.variantList()[i].code();
					if(deviceVariantCode == templateVariantCode) {
						flag = true;
						break;
					}
				}
				if(!flag) {
					_tmp.push(value);
				}
			});
			return _tmp;
		});

		this.addTemplateVariantModal = function() {
			var _addTVMod = {};
			_addTVMod.title = "添加变量";
			_addTVMod.allVariants = ko.observable(false);
			_addTVMod.isStore = ko.observable(true);
			_addTVMod.isVirtualDevice = ko.computed(function() {
				if('VirtualDevice' == _deviceTemplateVariant._deviceCodeName()) {
					return true;
				} else {
					return false;
				}
			});
			_addTVMod.name = ko.observable('').extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 64
					}
				]
			});
			_addTVMod.code = ko.observable('').extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'alphanum'
					},
					{
						validate: 'strlen',
						max: 64
					}
				]
			});
			_addTVMod.type = ko.observable('');
			_addTVMod.displaytype = ko.observable('');
			_addTVMod.datatype = ko.observable('');
			_addTVMod.precision = ko.observable(0).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integer',
						min: 0,
						max: 5
					}
				]
			});
			_addTVMod.unit = ko.observable('').extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 16
					}
				]
			});
			_addTVMod.rwflag = ko.observable('');
			_addTVMod.period = ko.observable(0).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integerAllow0',
						min: 10,
						max: 300
					}
				]
			});
			_addTVMod.rangefilter = ko.observable(false);
			_addTVMod.rangemin = ko.observable(0).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_addTVMod.rangemax = ko.observable(0).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_addTVMod.rangeError = ko.computed(function() {
				if(_addTVMod.rangefilter()) {
					if(parseFloat(_addTVMod.rangemin()) > parseFloat(_addTVMod.rangemax())) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			});
			_addTVMod.slopefilter = ko.observable(false);
			_addTVMod.slopemin = ko.observable(0).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_addTVMod.slopemax = ko.observable(0).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_addTVMod.slopeError = ko.computed(function() {
				if(_addTVMod.slopefilter()) {
					if(parseFloat(_addTVMod.slopemin()) > parseFloat(_addTVMod.slopemax())) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			});
			_addTVMod.isValide = ko.computed(function() {
				var _rangeHasError = false;
				if(_addTVMod.rangefilter() && (_addTVMod.rangemin.hasError() || _addTVMod.rangemax.hasError() || _addTVMod.rangeError())) {
					_rangeHasError = true;
				} else {
					_rangeHasError = false;
				}
				var _slopeHasError = false;
				if(_addTVMod.slopefilter() && (_addTVMod.slopemin.hasError() || _addTVMod.slopemax.hasError() || _addTVMod.slopeError())) {
					_slopeHasError = true;
				} else {
					_slopeHasError = false;
				}
				var _commonHasError = false;
				//如果是虚拟设备
				if('VirtualDevice' == _deviceTemplateVariant._deviceCodeName()) {
					if(_addTVMod.name.hasError() || _addTVMod.code.hasError() || _addTVMod.precision.hasError() ||
						_addTVMod.period.hasError() || _addTVMod.unit.hasError()) {
						_commonHasError = true;
					} else {
						_commonHasError = false;
					}
				} else {
					if(_addTVMod.period.hasError()) {
						_commonHasError = true;
					} else {
						_commonHasError = false;
					}
				}
				if(_rangeHasError || _slopeHasError || _commonHasError) {
					return false;
				} else {
					return true;
				}
			});
			_addTVMod.havenovariant = ko.computed(function() {
				if(!_addTVMod.isVirtualDevice() && 0 == _deviceTemplateVariant.addVariant_DeviceVariants().length) {
					return true;
				} else {
					return false;
				}
			});
			_addTVMod.btnOk = function() {
				if(!_addTVMod.isValide()) {
					return;
				}

				var _addData = [];
				if(!_addTVMod.isVirtualDevice()) {
					//不是虚拟设备
					if(_addTVMod.allVariants()) {
						//添加所有设备
						$.each(_deviceTemplateVariant.addVariant_DeviceVariants(), function(allIndex, allValue) {
							var _DeviceVTmp = {
								Name: allValue.Name(),
								Code: allValue.Code(),
								Type: allValue.Type(),
								DisplayType: allValue.DisplayType(),
								DataType: allValue.DataType(),
								Precision: allValue.Precision(),
								Unit: allValue.UnitName(),
								RWFlag: allValue.RWFlag(),
								Period: _addTVMod.period(),
								RangeFilter: _addTVMod.rangefilter(),
								RangeMin: _addTVMod.rangemin(),
								RangeMax: _addTVMod.rangemax(),
								SlopeFilter: _addTVMod.slopefilter(),
								SlopeMin: _addTVMod.slopemin(),
								SlopeMax: _addTVMod.slopemax(),
								IsStore: _addTVMod.isStore()
							};
							_addData.push(_DeviceVTmp);
						});
					} else {
						//添加单个变量
						var _code = _addTVMod.code();
						$.each(_deviceTemplateVariant.addVariant_DeviceVariants(), function(index, value) {
							if(value.Code() == _addTVMod.code()) {
								var _DeviceVTmp = {
									Name: value.Name(),
									Code: value.Code(),
									Type: value.Type(),
									DisplayType: value.DisplayType(),
									DataType: value.DataType(),
									Precision: value.Precision(),
									Unit: value.UnitName(),
									RWFlag: value.RWFlag(),
									Period: _addTVMod.period(),
									RangeFilter: _addTVMod.rangefilter(),
									RangeMin: _addTVMod.rangemin(),
									RangeMax: _addTVMod.rangemax(),
									SlopeFilter: _addTVMod.slopefilter(),
									SlopeMin: _addTVMod.slopemin(),
									SlopeMax: _addTVMod.slopemax(),
									IsStore: _addTVMod.isStore()
								};
								_addData.push(_DeviceVTmp);
								return false;
							}
						});
					}
				} else {
					//是虚拟设备
					var _flag = false;
					$.each(_deviceTemplateVariant.deviceVariant.variantList(), function(index, value) {
						if(_addTVMod.code() == value.code()) {
							_flag = true;
							return false;
						}
					});
					if(_flag) {
						console.log("code重复")
					}
					var _DeviceVirtualTmp = {
						Name: _addTVMod.name(),
						Code: _addTVMod.code(),
						Type: _addTVMod.type(),
						DisplayType: _addTVMod.displaytype(),
						DataType: _addTVMod.datatype(),
						Precision: _addTVMod.precision(),
						Unit: _addTVMod.unit(),
						RWFlag: _addTVMod.rwflag(),
						Period: _addTVMod.period(),
						RangeFilter: _addTVMod.rangefilter(),
						RangeMin: _addTVMod.rangemin(),
						RangeMax: _addTVMod.rangemax(),
						SlopeFilter: _addTVMod.slopefilter(),
						SlopeMin: _addTVMod.slopemin(),
						SlopeMax: _addTVMod.slopemax(),
						IsStore: _addTVMod.isStore()
					};
					_addData.push(_DeviceVirtualTmp);
				}
				//变量添加到后台
				_templateVariantApi.addTemplateVariant(ko.utils.stringifyJson(_addData), _deviceTemplateVariant._deviceTemplateId, function(data, textStatus, jqXHR) {
					//增加设备模板变量到view的数据源中
					//					$.each(_addData, function(index, value) {
					//						var _tmp = parseData(value);
					//						_DeviceTemplateVariant.deviceVariant.variantList.push(_tmp);
					//					});
				}, function() {

				});
				$.each(_addData, function(index, value) {
					var _tmp = parseData(value);
					_deviceTemplateVariant.deviceVariant.variantList.push(_tmp);
				});
				$('#devicetemplatetable').bootstrapTable('append', _addData);
			};
			return {

				show: function(allVariant) {
					if(_addTVMod.isVirtualDevice()) {
						_addTVMod.name('');
						_addTVMod.code('');
						_addTVMod.type('Virtual');
						_addTVMod.displaytype('Default');
						_addTVMod.datatype('int');
						_addTVMod.precision(0);
						_addTVMod.unit('无');
						_addTVMod.rwflag('');
					}
					_addTVMod.allVariants(allVariant);
					if(allVariant) {
						_addTVMod.title = "添加所有变量";
					} else {
						_addTVMod.title = "添加变量";
					}
					_addTVMod.period(0);
					_addTVMod.rangefilter(false);
					_addTVMod.rangemin(0);
					_addTVMod.rangemax(0);
					_addTVMod.slopefilter(false);
					_addTVMod.isStore(false);
					_addTVMod.slopemin(0);
					_addTVMod.slopemax(0);
					window.undfan.window.showModal({
						viewModel: _addTVMod,
						template: 'template-addTemplateVariant-modal',
						width: 400
					});
					$('#addisstore').bootstrapSwitch({
						onText: "&nbsp;&nbsp;ON&nbsp;&nbsp;",
						offText: "&nbsp;&nbsp;OFF&nbsp;&nbsp;",
						size: "mini",
						animate: false,
						onSwitchChange: function(event, state) {
							if(state == true) {
								_addTVMod.isStore(true);
							} else {
								_addTVMod.isStore(false);
							}
						}
					});
					$('#addrangefilter').bootstrapSwitch({
						onText: "&nbsp;&nbsp;ON&nbsp;&nbsp;",
						offText: "&nbsp;&nbsp;OFF&nbsp;&nbsp;",
						size: "mini",
						animate: false,
						onSwitchChange: function(event, state) {
							if(state == true) {
								_addTVMod.rangefilter(true);
							} else {
								_addTVMod.rangefilter(false);
							}
						}
					});
					$('#addslopefilter').bootstrapSwitch({
						onText: "&nbsp;&nbsp;ON&nbsp;&nbsp;",
						offText: "&nbsp;&nbsp;OFF&nbsp;&nbsp;",
						size: "mini",
						animate: false,
						onSwitchChange: function(event, state) {
							if(state == true) {
								_addTVMod.slopefilter(true);
							} else {
								_addTVMod.slopefilter(false);
							}
						}
					});
				}
			}
		}();

		//修改
		var _editData = [];
		this.editVariant = function() {
			_editData = [];
			var _formData = $('#devicetemplatetable').bootstrapTable('getSelections'); //得到选择行的数据的数组
			for(var i = 0; i < _formData.length; i++) {
				var parsedata = parseData(_formData[i])
				_editData.push(parsedata);
			}
			console.log(_formData)
			if(_editData.length == 0) {
				alert('请xuanze编辑的项');
				return;
			}
			_deviceTemplateVariant.editTemplateVariantModal.show();
		};
		this.editTemplateVariantModal = function() {
			var _editTVMod = {};
			_editTVMod.title = '编辑模板变量';
			_editTVMod.remind = ko.observable('');
			_editTVMod.isEditOne = ko.observable();
			_editTVMod.isVirtualDevice = ko.computed(function() {
				if('VirtualDevice' == _deviceTemplateVariant._deviceCodeName()) {
					return true;
				} else {
					return false;
				}
			});
			_editTVMod.isEditOne = ko.observable(false);
			_editTVMod.editOneItem = null;
			_editTVMod.rangeError = null;
			_editTVMod.slopeError = null;
			_editTVMod.multipleEditPeriod = ko.observable(0).extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'integerAllow0',
						min: 10,
						max: 300
					}
				]
			});
			_editTVMod.multipleEditIsStore = ko.observable(true);
			_editTVMod.multipleEditRangeFilter = ko.observable(false);
			_editTVMod.multipleEditRangeMin = ko.observable(0).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_editTVMod.multipleEditRangeMax = ko.observable(0).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_editTVMod.multipleEditSlopeFilter = ko.observable(false);
			_editTVMod.multipleEditSlopeMin = ko.observable(0).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});
			_editTVMod.multipleEditSlopeMax = ko.observable(0).extend({
				validation: [{
					validate: 'notnull'
				}, {
					validate: 'integer'
				}]
			});

			_editTVMod.editOneItemDataBack = null;
			_editTVMod.editMultipleDataBack = {
				period: 0,
				rangefilter: 0,
				rangemin: 0,
				rangmax: 0,
				slopefilter: 0,
				slopemin: 0,
				slopemax: 0
			};
			_editTVMod.isEditMultiplePeriod = ko.observable(false);
			_editTVMod.isEditMultipleIsStore = ko.observable(false);
			_editTVMod.isEditMultipleRangeFilter = ko.observable(false);
			_editTVMod.isEditMultipleSlopeFilter = ko.observable(false);
			_editTVMod.multipleEditRangeError = ko.computed(function() {
				if(_editTVMod.isEditMultipleRangeFilter() && _editTVMod.multipleEditRangeFilter()) {
					if(parseFloat(_editTVMod.multipleEditRangeMin()) > parseFloat(_editTVMod.multipleEditRangeMax())) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			});
			_editTVMod.multipleEditSlopeError = ko.computed(function() {
				if(_editTVMod.isEditMultipleSlopeFilter() && _editTVMod.multipleEditSlopeFilter()) {
					if(parseFloat(_editTVMod.multipleEditSlopeMin()) > parseFloat(_editTVMod.multipleEditSlopeMax())) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			});
			_editTVMod.isValide = null;
			_editTVMod.btnOk = function() {
				var _updateData = {};
				var _dataList = [];
				if(_editTVMod.isEditOne()) {
					//判断变量的每个属性是否有修改，如果有，才更新到数据库
					var _tmp = {};
					var _hasChange = false;
					_tmp.index = _editTVMod.editOneItem.index;
					if(_editTVMod.editOneItemDataBack.name != _editTVMod.editOneItem.name()) {
						_hasChange = true;
						_tmp.Name = _editTVMod.editOneItem.name();
					}
					if(_editTVMod.editOneItemDataBack.variantDisplayType != _editTVMod.editOneItem.variantDisplayType()) {
						_hasChange = true;
						_tmp.DisplayType = _editTVMod.editOneItem.variantDisplayType();
					}
					if(_editTVMod.editOneItemDataBack.variantDataType != _editTVMod.editOneItem.variantDataType()) {
						_hasChange = true;
						_tmp.DataType = _editTVMod.editOneItem.variantDataType();
					}
					if(_editTVMod.editOneItemDataBack.variantPrecision != _editTVMod.editOneItem.variantPrecision()) {
						_hasChange = true;
						_tmp.Precision = _editTVMod.editOneItem.variantPrecision();
					}
					if(_editTVMod.editOneItemDataBack.variantUint != _editTVMod.editOneItem.variantUint()) {
						_hasChange = true;
						_tmp.UnitName = _editTVMod.editOneItem.variantUint();
					}
					if(_editTVMod.editOneItemDataBack.RWFlag != _editTVMod.editOneItem.RWFlag()) {
						_hasChange = true;
						_tmp.RWFlag = _editTVMod.editOneItem.RWFlag();
					}
					if(_editTVMod.editOneItemDataBack.variantPeriod != _editTVMod.editOneItem.variantPeriod()) {
						_hasChange = true;
						_tmp.Period = _editTVMod.editOneItem.variantPeriod();
					}
					if(_editTVMod.editOneItemDataBack.isStore != _editTVMod.editOneItem.isStore()) {
						_hasChange = true;
						_tmp.IsStore = _editTVMod.editOneItem.isStore();
					}
					if(_editTVMod.editOneItemDataBack.rangeFilter != _editTVMod.editOneItem.rangeFilter()) {
						_hasChange = true;
						_tmp.RangeFilter = _editTVMod.editOneItem.rangeFilter();
					}
					if(_editTVMod.editOneItemDataBack.rangeMin != _editTVMod.editOneItem.rangeMin()) {
						_hasChange = true;
						_tmp.RangeMin = _editTVMod.editOneItem.rangeMin();
					}
					if(_editTVMod.editOneItemDataBack.rangeMax != _editTVMod.editOneItem.rangeMax()) {
						_hasChange = true;
						_tmp.RangeMax = _editTVMod.editOneItem.rangeMax();
					}
					if(_editTVMod.editOneItemDataBack.slopeFilter != _editTVMod.editOneItem.slopeFilter()) {
						_hasChange = true;
						_tmp.SlopeFilter = _editTVMod.editOneItem.slopeFilter();
					}
					if(_editTVMod.editOneItemDataBack.slopeMin != _editTVMod.editOneItem.slopeMin()) {
						_hasChange = true;
						_tmp.SlopeMin = _editTVMod.editOneItem.slopeMin();
					}
					if(_editTVMod.editOneItemDataBack.slopeMax != _editTVMod.editOneItem.slopeMax()) {
						_hasChange = true;
						_tmp.SlopeMax = _editTVMod.editOneItem.slopeMax();
					}
					if(_hasChange) {
						_tmp.Code = _editTVMod.editOneItem.code();
						_dataList.push(_tmp);
					} else {
						//没有数据要更新，直接返回
						return;
					}
				} else {
					var _tmpChangedProperty = {};
					var _hasChanged = false;
					if(_editTVMod.isEditMultiplePeriod()) {
						_hasChanged = true;
						_tmpChangedProperty.Period = _editTVMod.multipleEditPeriod();
					}
					if(_editTVMod.isEditMultipleIsStore()) {
						_hasChanged = true;
						_tmpChangedProperty.IsStore = _editTVMod.multipleEditIsStore();
					}
					if(_editTVMod.isEditMultipleRangeFilter()) {
						_hasChanged = true;
						_tmpChangedProperty.RangeFilter = _editTVMod.multipleEditRangeFilter();
						_tmpChangedProperty.RangeMin = _editTVMod.multipleEditRangeMin();
						_tmpChangedProperty.RangeMax = _editTVMod.multipleEditRangeMax();
					}
					if(_editTVMod.isEditMultipleSlopeFilter()) {
						_hasChanged = true;
						_tmpChangedProperty.SlopeFilter = _editTVMod.multipleEditSlopeFilter();
						_tmpChangedProperty.SlopeMin = _editTVMod.multipleEditSlopeMin();
						_tmpChangedProperty.SlopeMax = _editTVMod.multipleEditSlopeMax();
					}
					if(_hasChanged) {
						for(var i = 0; i < _editData.length; i++) {
							var _tmpData = {};
							if(_tmpChangedProperty.hasOwnProperty('Period')) {
								_tmpData.Period = _tmpChangedProperty.Period;
							}
							if(_tmpChangedProperty.hasOwnProperty('IsStore')) {
								_tmpData.IsStore = _tmpChangedProperty.IsStore;
							}
							if(_tmpChangedProperty.hasOwnProperty('RangeFilter')) {
								_tmpData.RangeFilter = _tmpChangedProperty.RangeFilter;
								_tmpData.RangeMin = _tmpChangedProperty.RangeMin;
								_tmpData.RangeMax = _tmpChangedProperty.RangeMax;
							}
							if(_tmpChangedProperty.hasOwnProperty('SlopeFilter')) {
								_tmpData.SlopeFilter = _tmpChangedProperty.SlopeFilter;
								_tmpData.SlopeMin = _tmpChangedProperty.SlopeMin;
								_tmpData.SlopeMax = _tmpChangedProperty.SlopeMax;
							}
							_tmpData.Code = _editData[i].code();
							_tmpData.index = _editData[i].index;
							_dataList.push(_tmpData);
						}
					} else {
						//没有数据要更新，直接返回
						return;
					}
				}

				_updateData.update = _dataList;
				//前端更新表格数据
				for(var i = 0; i < _dataList.length; i++) {
					$('#devicetemplatetable').bootstrapTable('updateRow', {
						index: _dataList[i].index,
						row: _dataList[i]
					});
				}
				console.log(_dataList)
				//发送请求更新数据库
				_templateVariantApi.updateTemplateVariant(ko.utils.stringifyJson(_updateData), _deviceTemplateVariant._deviceTemplateId, function() {
					//请求成功

				}, function() {

				});
			};
			return {
				show: function() {
					if(_editData.length == 1) {
						_editTVMod.remind = ('');
						_editTVMod.isEditOne(true);
						_editTVMod.editOneItem = _editData[0];
						_editTVMod.rangeError = ko.computed(function() {
							if(_editTVMod.editOneItem.rangeFilter()) {
								if(parseFloat(_editTVMod.editOneItem.rangeMin()) > parseFloat(_editTVMod.editOneItem.rangeMax())) {
									return true;
								} else {
									return false;
								}
							} else {
								return false;
							}
						});
						_editTVMod.slopeError = ko.computed(function() {
							if(null == _editTVMod.editOneItem) {
								return false;
							}
							if(_editTVMod.editOneItem.slopeFilter()) {
								if(parseFloat(_editTVMod.editOneItem.slopeMin()) > parseFloat(_editTVMod.editOneItem.slopeMax())) {
									return true;
								} else {
									return false;
								}
							} else {
								return false;
							}
						});
						//将数据备份
						_editTVMod.editOneItemDataBack = parseData_back(_editData[0]);
					} else {
						_editTVMod.remind = ('请勾选左侧选框确定所需编辑的选项');
						_editTVMod.isEditOne(false);
						_editTVMod.editOneItem = _editData[0];
						_editTVMod.isEditMultiplePeriod(false);
						_editTVMod.isEditMultipleRangeFilter(false);
						_editTVMod.isEditMultipleSlopeFilter(false);
						_editTVMod.multipleEditPeriod(0);
						_editTVMod.multipleEditIsStore(false);
						_editTVMod.multipleEditRangeFilter(false);
						_editTVMod.multipleEditRangeMin(0);
						_editTVMod.multipleEditRangeMax(0);
						_editTVMod.multipleEditSlopeFilter(false);
						_editTVMod.multipleEditSlopeMin(0);
						_editTVMod.multipleEditSlopeMax(0);
					}
					_editTVMod.isValide = ko.computed(function() {
						if(_editTVMod.isEditOne()) {
							var _rangeHasError = false;
							if(_editTVMod.editOneItem.rangeFilter() && (_editTVMod.editOneItem.rangeMin.hasError() || _editTVMod.editOneItem.rangeMax.hasError() || _editTVMod.rangeError())) {
								_rangeHasError = true;
							} else {
								_rangeHasError = false;
							}
							var _slopeHasError = false;
							if(_editTVMod.editOneItem.slopeFilter() && (_editTVMod.editOneItem.slopeMin.hasError() || _editTVMod.editOneItem.slopeMax.hasError() || _editTVMod.slopeError())) {
								_slopeHasError = true;
							} else {
								_slopeHasError = false;
							}
							var _commonHasError = false;
							//如果是虚拟设备
							if('VirtualDevice' == _deviceTemplateVariant._deviceCodeName()) {
								if(_editTVMod.editOneItem.name.hasError() || _editTVMod.editOneItem.variantPrecision.hasError() ||
									_editTVMod.editOneItem.variantPeriod.hasError() || _editTVMod.editOneItem.variantUint.hasError()) {
									_commonHasError = true;
								} else {
									_commonHasError = false;
								}
							} else {
								if(_editTVMod.editOneItem.variantPeriod.hasError()) {
									_commonHasError = true;
								} else {
									_commonHasError = false;
								}
							}
							if(_rangeHasError || _slopeHasError || _commonHasError) {
								return false;
							} else {
								return true;
							}
						} else {
							var _rangeHasError = false;
							if(_editTVMod.isEditMultipleRangeFilter() && _editTVMod.multipleEditRangeFilter() && (_editTVMod.multipleEditRangeMax.hasError() || _editTVMod.multipleEditRangeMin.hasError() || _editTVMod.multipleEditRangeError())) {
								_rangeHasError = true;
							} else {
								_rangeHasError = false;
							}
							var _slopeHasError = false;
							if(_editTVMod.isEditMultipleSlopeFilter() && _editTVMod.multipleEditSlopeFilter() && (_editTVMod.multipleEditSlopeMin.hasError() || _editTVMod.multipleEditSlopeMax.hasError() || _editTVMod.multipleEditSlopeError())) {
								_slopeHasError = true;
							} else {
								_slopeHasError = false;
							}
							if(_rangeHasError || _slopeHasError || (_editTVMod.multipleEditPeriod.hasError() && _editTVMod.isEditMultiplePeriod())) {
								return false;
							} else {
								return true;
							}
						}
					});
					window.undfan.window.showModal({
						viewModel: _editTVMod,
						template: 'template-editTemplateVariant-modal',
						width: 400
					});
					$('#editisstore').bootstrapSwitch({
						onText: "&nbsp;&nbsp;ON&nbsp;&nbsp;",
						offText: "&nbsp;&nbsp;OFF&nbsp;&nbsp;",
						size: "mini",
						animate: false,
						onSwitchChange: function(event, state) {
							if(state == true) {
								_editTVMod.editOneItem.isStore(true);
							} else {
								_editTVMod.editOneItem.isStore(false);
							}
						}
					});
					$('#editrangefilter').bootstrapSwitch({
						onText: "&nbsp;&nbsp;ON&nbsp;&nbsp;",
						offText: "&nbsp;&nbsp;OFF&nbsp;&nbsp;",
						size: "mini",
						animate: false,
						onSwitchChange: function(event, state) {
							if(state == true) {
								_editTVMod.editOneItem.rangeFilter(true);
							} else {
								_editTVMod.editOneItem.rangeFilter(false);
							}
						}
					});
					$('#editslopefilter').bootstrapSwitch({
						onText: "&nbsp;&nbsp;ON&nbsp;&nbsp;",
						offText: "&nbsp;&nbsp;OFF&nbsp;&nbsp;",
						size: "mini",
						animate: false,
						onSwitchChange: function(event, state) {
							if(state == true) {
								_editTVMod.editOneItem.slopeFilter(true);
							} else {
								_editTVMod.editOneItem.slopeFilter(false);
							}
						}
					});
					$('#multipleEditIsStore').bootstrapSwitch({
						onText: "&nbsp;&nbsp;ON&nbsp;&nbsp;",
						offText: "&nbsp;&nbsp;OFF&nbsp;&nbsp;",
						size: "mini",
						animate: false,
						onSwitchChange: function(event, state) {
							if(state == true) {
								_editTVMod.multipleEditIsStore(true);
							} else {
								_editTVMod.multipleEditIsStore(false);
							}
						}
					});
					$('#multipleEditRangeFilter').bootstrapSwitch({
						onText: "&nbsp;&nbsp;ON&nbsp;&nbsp;",
						offText: "&nbsp;&nbsp;OFF&nbsp;&nbsp;",
						size: "mini",
						animate: false,
						onSwitchChange: function(event, state) {
							if(state == true) {
								_editTVMod.multipleEditRangeFilter(true);
							} else {
								_editTVMod.multipleEditRangeFilter(false);
							}
						}
					});
					$('#multipleEditSlopeFilter').bootstrapSwitch({
						onText: "&nbsp;&nbsp;ON&nbsp;&nbsp;",
						offText: "&nbsp;&nbsp;OFF&nbsp;&nbsp;",
						size: "mini",
						animate: false,
						onSwitchChange: function(event, state) {
							if(state == true) {
								_editTVMod.multipleEditSlopeFilter(true);
							} else {
								_editTVMod.multipleEditSlopeFilter(false);
							}
						}
					});

				}
			}
		}();
		var _deleteData = [];
		this.deleteVariant = function() {
			_deleteData = [];
			var _formData = $('#devicetemplatetable').bootstrapTable('getSelections'); //得到选择行的数据的数组
			for(var i = 0; i < _formData.length; i++) {
				var parsedata = parseData(_formData[i])
				_deleteData.push(parsedata);
			}
			console.log(_deleteData)
			if(0 == _deleteData.length) {
				alert('选择删除对象')
				return;
			}
			_deviceTemplateVariant.deleteDeviceTemplateModal.show();
		};
		this.deleteDeviceTemplateModal = function() {
			var _delDTMod = {};
			_delDTMod.title = "";
			_delDTMod.btnOk = function() {
				var _deleteCode = [];
				for(var i = 0; i < _deleteData.length; i++) {
					var code = _deleteData[i].code();
					_deleteCode.push(code)
				}
				$('#devicetemplatetable').bootstrapTable('remove', {
					field: 'Code',
					values: _deleteCode
				});
				_templateVariantApi.deleteTemplateVariant(ko.utils.stringifyJson(_deleteData), _deviceTemplateVariant._deviceTemplateId, function(data, textStatus, jqXHR) {
					//将view数据源中对应的数据删除
					//					$.each(_deleteData, function(index, value) {
					//						var _code = value.Code;
					//						$.each(_deviceTemplateVariant.deviceVariant.variantList(), function(_index, _value) {
					//							if(_code == _value.code()) {
					//								_deviceTemplateVariant.deviceVariant.variantList.remove(_value);
					//								return false;
					//							}
					//						});
					//					});
				}, function() {
					toastr.warning('删除模板变量失败', '提示信息：', {
						timeOut: 5000,
						closeButton: true,
						progressBar: true
					});
				});
			}
			return {
				show: function(item) {
					_delDTMod.title = "删除确认";
					_delDTMod.deleteItem = item;
					window.undfan.window.showModal({
						viewModel: _delDTMod,
						template: 'template-deleteTemplateVariant-modal',
						width: 400
					});
				}
			}
		}();
	}

	//创建该模块
	undfan.deviceTemplateVariant = new DeviceTemplateVariant();

	//把该模块添加到系统中
	undfan.route.add(undfan.deviceTemplateVariant);

}(jQuery));