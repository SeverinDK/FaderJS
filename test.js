require(['fader'], function () {

    var fader = new Fader(document.getElementById("image-container"), [
        "http://www.placehold.it/100x100/1c54af",
        "http://www.placehold.it/200x200/2b3d59",
        "http://www.placehold.it/300x300/50ce08",
        "http://www.placehold.it/400x400/e2bb0b",
        "http://www.placehold.it/500x500/0bd4e2",
    ]);

    fader.settings.displayTime = 2000;
    fader.settings.fadeTime = 1000;
    fader.start();

    $("#image-container").mouseenter(function () {
        fader.stop();
    });

    $("#image-container").mouseleave(function () {
        fader.start();
    });
});
