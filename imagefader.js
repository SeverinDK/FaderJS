(function () {

    /*************************************************************************************************
			Add images to fade in this array. Can also be in folders, just include folderpath.
	*************************************************************************************************/
    var images = [
	"http://placehold.it/1000x200",
	"http://placehold.it/1000x200/00cc00/000000",
        "http://placehold.it/1000x200",
        "http://placehold.it/1000x200/00cc00/000000",
        "http://placehold.it/1000x200",
        "http://placehold.it/1000x200/00cc00/000000",
    ];

    var parent = "#img-container";
    var showTime = 2500;
    var fadeTime = 1000;
    var randomize = false;



    var front; var back; var active;
    var imageIndex = -1;
    var faded = false;

    $(document).ready(function () {
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
        $(parent + " img").css("position", "absolute");
    }

    function fade(delay) {
        setInterval(function () {
            var opacity = faded ? 1 : 0;
            $(front).animate({
                "opacity": opacity
            }, fadeTime, function () {
                faded = !faded;
                active = faded ? front : back;
                if (randomize) {
                    $(active).attr("src", getRandomImage());
                } else {
                    $(active).attr("src", getNextImage());
                }
            });
        }, delay);
    }

    function getNextImage() {
        imageIndex++;
        imageIndex = imageIndex < images.length ? imageIndex : 0;
        return images[imageIndex];
    }

    function getRandomImage() {
        return images[Math.round(Math.random() * images.length)];
    }

})();
