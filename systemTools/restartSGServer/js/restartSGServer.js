(function($) {
	$('#restartSGmodal').modal('show');

	function restartSGserverModel() {
		this.closeModal = function() {
			$('#restartSGmodal').on('hidden.bs.modal', function(e) {
				var iframeDom = window.parent.document.getElementById('iframeDom');
				iframeDom.style.visibility = 'hidden';
				iframeDom.setAttribute('src', '')
			})
		}
	}
	ko.applyBindings(new restartSGserverModel());
}(jQuery));