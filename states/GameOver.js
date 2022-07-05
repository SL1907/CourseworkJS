"use strict";

class GameOver {
	constructor() {
		this.draw = function () {
			background(220);
			fill(127, 127, 127);
			rect(0, 0, width / 4, height);
			rect(width - (width / 4), 0, width / 4, height);

			fill(225, 0, 0);
			textFont(Fonts.PressStart);
			textSize(90);
			text("GAME OVER", (width / 2) - (textWidth("GAME OVER") / 2), 200);

			let buttons = Buttons[GameState.GAME_OVER] || [];
			for (let button of buttons) {
				button.draw();
			}
		};
	}
}
