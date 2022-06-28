"use strict";

const GAME_NAME = "CAR GAME";

let car;
let obstacles;
let gameSpeed = 1;
let gameState;

const Fonts = {};
const Buttons = {};

const ObstacleType = Object.freeze({
	CAR: 0,
	TREE: 1,
	TRAFFIC_CONE: 2
});

const GameState = Object.freeze({
	START_SCREEN: 0,
	PLAYING: 1,
	GAME_OVER: 2
});

function preload() {
	Fonts["Goldman"] = loadFont('./assets/fonts/Goldman.ttf');
	Fonts["PressStart"] = loadFont('./assets/fonts/PressStart.ttf');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(60);

	gameState = GameState.START_SCREEN;

	initButtons();
	
	obstacles = [];

	car = new Car(0, 0);
	car.pos((width / 2) - (car.width / 2), height - car.height - 20);
}

function draw() {
	background(220);

	fill(127, 127, 127);
	rect(0, 0, width / 4, height);
	rect(width - (width / 4), 0, width / 4, height);

	let buttons = Buttons[gameState] || [];
	for (let button of buttons) {
		button.draw();
	}

	switch (gameState) {
		case GameState.START_SCREEN: {
			fill(0, 0, 225);
			textFont(Fonts.PressStart);
			textSize(90);
			text(GAME_NAME, (width / 2) - (textWidth(GAME_NAME) / 2), 200);
			
			fill(0, 0, 0);
			textSize(25);
			let copyright = "© 2022 SL1907";
			text(copyright, (width / 2) - (textWidth(copyright) / 2), height - 45);

			break;
		}
		case GameState.PLAYING: {
			createObstacles();
			moveObstacles();
			car.draw();
			break;
		}
		case GameState.GAME_OVER: {
			fill(225, 0, 0);
			textFont(Fonts.PressStart);
			textSize(90);
			text("GAME OVER", (width / 2) - (textWidth("GAME OVER") / 2), 200);

			break;
		}
	}

	keyboardInput();	
}

function initButtons() {
	const messages = ["Play", "Leaderboards", "Options", "Play Again", "Back to Menu"];

	textFont(Fonts.PressStart);
	textSize(50);

	let startPlay = new Clickable();
	startPlay.onPress = function () {
		restartGame();
	}
	let startLeaderboard = new Clickable();
	let startOptions = new Clickable();

	Buttons[GameState.START_SCREEN] = [
		addButtonBehaviour(startPlay, messages[0], (width / 2) - textWidth(messages[0]) / 2, (height / 2) - 100),
		addButtonBehaviour(startLeaderboard, messages[1], (width / 2) - textWidth(messages[1]) / 2, (height / 2)),
		addButtonBehaviour(startOptions, messages[2], (width / 2) - textWidth(messages[2]) / 2, (height / 2) + 100)
	];

	let gameOverPlay = new Clickable();
	gameOverPlay.onPress = function () {
		restartGame();
	}

	let gameOverMenu = new Clickable();
	gameOverMenu.onPress = function () {
		gameState = GameState.START_SCREEN;
	}

	Buttons[GameState.GAME_OVER] = [
		addButtonBehaviour(gameOverPlay, messages[3], (width / 2) - textWidth(messages[3]) / 2, (height / 2) - 50),
		addButtonBehaviour(gameOverMenu, messages[4], (width / 2) - textWidth(messages[4]) / 2, (height / 2) + 75)
	];
}

function addButtonBehaviour(button, text, x, y) {
	button.locate(x, y);
	button.textFont = Fonts.PressStart;
	button.textColor = "#00e100";
	button.strokeWeight = 0;

	button.color = "#dcdcdc";
	button.textSize = 50;
	button.text = text;

	button.width = textWidth(text);
	button.height = 50;

	button.onOutside = function () {
		this.textColor = "#00e100";
	}
	button.onHover = function () {
		this.textColor = "#018a01";
	}

	return button;
}

function restartGame() {
	obstacles = [];
	gameState = GameState.PLAYING;
}

function moveObstacles() {
	for (let i = 0; i < obstacles.length; i++) {
		const obstacle = obstacles[i];
		obstacle.move(0, 3 * gameSpeed);
		obstacle.draw();
		if (collideRectRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height, car.x, car.y, car.width, car.height)) {
			gameState = GameState.GAME_OVER;
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

const keybinds = {
	"37": function () {
		car.move(-5);
	},
	"39": function() {
		car.move(5);
	}
}

function keyboardInput() {
	for (const [key, keyHandler] of Object.entries(keybinds)) {
		if (keyIsDown(Number(key))) {
			keyHandler();
		}
	}
}


class GameObject {

	constructor(x, y, width, height, assetFile) {
		this.assetFile = assetFile;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

}

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

	move(xOff = 0, yOff = 0) {
		this.x += (this.x + xOff > (windowWidth / 4) + xOff ? xOff : 0);
		this.y += yOff;
		if (this.y > height + this.height) {
			obstacles.splice(obstacles.indexOf(this), 1);
		}
	}
}