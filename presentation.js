var presentation = (function() {

	var data = [], // Presentation array
		currentPres = null, // Current presentation (index)
		currentSlide = null, // Current slide (index)
		startSlide = 0;	// Start slide

	function initialization (options) {
		
		$(".presentation").each( function (index) {
			var slides = [],
				mainElem = $(this),
				startLink = $( "<span class='start'>View presentation</span>" );
			mainElem.append(startLink);

			setAllSlideInactive();

			// Set slides array
			mainElem.find(".slide").each( function(ind) {
				slides.push(new slide(ind, $(this).attr("id")));
			});

			// Set presentation array
			data.push(slides);
		})
		
		showAllMiniatures();

		setSlideFromURL();


		// Establish event hanlers
		$(".start").click(function(event) {
			var indexOfPar = $(this).parent().index() - 1 // number of element in array starts from 0 (zero)
			showAllMiniatures();
			currentPres = indexOfPar;
			currentSlide = startSlide;
			hideMiniature($(this).parent())
			setSlideActive();
		});

		arrowsEventHandler();

	}

	function showAllMiniatures() {
		$(".presentation").each( function (index) {
			$(this).find(".slide").first().addClass("miniature");
		})
	}

	function hideMiniature(main) {
		$(main).find(".slide").first().removeClass("miniature");
	}

	function setSlideActive() {
		var id = getIdBySlide();
		setAllSlideInactive();
		$("#" + id).addClass("active").removeClass("inactive");
		setURLFromSlide(id);
	}

	function getSlideById(id) {
		for (var i = 0; i < data.length; i++) {
			for (var _i = 0; _i < data[i].length; _i++){
				if (data[i][_i].slideId == id) {
					currentPres = i;
					currentSlide = _i;
				}
			}
		}
		hideMiniature($("#" + id).parent());
		setSlideActive();
	}

	function getIdBySlide() {
		return data[currentPres][currentSlide].slideId;
	}

	function getNextSlide() {
		if (data[currentPres][currentSlide + 1]) {
			currentSlide += 1;
			setSlideActive();
		}
	}	

	function getPreviousSlide() {
		if (data[currentPres][currentSlide - 1]) {
			currentSlide -= 1;
			setSlideActive();
		}
	}	

	// Get slide from hash
	function setSlideFromURL() {
		var	hash = window.location.hash,
			id = hash.replace('#','');
		if (id) getSlideById(id);
	}

	function setURLFromSlide(id) {
		window.location.hash = id;
	}

	function setAllSlideInactive() {
		$(".slide").each( function(index) {
			$(this).addClass("inactive").removeClass("active");
		})
	}

	// Set handlers for "arrow" keys 
	function arrowsEventHandler() {
		document.onkeydown = function(e) {
			e = e || window.event;
			switch(e.which || e.keyCode) {
				case 37: 
					getPreviousSlide();
				break;
				case 39: 
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
		initialization: initialization
	}
})();



