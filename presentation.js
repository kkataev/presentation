var presentation = (function() {

	var data = [];

	var currentPres = null,
		currentSlide = null;

	var startSlide = 0;	


	function initialization (options) {
		
		$(".presentation").each( function (index) {
			var slides = [];
			var mainElem = $(this);
			var startLink = $( "<span class='start'>View presentation</span>" );
			mainElem.append(startLink);

			setAllSlideInactive();

			mainElem.find(".slide").each( function(ind) {
				slides.push(new slide(ind, $(this).attr("id")));
			});

			data.push(slides);
			console.log(data);
		})
		
		showAllMiniatures();

		setSlideFromURL();

		$(".start").click(function(event) {
			showAllMiniatures();
			var indexOfPar = $(this).parent().index() - 1 // number of element in array starts from 0 (zero)
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
		setAllSlideInactive();
		console.log(currentPres + " " + currentSlide);
		var id = getIdBySlide();
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
		var	hash = window.location.hash;
		var id = hash.replace('#','');
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
		initialization: initialization
	}
})();



