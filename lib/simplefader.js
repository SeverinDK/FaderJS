function Fader(container, images) {
    console.warn("The Fader object will be deprecated in future releases. Please use SimpleFader instead.")
    return new SimpleFader(container, images)
}

function SimpleFader(container, images) {

    if(typeof container != "string" && typeof container != "object") {
        throw new Error("First argument must be of type string or object.");
    }

    if(!images || images.length < 1) {
        throw new Error("An array of images must be loaded into SimpleFader.");
    }

    if(typeof container === "string") {
        var containerId = container.replace("#", "");
        container = document.getElementById(containerId);
    }

    this.images = images;

    this.timer;

    this.settings = {
        displayTime: 5000,
        fadeTime: 1000,
        randomize: false,
    }

    this.elements = {
        container: container,
        frontImage: null,
        backImage: null,
        nextImage: null,
    }

    this.animations = {
        image: null,
        container: null,
    }

    this.data = {
        initialized: false,
        nextImageIndex: -1,
        faded: false,
        fadeStartedTick: null,
        remainingFadeTime: null,
    }

    this.initialize();
}

SimpleFader.prototype.initialize = function () {
    if (!this.data.initialized) {

        this.elements.frontImage = document.createElement("img");
        $(this.elements.frontImage).attr("src", this.getNextImagePath());

        this.elements.backImage = document.createElement("img");
        $(this.elements.backImage).attr("src", this.getNextImagePath());

        $(this.elements.container).append(this.elements.backImage);
        $(this.elements.container).append(this.elements.frontImage);

        $("#" + this.elements.container.id + " img").css("position", "absolute");
        $(this.elements.container).css("overflow", "hidden");

        this.elements.nextImage = this.elements.frontImage;

        var self = this;
        this.elements.frontImage.addEventListener("load", function handler() {
            $(self.elements.container).css({
                height: $(self.elements.frontImage).height(),
                width: $(self.elements.frontImage).width()
            });

            self.elements.frontImage.removeEventListener("load", handler, false);
        });

        this.data.initialized = true;

        return true;
    }

    return false;
}

SimpleFader.prototype.start = function () {
    if (!this.timer) {
        var self = this;
        this.timer = new moment.duration(this.settings.displayTime).timer({
            loop: true
        }, function() {
            return self.fade();
        });
        return true;
    }

    if (this.timer.isStopped()) {
        this.fade(this.remainingFadeTime);
        return this.timer.start();
    }

    return false;
}

SimpleFader.prototype.stop = function () {
    if (!this.timer.isStopped()) {
        $(this.animations.image).stop();
        $(this.animations.container).stop();
        this.remainingFadeTime = this.settings.fadeTime - (Date.now() - this.fadeStartedTick);
        return this.timer.stop();
    }

    return false;
}

SimpleFader.prototype.fade = function (remainingFadeTime) {
    if (this.data.initialized) {

        var opacity = this.data.faded ? 1 : 0;
        var self = this;

        var fadeTime = remainingFadeTime ? remainingFadeTime : this.settings.fadeTime;

        this.animations.image = $(this.elements.frontImage).stop().animate({
            "opacity": opacity,
        }, fadeTime, function () {
            self.data.faded = !self.data.faded;
            var nextImage = self.data.faded ? self.elements.frontImage : self.elements.backImage;
            self.elements.nextImage = nextImage;

            if (self.settings.randomize) {
                $(nextImage).attr("src", self.getRandomImagePath());
            } else {
                $(nextImage).attr("src", self.getNextImagePath());
            }
        });

        var nextImage = self.data.faded ? self.elements.frontImage : self.elements.backImage;
        self.elements.nextImage = nextImage;

        this.animations.container = $(this.elements.container).stop().animate({
            height: $(nextImage).height(),
            width: $(nextImage).width()
        }, fadeTime);

        this.fadeStartedTick = Date.now();

        return true;
    }

    return false;
}

SimpleFader.prototype.getNextImagePath = function () {
    this.data.nextImageIndex = (this.data.nextImageIndex + 1) < this.images.length ? this.data.nextImageIndex + 1 : 0;
    return this.images[this.data.nextImageIndex];
}

SimpleFader.prototype.getRandomImagePath = function () {
    var randomImageIndex = Math.round(Math.random() * (this.images.length - 1));
    while(randomImageIndex === this.data.nextImageIndex) {
        randomImageIndex = Math.round(Math.random() * (this.images.length - 1));
    }

    this.data.nextImageIndex = randomImageIndex;

    return this.images[randomImageIndex];
}

SimpleFader.prototype.toggleRandomize = function () {
    this.settings.randomize = !this.settings.randomize;
    return true;
}

SimpleFader.prototype.getRandomize = function() {
    return this.settings.randomize;
}

SimpleFader.prototype.setRandomize = function(randomize) {
    this.settings.randomize = randomize;
    return true;
}

SimpleFader.prototype.getDisplayTime = function () {
    return this.settings.displayTime;
}

SimpleFader.prototype.setDisplayTime = function (displayTime) {
    this.settings.displayTime = displayTime;
    return true;
}

SimpleFader.prototype.getFadeTime = function () {
    return this.settings.fadeTime;
}

SimpleFader.prototype.setFadeTime = function (fadeTime) {
    this.settings.fadeTime = fadeTime;
    return true;
}

SimpleFader.prototype.isStopped = function () {
    return this.timer.isStopped();
}