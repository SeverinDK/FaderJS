require(['fader'], function () {

    var fader = new Fader(document.getElementById("image-container"), [
        "http://www.placehold.it/400x150/ffffff",
        "http://www.placehold.it/400x150/ffd800",
        "http://www.placehold.it/400x150/000000",
    ]);

    fader.start();

    /*setTimeout(function () {
        fader.setDisplayTime(2000);
        fader.setFadeTime(500);
        console.log("Changed timer.")
    }, 5000);*/

    $("#image-container").mouseenter(function () {
        fader.stop();
    });

    $("#image-container").mouseleave(function () {
        fader.start();
    });
});
