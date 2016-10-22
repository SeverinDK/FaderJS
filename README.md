#simplefader.js

###Synopsis

An image fader that makes it possible to fade between any amount of images. The cool part about this fader, is that it only creates two image tags in the markup, no matter how many images are loaded into the array.

The way it works, is that one image will always be hidden from view, either because it's opacity is 0 or because it's being blocked by the overlaying image. When the a image is loaded and faded in, meaning one of the images is hidden, the hidden image will receieve the path of the next image to be shown. This goes on forever and will make sure to start from the beginning of the array once the end has been reached.

It is also possible to set it to randomize. More documentation coming soon.

<hr>

###Live Demo
CodePen Demo: http://codepen.io/SeverinDK/pen/BLdrLN

The demo shows how to use the fader to fade between different background images. The same demo is included in the example folder.
I added a timeout to stop the fader around 6 seconds after it starts.
Stopping the fader will pause the animation and starting it again will cause it to pick up where if left off.

<hr>
###Installation

#### Npm
```
npm install simplefader
```

#### Bower
```
bower install simplefader
```

#### Browser
```
<script src="path/to/simplefader.js"></script>
```
When using this plugin in the browser, be sure to include moment.js, moment-timer.js and jQuery on your page first.



###Usage

#####HTML:
```html
<div id="image-container"></div>
```

#####JavaScript:
The first argument of SimpleFader is the container you wish to display the images in. This accepts either an object like shown below or simply the id of the container you wish to use: new SimpleFader("#image-container") or even: new SimpleFader("image-container")
```javascript
var simpleFader = new SimpleFader(document.getElementById("image-container"), [
    "http://placehold.it/100x100/4286f4",
    "http://placehold.it/200x200/e8f442",
    "http://placehold.it/300x300/f49542",
    "http://placehold.it/400x400/426bf4",
    "http://placehold.it/500x500/f44242",
]);

simpleFader.setDisplayTime(10000);
simpleFader.setFadeTime(1000);
simpleFader.start();

// Possible to randomize the fader using:
simpleFader.toggleRandomize();
```

#####Generated Markup:
```html
<div id="image-container">
    <img src="http://www.placehold.it/100x100/4286f4" style="position: absolute;">
    <img src="http://www.placehold.it/200x200/e8f442" style="position: absolute; opacity: 1;">
</div>
```

<hr>

###Motivation
I wrote the first version of this script shortly after I started writing JavaScript back in 2013. Since then I have used it a few times whenever I needed an image fader for a project, but I was always annoyed about the way it worked. It had a very limited usage and would fail from time to time. After the 2016 rewrite, it has become a lot better and easier to work with. Will continue to update on this from time to time.

<hr>

###License
MIT - Go ahead and do whatever you want! I doooon't caaare! ;-)

<hr>
