"use strict";

class GameMenu {
	constructor() {
		this.enter = function () {
			background(255);
			tint(255, 127);
			image(assets.getImage("background"), 40, 0, width, height);
			tint(255, 255);
		};

		this.draw = function () {
			fill(127, 127, 127);
			rect(0, 0, width / 4, height);
			rect(width - (width / 4), 0, width / 4, height);

			fill(255, 100, 0);
			textFont(assets.getFont("PressStart"));
			textSize(90);
			text(GAME_NAME, (width / 2) - (textWidth(GAME_NAME) / 2), 200);

			fill(0, 0, 0);
			textSize(25);
			let copyright = "© 2022 SL1907";
			text(copyright, (width / 2) - (textWidth(copyright) / 2), height - 45);

			let buttons = Buttons[GameState.GAME_MENU] || [];
			for (let button of buttons) {
				button.draw();
			}
		};
	}
}