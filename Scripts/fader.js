define(['setting', 'intervalTimer']);

function Fader(container, images) {
    this.settings = new Settings();

    this.images = images;

    this.data = {
        initialized: false,
        activeImageIndex: -1,
        faded: false,
    }

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
    this.start();
    return true;
}

Fader.prototype.stop = function () {
    if (!this.intervalTimer.paused) {
        return this.intervalTimer.stop();
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
            self.components.activeImage = self.data.faded ? self.components.frontImage : self.components.backImage;

            if (self.settings.randomize) {
                $(self.components.activeImage).attr("src", self.getRandomImage());
            } else {
                $(self.components.activeImage).attr("src", self.getNextImage());
            }
        });

        return true;
    }

    return false;
}

Fader.prototype.getNextImage = function () {
    this.data.activeImageIndex = (this.data.activeImageIndex + 1) < this.images.length ? this.data.activeImageIndex + 1 : 0;
    return this.images[this.data.activeImageIndex];
}

Fader.prototype.getRandomImage = function () {
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