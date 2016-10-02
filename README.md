#FaderJS

###Synopsis

An image fader that makes it possible to fade between any amount of images. The cool part about this fader, is that it only creates two image tags in the markup, no matter how many images are loaded into the array.

The way it works, is that one image will always be hidden from view, either because it's opacity is 0 or because it's being blocked by the overlaying image. When the a image is loaded and faded in, meaning one of the images is hidden, the hidden image will receieve the path of the next image to be shown. This goes on forever and will make sure to start from the beginning of the array once the end has been reached.

It is also possible to set it to randomize. More documentation coming soon.

###Live Demo
CodePen Demo: http://codepen.io/SeverinDK/pen/BLdrLN

Test code for the demo is shown below. I added mouse events to show start/stop.
Stopping the fader will pause the animation and starting it again will cause it to pick up where if left off.
There is also a restart function that will reset everything back to the initial state and start again.

###Code Example

#####HTML:
```html
<div id="image-container"></div>
```

#####JavaScript:
```javascript
require(['fader'], function () {

    var fader = new Fader(document.getElementById("image-container"), [
        "http://www.placehold.it/400x150/000000",
        "http://www.placehold.it/400x150/ffffff",
        "http://www.placehold.it/400x150/ffd800",
    ]);

    fader.start();

    $("#image-container").mouseenter(function () {
        fader.stop();
    });

    $("#image-container").mouseleave(function () {
        fader.start();
    });
});
```

#####Generated Markup:
```html
<div id="image-container" style="position:relative;">
    <img src="http://www.placehold.it/400x150/000000" style="position: absolute;">
    <img src="http://www.placehold.it/400x150/ffd800" style="position: absolute; opacity: 1;">
</div>
```

###Motivation
I wrote the first version of this script shortly after I started writing JavaScript back in 2013. Since then I have used it a few times whenever I needed an image fader for a project, but I was always annoyed about the way it worked. It had a very limited usage and would fail from time to time. After the 2016 rewrite, it has become a lot better and easier to work with. Will continue to update on this from time to time.

###License
MIT - Go ahead and do whatever you want! I doooon't caaare! ;-)
