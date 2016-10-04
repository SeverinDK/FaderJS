function Fader(container, images) {
    this.settings = new Settings();

    this.images = images;

    this.data = {
        initialized: false,
        nextImageIndex: -1,
        faded: false,
        fadeStartedTick: null,
        remainingFadeTime: null,
    }

    this.components = {
        container: container,
        timer: null,
        frontImage: null,
        backImage: null,
        nextImage: null,
        imageAnimation: null,
        containerAnimation: null,
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
    if (!this.components.timer) {
        var self = this;
        this.components.timer = new moment.duration(this.settings.displayTime).timer({loop: true}, function() {
            self.fade();
        });
        return this.components.timer.start();
    }

    if (this.components.timer.paused) {
        this.fade(this.remainingFadeTime);
        return this.components.timer.start();
    }

    return false;
}

Fader.prototype.stop = function () {
    if (!this.components.timer.paused) {
        $(this.components.imageAnimation).stop();
        $(this.components.containerAnimation).stop();
        this.remainingFadeTime = this.settings.fadeTime - (Date.now() - this.fadeStartedTick);
        return this.components.timer.stop();
    }

    return false;
}

Fader.prototype.fade = function (remainingFadeTime) {
    if (this.data.initialized) {

        var opacity = this.data.faded ? 1 : 0;
        var self = this;

        var fadeTime = remainingFadeTime ? remainingFadeTime : this.settings.fadeTime;


        this.components.imageAnimation = $(this.components.frontImage).stop().animate({
            "opacity": opacity,
        }, fadeTime, function () {
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
        }, fadeTime);

        this.fadeStartedTick = Date.now();

        return true;
    }

    return false;
}

Fader.prototype.getNextImagePath = function () {
    this.data.nextImageIndex = (this.data.nextImageIndex + 1) < this.images.length ? this.data.nextImageIndex + 1 : 0;
    return this.images[this.data.nextImageIndex];
}

Fader.prototype.getRandomImagePath = function () {
    return this.images[Math.round(Math.random() * this.images.length)];
}

Fader.prototype.toggleRandomize = function () {
    this.settings.randomize = !this.settings.randomize;
    return true;
}

Fader.prototype.setDisplayTime = function (displayTime) {
    this.settings.displayTime = displayTime;
    return true;
}

Fader.prototype.setFadeTime = function (fadeTime) {
    this.settings.fadeTime = fadeTime;
    return true;
}

function Settings() {
    this.displayTime = 5000;
    this.fadeTime = 1000;
    this.randomize = false;
}