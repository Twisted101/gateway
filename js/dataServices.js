(function ($) {
	var DataServices = function()
    {
        var _dataServices = this;

        var _pattern = /^\/dataServices\/?$/;

        undfan.routeItem.call(this, {
            htmlUrl: 'template/dataServices.html',
            pattern: _pattern,
            templateId: 'template-dataServices'
        });

        this.bind('init', function(){
        	
        });

        this.bind('show', function(strUrl){
            undfan.route.changeItem(_dataServices);
        });

		this.openNewPage = function(){
			window.open('dataServices/frontView/frontView.html');
			
		}

        this.bind('afterRender', function() {
           
        });

        this.bind('hide', function(strUrl){
        	
        });

    }

    //创建该模块
    undfan.dataServices = new DataServices();

    //把该模块添加到系统中
    undfan.route.add(undfan.dataServices);

}(jQuery));