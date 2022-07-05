"use strict";

class Car extends GameObject {

	width = 40;
	height = 60;
	angle = 0;
	color = [];

	constructor(x, y) {
		super(x, y, width, height, null);
		this.color[0] = random(255);
		this.color[1] = random(255);
		this.color[2] = random(255);
	}

	draw() {
		fill(this.color[0], this.color[1], this.color[2]);
		rect(this.x, this.y, this.width, this.height);
		while (this.angle !== 0) {
			this.angle += this.angle > 0 ? -1 : 1;
		}
		rotate(this.angle);
	}

	pos(x, y) {
		this.x = Math.max((windowWidth / 4), x - this.width);
		this.y = y;
	}

	move(xOff = 0, yOff = 0) {
		// if ()
		this.x += (this.x + xOff >= (windowWidth / 4) + xOff ? xOff : 0);
		this.angle = xOff < 0 ? -30 : 30;
		this.y += (this.y + yOff > windowHeight ? yOff : 0);
	}
}