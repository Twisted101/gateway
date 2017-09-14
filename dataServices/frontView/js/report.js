(function($) {
	if(!window.FV) {
		window.FV = {};
	}
	
	Report = function(){
		this.aaa = ko.observable('aaaaa');
	}
	FV.report = new Report;
}(jQuery))