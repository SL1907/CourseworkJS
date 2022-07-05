"use strict";

class MobileDevice {
	constructor() {
		this.draw = function () {
			fill(255, 0, 0);
			textSize(round(width * 0.04));
			let error = "This game is not supported by your device.";
			text(error, width / 2 - textWidth(error) / 2, height / 2);
		};
	}
}
