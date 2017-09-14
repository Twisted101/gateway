(function($) {
	$('#backupsDataModal').modal('show');

	function backupsDataModel() {
		this.downloadFile = function(){
			console.log('1')
		};
		this.closeModal = function() {
			$('#backupsDataModal').on('hidden.bs.modal', function(e) {
				var iframeDom = window.parent.document.getElementById('iframeDom');
				iframeDom.style.visibility = 'hidden';
				iframeDom.setAttribute('src', '')
			})
		}
	}
	ko.applyBindings(new backupsDataModel());

}(jQuery));