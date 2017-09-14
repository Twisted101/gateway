(function($) {
	$('#sysUpdatemodal').modal('show');

	function sysUpdateModel() {
		var _sysUpdateModel = this;
		this.uploadFile = ko.observable('请选择升级包');

		this.uploadFile_inputClick = function() {
			$('#postedFile').click();
		};
		this.submitUpdate = function() {
			return true;
		};
		this.postedFileChange = function() {
			var postedFileVal = $('#postedFile').val();
			var pathArray = postedFileVal.split("\\");
			_sysUpdateModel.uploadFile(pathArray[pathArray.length - 1]);
		};
		this.closeModal = function() {
			$('#sysUpdatemodal').on('hidden.bs.modal', function(e) {
				var iframeDom = window.parent.document.getElementById('iframeDom');
				iframeDom.style.visibility = 'hidden';
				iframeDom.setAttribute('src', '')
			})
		}
	}
	ko.applyBindings(new sysUpdateModel());

}(jQuery));