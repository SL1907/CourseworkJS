"use strict";

class Playing {
	constructor() {
		const keybinds = {
			"37": function () {
				car.move(-5);
			},
			"39": function () {
				car.move(5);
			}
		};

		let obstacles;
		let car;

		this.enter = function () {
			obstacles = [];

			car.pos((width / 2), height - car.height - 20);
		};

		this.setup = function () {
			car = new Car(0, 0);
		};

		this.draw = function () {
			background(220);
			fill(127, 127, 127);
			rect(0, 0, width / 4, height);
			rect(width - (width / 4), 0, width / 4, height);

			createObstacles();
			moveObstacles();
			car.draw();

			keyboardInput(keybinds);
		};

		function moveObstacles() {
			for (let i = 0; i < obstacles.length; i++) {
				const obstacle = obstacles[i];
				obstacle.move(obstacles, 0, 3 * gameSpeed);
				obstacle.draw();
				if (collideRectRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, car.x, car.y, car.width, car.height)) {
					sceneManager.showScene(GameOver);
				}
			}
		}

		function createObstacles() {
			if (frameCount % 30 === 0 && obstacles.length < (20 * (1 + gameSpeed * 0.5))) {
				if (random(0, 1) < 0.2) {
					let newObstacle = new Obstacle(random(width / 4, width - (width / 4) - 20), -20, 20, 30, ObstacleType.CAR);
					obstacles.push(newObstacle);
				}
			}
		}
	}
}
