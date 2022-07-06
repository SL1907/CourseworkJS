"use strict";

class Obstacle extends GameObject {

	color = [];

	constructor(x, y, width, height, type, assetFile) {
		super(x, y, width, height, assetFile); // Assets.obstacles[type]
		this.type = type;
		this.assetFile = assetFile;
		this.color[0] = random(255);
		this.color[1] = random(255);
		this.color[2] = random(255);
	}

	draw() {
		if (this.image !== null) {
			image(this.assetFile, this.x, this.y, this.width, this.height);
			return;
		}
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