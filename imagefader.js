(function() {

	/*************************************************************************************************
			Add images to fade in this array. Can also be in folders, just include folderpath.
	*************************************************************************************************/
	var images = [
		"image1.jpg",
		"image2.jpg",
		"image3.jpg",
		"image4.jpg",
		"image5.jpg",
	];

	var parent = "#img-container";	// Det element der skal indeholde billederne. Kan være hvilket som helst element. Body, divs. osv.
	var showTime = 2500;			// Den tid hver billede vil blive vist. (Millisekunder)
	var fadeTime = 1000;			// Den tid det tager at fade fra det sidste viste billede til det nye. (Millisekunder)




































	/*************************************************************************************************
			DONT TOUCH CODE BELOW!.. Unless you know what you are doing :P
	*************************************************************************************************/
	var front; var back; var active;
	var imageIndex = -1;
	var faded = false;

	$(document).ready(function() {
		initImageFader();
		fade(showTime);
	});

	function initImageFader() {
		front = document.createElement("img");
		back = document.createElement("img");
		$(parent).append(back);
		$(parent).append(front);
		$(front).attr("src", getNextImage());
		$(back).attr("src", getNextImage());
		$(parent + " img").css("position", "fixed");
	}

	function fade(delay) {
		setInterval(function() {
			var opacity = faded ? 1 : 0;
			$(front).animate({
				"opacity": opacity
			}, fadeTime, function() {
				faded = !faded;
				active = faded ? front : back;
				$(active).attr("src", getNextImage());
			});
		}, delay);
	}

	function getNextImage() {
		imageIndex++;
		imageIndex = imageIndex < images.length ? imageIndex : 0;
		return images[imageIndex];
	}

})();