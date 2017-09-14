(function ($) {
	var DeviceVariantData = function()
    {
        var _deviceVariantData = this;
        this.dVDataId = ko.observable();
        this.dVDataTemplateId = ko.observable();
        var _pattern = /^\/deviceVariantData\/Id\/(.*)\/TemplateId\/(.*)\/?$/;
        undfan.routeItem.call(this, {
            htmlUrl: 'template/deviceVariantData.html',
            pattern: _pattern,
            templateId: 'template-deviceVariantData'
        });

        this.bind('init', function(){
        	
        });

        this.bind('show', function(strUrl){
            undfan.route.changeItem(_deviceVariantData);
            _deviceVariantData.dVDataId(strUrl.replace(_pattern, '$1'));
            _deviceVariantData.dVDataTemplateId(strUrl.replace(_pattern, '$2'));
            //通过_deviceVariantData.dVDataTemplateId()
            //     undfan.deviceTemplate.deviceTemplateList()来判断是虚拟设备模板还是实际设备模板
            var dTList = undfan.deviceTemplate.deviceTemplateList();
			var devicetype;
			for(var i = 0;i<dTList.length;i++){
				if(dTList[i].id() == _deviceVariantData.dVDataTemplateId()){
					devicetype = dTList[i].deviceType();
				}
			}
			//得到设备类型 根据设备类型来调用不同请求的表格
			console.log(devicetype)
			if(devicetype == 'VirtualDevice'){
				console.log('虚拟虚拟')
			};
			if(devicetype == 'SerialDevice'){
				console.log('实际')
			}
            $('#devicemanagertable').bootstrapTable(); //生成表格
        });

        this.bind('afterRender', function() {
           
        });

        this.bind('hide', function(strUrl){
        	
        });

    }

    //创建该模块
    undfan.deviceVariantData = new DeviceVariantData();

    //把该模块添加到系统中
    undfan.route.add(undfan.deviceVariantData);

}(jQuery));