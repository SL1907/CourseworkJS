"use strict";

class Assets {

    constructor () {
        
    }

    Fonts = {};
    Images = {};

    getImage(name) {
        return this.Images[name];
    }

    registerImage(name, image) {
        this.Images[name] = image;
    }

    getFont(name) {
        return this.Fonts[name];
    }

    registerFont(name, font) {
        this.Fonts[name] = font;
    }

}