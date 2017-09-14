(function ($) {
	var ExtendManage = function()
    {
        var _extendManage = this;

        var _pattern = /^\/extendManage\/?$/;

        undfan.routeItem.call(this, {
            htmlUrl: 'template/extendManage.html',
            pattern: _pattern,
            templateId: 'template-extendManage'
        });

        this.bind('init', function(){
        	
        });

        this.bind('show', function(strUrl){
            undfan.route.changeItem(_extendManage);
        });

        this.bind('afterRender', function() {
           
        });

        this.bind('hide', function(strUrl){
        	
        });

    }

    //创建该模块
    undfan.extendManage = new ExtendManage();

    //把该模块添加到系统中
    undfan.route.add(undfan.extendManage);

}(jQuery));