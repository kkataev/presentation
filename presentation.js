
var presentation = (function() {

	var data = [];

	var currentPres = null,
		currentSlide = null;

	var startSlide = 0;	


	function initialization (options) {
		
		$(".presentation").each( function (index) {
			var slides = [];
			var mainElem = $(this);
			var startLink = $( "<a href='#' class='start'>View presentation</a>" );
			mainElem.append(startLink);

			setAllSlideInactive();

			mainElem.find(".slide").each( function(ind) {
				slides.push(new slide(ind, $(this).attr("id")));
			});

			data.push(slides);
			console.log(data);
		})
		
		setSlideFromURL();

		$(".start").click(function() {
			currentPres = $(this).parent().index();
			currentSlide = startSlide;
			setSlideActive(currentPres, currentSlide);
		});

		arrowsEventHandler();

	}

	function setSlideActive(currP, currS) {
		setAllSlideInactive();
		$("#" + data[currP][currS].slideId).addClass("active").removeClass("inactive");
	}

	function setAllSlideInactive() {
		$(".slide").each( function(index) {
			$(this).addClass("inactive").removeClass("actives");
		})
	}

	function getSlideById(id) {
		console.log(data.length)
		for (var i = 0; i < data.length; i++) {
			for (var _i = 0; _i < data[i].length; _i++){
				if (data[i][_i].slideId == id) {
					currentPres = i;
					currentSlide = _i;
				}
			}
		}
		setSlideActive(currentPres, currentSlide);
	}

	function getIdBySlide() {
		return data[currentPres][currentSlide].slideId;
	}

	function getNextSlide() {
		if (data[currentPres][currentSlide + 1]) {
			currentSlide += 1;
			setSlideActive(currentPres, currentSlide);

			var id = getIdBySlide();
			setURLFromSlide(id);
		}
	}	

	function getPreviousSlide() {
		if (data[currentPres][currentSlide - 1]) {
			currentSlide -= 1;
			setSlideActive(currentPres, currentSlide);

			var id = getIdBySlide();
			setURLFromSlide(id);
		}
	}	

	// Get slide from hash
	function setSlideFromURL() {
		var	hash = window.location.hash;
		var id = hash.replace('#','');
		if (id) getSlideById(id);
	}

	function setURLFromSlide(id) {
		window.location.hash = id;
	}

	// Set handlers for "arrow" keys 
	function arrowsEventHandler() {
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

	function slide(index, slide) {
		this.id = index;
		this.slideId = slide;
	}

	return {
		initialization: initialization,
	}
})();



