require(['config'], function () {
    require(['jquery', 'fader'], function () {

        var fader = new Fader(document.getElementById("image-container"), [
            "http://www.placehold.it/400x150/000000",
            "http://www.placehold.it/400x150/ffffff",
        ]);

        fader.start();

        $("#image-container").mouseenter(function () {
            fader.stop();
            console.log("stopped.");
        });

        $("#image-container").mouseleave(function () {
            fader.start();
            console.log("resumed.");
        });
    });
});
