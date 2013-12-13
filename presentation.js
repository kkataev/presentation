function start(el) {
	var elem = $(el);
	elem.parent().presentation.init();
}

(function ( $ ) {

 	$.fn.presentation = (function() {
        function init (options) {
			$(".slide").each( function(index) {
				if (index == 0) 
					$(this).addClass("active")
				else
					$(this).addClass("inactive")
			});
			document.onkeydown = function(e) {
	    		e = e || window.event;
	    		switch(e.which || e.keyCode) {
					case 37: 
						console.log("Get Previous Slide");
						getPreviousSlide();
					break;
					case 39: 
						console.log("Get Next Slide");
						getNextSlide();
					break;
					default: return;
				}
				e.preventDefault();
			}
		}
		function getNextSlide() {
			if ($(".slide.active").next().is("div.slide")) {
				$(".slide.active").next().removeClass("inactive").addClass("active");
				$(".slide.active").first().removeClass("active").addClass("inactive");
			}
		}	
		function getPreviousSlide() {
			$(".slide.active").prev().removeClass("inactive").addClass("active");
			$(".slide.active").next().removeClass("active").addClass("inactive");
		}	
		return {
			init: init,
			getNextSlide: getNextSlide
		}
	})();
 }( jQuery ));

