(function($) {
	if(!window.FV) {
		window.FV = {};
	}
	var ChangePage = function() {
		var _changePage = this;
		this.showTemplate = ko.observable(true);
		this.showTemplateTable = ko.observable(false);
		this.showReport = ko.observable(false);
		this.showReportTable = ko.observable(false);
	}
	FV.changePage = new ChangePage();
}(jQuery))