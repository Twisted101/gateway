(function($){

	if(!window.undfan) {
		window.undfan = {};
	}

    var fan = window.undfan;

	var _curX = -1;
	var _curY = -1;

	var _bMoving = false;
    var _unSelect = false;

    fan.window = fan.window || {};

    var createModalElement = function(templateName, viewModel) {
        var temporaryDiv = addHiddenDivToBody();
        var deferredElement = $.Deferred();
        ko.renderTemplate(
            templateName,
            viewModel,
            // We need to know when the template has been rendered,
            // so we can get the resulting DOM element.
            // The resolve function receives the element.
            {
                afterRender: function (nodes) {
                    // Ignore any #text nodes before and after the modal element.
                    var elements = nodes.filter(function(node) {
                         return node.nodeType === 1; // Element
                    });
                    deferredElement.resolve(elements[0]);
                }
            },
            // The temporary div will get replaced by the rendered template output.
            temporaryDiv,
            "replaceNode"
        );
        // Return the deferred DOM element so callers can wait until it's ready for use.
        return deferredElement;
    };
     
    var addHiddenDivToBody = function() {
        var div = document.createElement("div");
        div.style.display = "none";
        document.body.appendChild(div);
        return div;
    };

    // showModal
    var showModal = function(options) {
    	//删除所有存在的弹出框
        $.each($(".modal.fade"), function(index,value) {
        	value.remove();
        });
        if (typeof options === "undefined") throw new Error("An options argument is required.");
        if (typeof options.viewModel !== "object") throw new Error("options.viewModel is required.");
     
        var viewModel = options.viewModel;
        var template = options.template || viewModel.template;
        var context = options.context||viewModel; //函数执行this所指的对象
             
        if (!template) throw new Error("options.template or options.viewModel.template is required.");
             
        return createModalElement(template, viewModel)
            .pipe($) // jQueryify the DOM element
            .pipe(function($ui) {
                var deferredModalResult = $.Deferred();
                addModalHelperToViewModel(viewModel, deferredModalResult, context);
                showTwitterBootstrapModal($ui);
                adjustTwitterBootstrapModal($ui,options);
                whenModalResultCompleteThenHideUI(deferredModalResult, $ui);
                whenUIHiddenThenRemoveUI($ui);
                return deferredModalResult;
            });
    };
    var addModalHelperToViewModel = function (viewModel, deferredModalResult, context) {
        var _$pre,
            _tmp;
        // Provide a way for the viewModel to close the modal and pass back a result.
        viewModel.modal = {
            close: function (result) {
                if (typeof result !== "undefined") {
                    deferredModalResult.resolveWith(context, [result]);
                } else {
                    // When result is undefined, we don't want any `done` callbacks of
                    // the deferred being called. So reject instead of resolve.
                    deferredModalResult.rejectWith(context, []);
                }
            }
        };
        _tmp =  fan.window.showModal.stack;
        _$pre = _tmp[_tmp.length-1];
        _$pre&&_$pre.hide();
        // hide previous window
    };
    var adjustTwitterBootstrapModal = function($ui,options) {
//      var _left,_top;
//      var position = options.position;
//      var slimScroll = options.slimScroll;
//      var width = options.width;
//      var _tmp,
//          _$current;
        // 默认事件位置为要显示的modal的中心位置
        // 并且x>=200,y>=100
        // 
//      if(position){
//          _left = position.left?position.left-$ui.outerWidth()/2:null;
//          _left = _left<200?200:_left;
//          _top = position.top?position.top-$ui.outerHeight()/2:null;
//          _top = _top < 100?100:_top;

//          $ui.find('.modal-dialog').css({
//              'margin-left': _left+'px',
//              'margin-top': _top+'px'
//          });
//      }

//      if(width)
//      {
//          if(width<200)
//          {
//              width = 200;
//          }
//          $ui.find('.modal-dialog').css({
//              'width': width+'px'
//          });
//      }
        // 定义slimScroll插件
//      if(slimScroll){
//          $ui.children('.modal-body').slimScroll(slimScroll);
//      }
        // 加自定义的class, 而不用在每个模板中写
        //$ui.addClass("window");
        //
//      $ui.find('form:first *:input[type!=hidden]:first').focus();

        // 栈式窗口
        // stack current modal
        // _tmp = ko.window.showModal.stack;
        // _tmp.push($ui);
    };
    var showTwitterBootstrapModal = function($ui) {
        // Display the modal UI using Twitter Bootstrap's modal plug-in.
        $ui.modal({
            // Clicking the backdrop, or pressing Escape, shouldn't automatically close the modal by default.
            // The view model should remain in control of when to close.
            backdrop: 'static',
            keyboard: false
        });
//      $ui.modal('show');
    };
         
    var whenModalResultCompleteThenHideUI = function (deferredModalResult, $ui) {
        // When modal is closed (with or without a result)
        // Then always hide the UI.
        deferredModalResult.always(function () {
            $ui.modal("hide");
        });
    };
     
    var whenUIHiddenThenRemoveUI = function($ui) {
        
        $ui.on("hidden", function() {
            // Call ko.cleanNode before removal to prevent memory leaks.
            $ui.each(function (index, element) { ko.cleanNode(element); });
            $ui.remove();
        });
    };

    fan.window.showModal = showModal;
    fan.window.showModal.stack = [];

}(jQuery));