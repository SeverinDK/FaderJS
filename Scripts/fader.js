define(['setting', 'intervalTimer']);

function Fader(container, images) {
    this.settings = new Settings();

    this.images = images;

    this.data = {
        initialized: false,
        nextImageIndex: -1,
        faded: false,
    }

    this.components = {
        container: container,
        intervalTimer: null,
        frontImage: null,
        backImage: null,
        nextImage: null,
        imageAnimation: null,
        containerAnimation: null
    }

    this.initialize();
}

Fader.prototype.initialize = function () {
    if (!this.data.initialized) {

        this.components.frontImage = document.createElement("img");
        $(this.components.frontImage).attr("src", this.getNextImagePath());

        this.components.backImage = document.createElement("img");
        $(this.components.backImage).attr("src", this.getNextImagePath());

        $(this.components.container).append(this.components.backImage);
        $(this.components.container).append(this.components.frontImage);

        $("#" + this.components.container.id + " img").css("position", "absolute");
        $("#" + this.components.container.id).css("overflow", "hidden");

        this.components.nextImage = this.components.frontImage;

        var self = this;
        this.components.frontImage.addEventListener("load", function handler() {
            $(self.components.container).css({
                height: $(self.components.frontImage).height(),
                width: $(self.components.frontImage).width()
            });

            self.components.frontImage.removeEventListener("load", handler, false);
        });

        this.data.initialized = true;

        return true;
    }

    return false;
}

Fader.prototype.start = function () {
    if (!this.intervalTimer) {
        var self = this;
        this.intervalTimer = new IntervalTimer(function() {
            self.fade();
        }, this.settings.displayTime);
        return this.intervalTimer.start();
    }

    if (this.intervalTimer.paused) {
        this.fade();
        return this.intervalTimer.start();
    }

    return false;
}

Fader.prototype.restart = function () {
    this.intervalTimer.destroy();
    this.components.imageAnimation.stop();
    this.components.containerAnimation.stop();
    this.start();
    return true;
}

Fader.prototype.stop = function () {
    if (!this.intervalTimer.paused) {
        this.components.imageAnimation.stop();
        this.components.containerAnimation.stop();
        return this.intervalTimer.stop();
    }

    return false;
}

Fader.prototype.fade = function () {
    if (this.data.initialized) {

        var opacity = this.data.faded ? 1 : 0;
        var self = this;

        this.components.imageAnimation = $(this.components.frontImage).stop().animate({
            "opacity": opacity,
        }, this.settings.fadeTime, function () {
            self.data.faded = !self.data.faded;
            self.components.nextImage = self.data.faded ? self.components.frontImage : self.components.backImage;

            if (self.settings.randomize) {
                $(self.components.nextImage).attr("src", self.getRandomImagePath());
            } else {
                $(self.components.nextImage).attr("src", self.getNextImagePath());
            }
        });

        // Getting the current nextImage here. This is not the same nextImage as the one above.
        // It's a bit confusing... I will refactor and document it soon.
        var nextImage = self.data.faded ? self.components.frontImage : self.components.backImage;
        this.components.containerAnimation = $(this.components.container).stop().animate({
            height: $(nextImage).height(),
            width: $(nextImage).width()
        }, this.settings.fadeTime);

        return true;
    }

    return false;
}

Fader.prototype.getNextImagePath = function () {
    this.data.nextImageIndex = (this.data.nextImageIndex + 1) < this.images.length ? this.data.nextImageIndex + 1 : 0;
    return this.images[this.data.nextImageIndex];
}

Fader.prototype.getRandomImagePath = function () {
    return this.images[Math.round(Math.random() * images.length)];
}

Fader.prototype.setDisplayTime = function (displayTime) {
    if (!displayTime) {
        this.settings.displayTime = displayTime;
        this.restart();
        return true;
    }
    return false;
}

Fader.prototype.setFadeTime = function (fadeTime) {
    if (!fadeTime) {
        this.settings.fadeTime = fadeTime;
        return true;
    }
    return false;
}

Fader.prototype.toggleRandomize = function () {
    this.settings.randomize = !this.settings.randomize;
    return true;
}
