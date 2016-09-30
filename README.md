# ImageFader

Small script that makes it possible to fade between any amount of images. The benefit of this fader is that it will only create two image tags in the markup, no matter how many images are loaded into the array.

The way it works, is that one image will always be hidden from view, either because it's opacity is 0 or because it's being blocked by the overlaying image. When the a image is loaded and faded in, meaning one of the images is hidden, the hidden image will receieve the path of the next image to be shown. This goes on forever and will make sure to start from the beginning of the array once the end has been reached.

It is also possible to set it to randomize. More documentation coming soon.
