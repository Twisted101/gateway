(function($) {
	$('#restartSGmodal').modal('show');
	function restartSGModel() {
		this.title = ko.observable('确定重启网关吗？')
		this.closeModal = function() {
			$('#restartSGmodal').on('hidden.bs.modal', function(e) {
				var iframeDom = window.parent.document.getElementById('iframeDom');
				iframeDom.style.visibility = 'hidden';
				iframeDom.setAttribute('src', '')
			})
		}
	}
	ko.applyBindings(new restartSGModel());
}(jQuery));