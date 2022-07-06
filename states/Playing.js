"use strict";

class Playing {
	constructor() {
		const keybinds = {
			"37": function () {
				if ((car.x - 5 >= width / 4 + car.width) && (car.x - 5 <= width - width / 4 - car.width)) {
					if (car.x - 5 < width / 4) {
						car.x = width / 4;
					} else if (car.x - 5 > width - width / 4 - car.width) {
						car.x = width - width / 4 - this.width; 
					} else {
						car.x -= 5;
					}
				}
			},
			"39": function () {
				if ((car.x + 5 >= width / 4) && (car.x + 5 <= width - width / 4)) {
					if (car.x + 5 < width / 4) {
						car.x = width / 4;
					} else if (car.x + 5 > width - width / 4 - car.width) {
						car.x = width - width / 4 - car.width; 
					} else {
						car.x += 5;
					}
				}
			}
		};

		let obstacles;
		let car;
		let carColors = ["blue", "green", "light_blue", "orange", "pink", "red"];

		this.enter = function () {
			obstacles = [];
			car = createSprite((width / 2), height - 80, 40, 60);
			car.rotateToDirection = true;
			car.addCollider(0, 0, car.width, car.height);
			car.addImage(assets.getImage("player_car"));
			car.immovable = true;
		};

		this.draw = function () {
			background(220);
			fill(127, 127, 127);
			rect(0, 0, width / 4, height);
			rect(width - (width / 4), 0, width / 4, height);

			createObstacles();
			checkCollisions();
			// car.draw();
			drawSprites();

			keyboardInput(keybinds);
		};

		function checkCollisions() {
			for (let i = 0; i < obstacles.length; i++) {
				const obstacle = obstacles[i];
				car.collide(obstacle, () => {
					sceneManager.showScene(GameOver);
					obstacle.remove();
				});

				if (obstacle.y > height + obstacle.height) {
					obstacle.remove();
					obstacles.splice(obstacles.indexOf(obstacle), 1);
				}
			}
		}

		function createObstacles() {
			if (frameCount % 30 === 0 && obstacles.length < (20 * (1 + gameSpeed * 0.5))) {
				if (random(0, 1) < 0.2) {
					let sprite = createSprite(random(width / 4, width - (width / 4) - 20), -20, 30, 50);
					sprite.velocity.y = 2;
					// sprite.immovable = true;
					let randomColor = "car_" + carColors[Math.floor(Math.random() * carColors.length)];
					sprite.addImage(assets.getImage(randomColor));
					obstacles.push(sprite);
				}
			}
		}
	}
}
