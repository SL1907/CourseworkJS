"use strict";

class Obstacle extends GameObject {

	color = [];

	constructor(x, y, width, height, type) {
		super(x, y, width, height, null); // Assets.obstacles[type]
		this.type = type;
		this.color[0] = random(255);
		this.color[1] = random(255);
		this.color[2] = random(255);
	}

	draw() {
		fill(this.color[0], this.color[1], this.color[2]);
		rect(this.x, this.y, this.width, this.height);
	}

	move(obstacles, xOff = 0, yOff = 0) {
		this.x += (this.x + xOff > (windowWidth / 4) + xOff ? xOff : 0);
		this.y += yOff;
		if (this.y > height + this.height) {
			obstacles.splice(obstacles.indexOf(this), 1);
		}
	}
}