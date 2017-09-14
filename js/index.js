 (function($) {
 	$(document).ready(function() {
 		$('[data-toggle="offcanvas"]').click(function() {
 			$('#wrapper').toggleClass('toggled');
 		});
 		$('.top-nav-toggle').click(function(e) {
 			e.stopPropagation();
 			$('.top-nav').fadeToggle(100);
 		})
 		if($('.top-nav').css('display') == 'block') {
 			$('body').click(function() {
 				$('.top-nav').fadeOut(50);
 			})
 		}

 		var sidebarNav = document.getElementById('sidebar-nav');
 		var dropdowns = sidebarNav.children;
 		var dropdownToggles = document.getElementsByClassName('dropdown-toggle');
 		var dropdownMenuLis = document.getElementsByClassName('dropdown-li');
 		var hasDropContents = document.getElementsByClassName("has-dropdown-content");
 		var dropContents = [];
 		for(var i = 0; i < hasDropContents.length; i++) {
 			var dropContent = hasDropContents[i].parentNode;
 			dropContents.push(dropContent);
 		}
 		for(var i = 0; i < hasDropContents.length; i++) {
 			(function(i) {
 				hasDropContents[i].addEventListener("click", function() {
 					if(!dropContents[i].classList.contains('open')) {
 						for(var j = 0; j < dropContents.length; j++) {
 							dropContents[j].classList.remove('open')
 						}
 						dropContents[i].classList.add('open')
 					} else {
 						dropContents[i].classList.remove('open')
 					}
 				})
 			})(i);
 		}

 		for(var i = 0; i < dropdownMenuLis.length; i++) {
 			(function(i) {
 				dropdownMenuLis[i].addEventListener('click', function() {
 					for(var j = 0; j < dropdownMenuLis.length; j++) {
 						dropdownMenuLis[j].classList.remove('chosen-li');
 					}
 					dropdownMenuLis[i].classList.add('chosen-li')
 				})
 			})(i);
 		}
 		$('.modal').on('show.bs.modal', function(e) {
 			$('#wrapper').css('position', 'static');
 		})
 		$('.modal').on('hidden.bs.modal', function(e) {
 			$('#wrapper').css('position', 'fixed');
 		})
 	});

 	undfan.route.load("/systemInfo");
 	undfan.undfanNavigateView = function() {
 		var _undfan_href = arguments[1].currentTarget.getAttribute("undfan-href");
 		if(null === _undfan_href || "" === _undfan_href) {
 			return;
 		}
 		
 		if('#' == _undfan_href.charAt(0)) {
 			_undfan_href = _undfan_href.substr(1);
 		}
 		undfan.route.load(_undfan_href);
 	};
 	ko.applyBindings(undfan);
 }(jQuery));


