(function($) {
	$('#serialHelperModal').modal('show');

	function serialHelperModel() {
		var _serialHelperModal = this;
		this.title = "串口助手";
		this.showRecvTime = ko.observable(false);//是否显示接受时间
		this.serialHelpRecvTextarea = ko.observable('');//接收区
		this.serialHelpSendTextarea = ko.observable('');//发送区
		this.clearRecv = function(){
			_serialHelperModal.serialHelpRecvTextarea('');
		};
		
		this.clearSend = function(){
			_serialHelperModal.serialHelpSendTextarea('');
		};
		
		this.sendData = function(){
			
		};
		this.closeModal = function() {
			$('#serialHelperModal').on('hidden.bs.modal', function(e) {
				var iframeDom = window.parent.document.getElementById('iframeDom');
				iframeDom.style.visibility = 'hidden';
				iframeDom.setAttribute('src', '')
			})
		}
	}
	ko.applyBindings(new serialHelperModel());

}(jQuery));