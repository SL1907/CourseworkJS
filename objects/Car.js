"use strict";

class Car extends GameObject {

	width = 40;
	height = 60;
	color = [];

	constructor(x, y) {
		super(x, y, width, height, null);
		// this.angle = 0.01;
		// this.angleIncrement = 1;
		this.color[0] = random(255);
		this.color[1] = random(255);
		this.color[2] = random(255);
		// setInterval(() => {
		// 	if (this.angle !== 0) {
		// 		let increment = 0.5 * this.angleIncrement;
		// 		if (!this.angle <= 30 || this.angle >= -30) {
		// 			this.angle += this.angle > 0 ? -increment : increment;
		// 		}
		// 	}
		// }, 50);
	}

	draw() {
		fill(this.color[0], this.color[1], this.color[2]);
		// angleMode(DEGREES);

		// translate(this.x + (this.width / 2), this.y);
		// rotate(this.angle);
		// translate(-this.x, -this.y);

		rect(this.x, this.y, this.width, this.height);
		fill(0);
		text(this.angle, this.x, this.y);
	}

	pos(x, y) {
		this.x = Math.max((windowWidth / 4), x - this.width);
		this.y = y;
	}

	move(xOff = 0, yOff = 0) {
		if ((this.x + xOff >= width / 4) && (this.x + xOff <= width - width / 4)) {
			if (this.x + xOff < width / 4) {
				this.x = width / 4;
			} else if (this.x + xOff > width - width / 4 - this.width) {
				this.x = width - width / 4 - this.width; 
			} else {
				this.x += xOff;
			}
		}
		// this.angleIncrement = xOff < 0 ? -5 : 5;
		// console.log(this.angle);
		this.y += (this.y + yOff > windowHeight ? yOff : 0);
	}
}