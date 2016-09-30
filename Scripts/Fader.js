define(['setting', 'intervalTimer']);

function Fader(container, images) {

    // Get settings.
    this.settings = new Settings();

    // Array of images to be faded between.
    this.images = images;

    // Fader Data.
    this.data = {
        initialized: false,
        nextImageIndex: 0,
        faded: false,
    }

    // Components. Timer for fading, container and the two images.
    this.components = {
        container: container,
        intervalTimer: null,
        frontImage: null,
        backImage: null,
        activeImage: null,
        animator: null
    }

    this.initialize();
}

Fader.prototype.initialize = function () {
    if (!this.data.initialized) {
        this.components.frontImage = document.createElement("img");
        $(this.components.frontImage).attr("src", this.getNextImage());
        this.data.nextImageIndex++;

        this.components.backImage = document.createElement("img");
        $(this.components.backImage).attr("src", this.getNextImage());

        $(this.components.container).append(this.components.backImage);
        $(this.components.container).append(this.components.frontImage);

        $("#" + this.components.container.id + " img").css("position", "absolute");
        this.data.initialized = true;

        return true;
    }

    return false;
}

Fader.prototype.start = function () {
    if (!this.intervalTimer) {
        this.intervalTimer = new IntervalTimer(this, this.settings.displayTime);
        this.intervalTimer.start();
        return true;
    }

    if (this.intervalTimer.paused) {
        this.fade();
        return this.intervalTimer.start();
    }
    return false;
}

Fader.prototype.stop = function () {
    if (!this.intervalTimer.paused) {
        if (this.components.animator) {
            this.components.animator.stop();
        }
        this.intervalTimer.stop();
        return true;
    }
    return false;
}

Fader.prototype.fade = function () {
    if (this.data.initialized) {

        var opacity = this.data.faded ? 1 : 0;
        var self = this;

        this.components.animator = $(this.components.frontImage).stop().animate({
            "opacity": opacity
        }, this.settings.fadeTime, function () {
            self.data.faded = !self.data.faded;
            self.components.activeImage = !self.data.faded ? self.components.frontImage : self.components.backImage;

            if (self.settings.randomize) {
                $(self.components.activeImage).attr("src", self.getRandomImage());
            } else {
                $(self.components.activeImage).attr("src", self.getNextImage());
                self.data.nextImageIndex++;
            }
        });

        return true;
    }

    return false;
}

Fader.prototype.getNextImage = function () {
    return this.images[this.data.nextImageIndex];
}

Fader.prototype.getRandomImage = function () {
    return this.images[Math.round(Math.random() * images.length)];
}

Fader.prototype.getIndexOfNextImage = function () {
    var imageIndex = this.activeImageIndex + 1;
    return imageIndex < this.images.length ? imageIndex : 0;
}
