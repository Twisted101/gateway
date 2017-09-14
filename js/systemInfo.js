(function($) {
	var SystemInfo = function() {
		var _systemInfo = this;

		var _pattern = /^\/systemInfo\/?$/;
		var _systemInfoApi = new undfan.SystemInfo();
		undfan.routeItem.call(this, {
			htmlUrl: 'template/systemInfo.html',
			pattern: _pattern,
			templateId: 'template-systemInfo'
		});

		this.smartgate_name = ko.observable("SmartGate3000");
		this.smartgate_sn = ko.observable("A1608000001");
		this.smartgate_soft = ko.observable("4.0.2600");
		this.smartgate_hard = ko.observable("1.1");

		//通用的饼图设置↓
		var dataStyle = {
			normal: {
				label: {
					show: false
				},
				labelLine: {
					show: true
				},
				shadowBlur: 10,
				shadowColor: 'rgba(30, 30, 30, 0.1)',
			}
		};
		var placeHolderStyle = {
			normal: {
				color: 'rgba(0,0,0,0)',
				label: {
					show: false
				},
				labelLine: {
					show: false
				}
			},
			emphasis: {
				color: 'rgba(0,0,0,0)'
			}
		};
		//通用的饼图设置

		//↓设备信息↓
		var myChart_device = null;
		var option_device = {};
		var device_info = function() {
			myChart_device = echarts.init(document.getElementById('deviceInfo'));
			option_device = {
				color: ['#A6DCB2', '#fbfbfb'],
				tooltip: {
					show: true,
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					show: false,
					itemGap: 12,
					data: ['01', '02']
				},
				toolbox: {
					show: false,
					feature: {
						mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				series: [{
						name: '在线设备',
						clockWise: false,
						hoverAnimation: false,
						type: 'pie',
						radius: ['92%', '95%'],
						label: {
							normal: {
								position: 'center'
							}
						},
						data: [{
							value: 21,
							name: '占有率',
							label: {
								normal: {
									formatter: '{c}',
									textStyle: {
										color: "#6DBC7E",
										fontSize: 40
									}
								}
							}
						}, {
							value: 10,
							name: '占位',
							label: {
								normal: {
									formatter: '\设备在线',
									textStyle: {
										color: '#98A0C4',
										fontSize: 20
									}
								}
							},
							tooltip: {
								show: false
							},
							itemStyle: {
								normal: {
									color: '#fcfcfc'
								},
								emphasis: {
									color: '#fcfcfc'
								}
							},
							hoverAnimation: false
						}]
					},
					{
						type: 'pie',
						clockWise: false,
						radius: ['80%', '84%'],
						itemStyle: dataStyle,
						hoverAnimation: false,
						data: [{
							value: 31,
							name: '设备总数'
						}]
					}
				]
			};
			myChart_device.setOption(option_device);
			window.addEventListener('resize', function() {
				myChart_device.resize()
			})
		};
		//↑设备信息↑ 

		//↓内部存储↓
		var myChart_storage = null;
		var option_storage = {};
		var xixixi;
		var storage_info = function() {
			myChart_storage = echarts.init(document.getElementById('storage'));
			option_storage = {
				color: ['#A4AFD2', '#fcfcfc'],
				tooltip: {
					show: true,
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					show: false,
					itemGap: 12,
					data: ['01', '02']
				},
				toolbox: {
					show: false,
					feature: {
						mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				series: [{
						name: '已用空间',
						clockWise: false,
						hoverAnimation: false,
						type: 'pie',
						radius: ['92%', '95%'],
						label: {
							normal: {
								position: 'center'
							}
						},
						data: [{
							value: 100,
							name: '占有率',
							label: {
								normal: {
									formatter: '{c}M',
									textStyle: {
										color: "#6A78A8",
										fontSize: 40
									}
								}
							}
						}, {
							value: 900,
							name: '占位',
							label: {
								normal: {
									formatter: '\已用空间',
									textStyle: {
										color: '#98A0C4',
										fontSize: 20
									}
								}
							},
							tooltip: {
								show: false
							},
							itemStyle: {
								normal: {
									color: '#fcfcfc'
								},
								emphasis: {
									color: '#fcfcfc'
								}
							},
							hoverAnimation: false
						}]
					},
					{
						type: 'pie',
						clockWise: false,
						radius: ['80%', '84%'],
						itemStyle: dataStyle,
						hoverAnimation: false,
						data: [{
							value: 1000,
							name: '共计空间',
							label: {
								normal: {
									formatter: '{C}M',
									textStyle: {
										fontSize: 20
									}
								}
							}
						}]
					}
				]
			};
			myChart_storage.setOption(option_storage);
			window.addEventListener('resize', function() {
				myChart_storage.resize()
			})
		}
		//↑内部存储↑

		//外部存储↓
		var myChart_sdStorage = null;
		var option_sdStorage = {};
		var sdStorage_info = function() {
			myChart_sdStorage = echarts.init(document.getElementById('sdStorage'));
			option_sdStorage = {
				color: ['#F5CCA5', '#fcfcfc'],
				tooltip: {
					show: true,
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					show: false,
					itemGap: 12,
					data: ['01', '02']
				},
				toolbox: {
					show: false,
					feature: {
						mark: {
							show: true
						},
						dataView: {
							show: true,
							readOnly: false
						},
						restore: {
							show: true
						},
						saveAsImage: {
							show: true
						}
					}
				},
				series: [{
						name: '已用空间',
						clockWise: false,
						hoverAnimation: false,
						type: 'pie',
						radius: ['92%', '95%'],
						label: {
							normal: {
								position: 'center'
							}
						},
						data: [{
							value: 500.5,
							name: '占有率',
							label: {
								normal: {
									formatter: '{c}M',
									textStyle: {
										fontSize: 40,
										color: '#FDBA7A'
									}
								}
							}
						}, {
							value: 499.5,
							name: '占位',
							label: {
								normal: {
									formatter: '\已用空间',
									textStyle: {
										color: '#98A0C4',
										fontSize: 20
									}
								}
							},
							tooltip: {
								show: false
							},
							itemStyle: {
								normal: {
									color: '#fcfcfc'
								},
								emphasis: {
									color: '#fcfcfc'
								}
							},
							hoverAnimation: false
						}]
					},
					{
						type: 'pie',
						clockWise: false,
						radius: ['80%', '84%'],
						itemStyle: dataStyle,
						hoverAnimation: false,
						data: [{
							value: 1000,
							name: '总计空间'
						}]
					}
				]
			};
			myChart_sdStorage.setOption(option_sdStorage);
			window.addEventListener('resize', function() {
				myChart_sdStorage.resize();
			})
		};
		//外部存储↑

		//CPU信息 
		var myChart_cpu = null;
		var option_cpu = {};
		var _cpu_info = function() {
			myChart_cpu = echarts.init(document.getElementById('cpu_info'));
			option_cpu = {
				tooltip: {
					trigger: 'axis'
				},
				xAxis: [{
					name: '时间',
					type: 'category',
					boundaryGap: true,
					data: (function() {
						var now = new Date();
						var res = [];
						var len = 20;
						while(len--) {
							res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
							now = new Date(now - 2000);
						}
						return res;
					})()
				}],
				yAxis: [{
					type: 'value',
					scale: true,
					name: 'CPU占用百分比',
					min: 0,
					max: 100,
					boundaryGap: [0.2, 0.2]
				}],
				series: [{
					name: 'CPU占用百分比',
					type: 'line',
					data: (function() {
						var res = [];
						var len = 20;
						while(len--) {
							res.push(0);
						}
						return res;
					})()
				}]
			};
		};

		//内存信息
		var myChart_mem = null;
		var option_mem = {};
		var _mem_info = function() {
			myChart_mem = echarts.init(document.getElementById('mem_info'));
			option_mem = {
				tooltip: {
					trigger: 'axis'
				},
				xAxis: [{
					name: '时间',
					type: 'category',
					boundaryGap: true,
					data: (function() {
						var now = new Date();
						var res = [];
						var len = 20;
						while(len--) {
							res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
							now = new Date(now - 2000);
						}
						return res;
					})()
				}],
				yAxis: [{
					type: 'value',
					scale: true,
					name: '内存占用百分比',
					min: 0,
					max: 100,
					boundaryGap: [0.2, 0.2]
				}],
				series: [{
					name: '内存占用百分比',
					type: 'line',
					data: (function() {
						var res = [];
						var len = 20;
						while(len--) {
							res.push(0);
						}
						return res;
					})()
				}]
			};
		};

		this.bind('init', function() {

		});

		this.bind('show', function(strUrl) {
			undfan.route.changeItem(_systemInfo);
		});

		var axisData_mem;
		var data0_mem;
		var axisData_cpu;
		var data0_cpu;
		this.intervalCPU_MEM = function(data) {
			axisData_mem = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
			data0_mem = option_mem.series[0].data;
			data0_mem.shift();
			_tmpData = data.Mem;
			data0_mem.push(_tmpData.toFixed(2));
			option_mem.xAxis[0].data.shift();
			option_mem.xAxis[0].data.push(axisData_mem);
			myChart_mem.setOption(option_mem);
			window.addEventListener('resize', function() {
				myChart_mem.resize()
			})
			//cpu
			axisData_cpu = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
			data0_cpu = option_cpu.series[0].data;
			data0_cpu.shift();
			_tmpData = data.Cpu;
			data0_cpu.push(_tmpData.toFixed(2));
			option_cpu.xAxis[0].data.shift();
			option_cpu.xAxis[0].data.push(axisData_cpu);
			myChart_cpu.setOption(option_cpu);
			window.addEventListener('resize', function() {
				myChart_cpu.resize()
			})
		};
		var nTimeId = null;
		this.bind('afterRender', function() {
			//开启关闭导航栏时重新定位图表
			var resizeAll = function() {
				myChart_mem.resize();
				myChart_cpu.resize();
				myChart_sdStorage.resize();
				myChart_storage.resize();
				myChart_device.resize();
			}
			$('.hamburger').click(function() {
				var t = setTimeout(resizeAll, 400)
			})

			device_info();

			xixixi = '自定义变量';
			storage_info();

			sdStorage_info();
			// 使用刚指定的配置项和数据显示图表。
			_cpu_info();
			_mem_info();

			nTimeId = setInterval(function() {
				var _updateData = {};
				//模拟CPU数据
				_updateData.Cpu = Math.floor(Math.random() * 100 * 100) / 100;
				_updateData.Mem = Math.floor(Math.random() * 100 * 100) / 100;
				_systemInfo.intervalCPU_MEM(_updateData);
			}, 2100);
		});

		this.bind('hide', function(strUrl) {

		});

		this.editInfo = function() {
			_systemInfo.editInfoModal.show();
		}
		this.editInfoModal = function() {
			var _editSIMod = {};
			_editSIMod.editName = ko.observable("").extend({
				validation: [{
						validate: 'notnull'
					},
					{
						validate: 'charnumscore'
					},
					{
						validate: 'strlen',
						max: 32
					}
				]
			});
			_editSIMod.isValide = ko.computed(function() {
				if(_editSIMod.editName.hasError()) {
					return false;
				} else {
					return true;
				}
			});
			_editSIMod.btnOk = function() {
				if(!_editSIMod.isValide()) {
					return false;
				};
				var _putEdit = {};
				var _hasChange = false;
				if(_editSIMod.editName() != _systemInfo.smartgate_name()) {
					_hasChange = true;
					_putEdit.Name = _editSIMod.editName();
				}
				if(!_hasChange) {
					//没有变化，不需要更新
					return;
				}

				_systemInfo.smartgate_name(_editSIMod.editName());
				_systemInfoApi.updateSmartGateName(ko.utils.stringifyJson(_putEdit), function(data, textStatus, jqXHR) {
					toastr.success('更新成功', '提示信息：', {
						timeOut: 5000,
						closeButton: true,
						progressBar: true
					});

				}, function() {
					toastr.warning('更新失败', '提示信息：', {
						timeOut: 5000,
						closeButton: true,
						progressBar: true
					});
				});
			}
			return {
				show: function() {
					_editSIMod.editName(_systemInfo.smartgate_name());
					window.undfan.window.showModal({
						viewModel: _editSIMod,
						template: 'template-editSystemInfo-modal',
						width: 400
					});
				}
			}
		}();
		this.bind('hide', function(strUrl) {
			//只有由当前模块切换到其它模块才会引发该事件
			clearInterval(nTimeId);
		});
	}

	//创建该模块
	undfan.systemInfo = new SystemInfo();

	//把该模块添加到系统中
	undfan.route.add(undfan.systemInfo);

}(jQuery));