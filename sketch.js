"use strict";

const GAME_NAME = "CAR GAME";
const assets = new Assets();

let sceneManager;
let gameSpeed = 1;
let gameState;
let isMobile;

const Buttons = {};

const ObstacleType = Object.freeze({
	CAR: 0,
	TREE: 1,
	TRAFFIC_CONE: 2
});

const GameState = Object.freeze({
	GAME_MENU: 0,
	PLAYING: 1,
	GAME_OVER: 2
});

function preload() {
	assets.registerFont("Goldman", loadFont("./assets/fonts/Goldman.ttf"));
	assets.registerFont("PressStart", loadFont("./assets/fonts/PressStart.ttf"));

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "/assets/images");
	xhr.responseType = 'document';
	xhr.onload = () => {
		if (xhr.status === 200) {
			var elements = xhr.response.getElementsByTagName("a");
			for (let x of elements) {
				if (x.href.match(/\.(jpe?g|png|gif)$/)) {
					assets.registerImage(x.title.replace(".png", ""), loadImage(x.href));
				}
			};
		} else {
			console.log('Request failed. Returned status of ' + xhr.status);
		}
	}
	xhr.send();
	
	console.log(assets.Images);
	
	assets.registerImage("bg", loadImage("./assets/images/background.png"));

	isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	sceneManager = new SceneManager();

	sceneManager.addScene(GameMenu);
	sceneManager.addScene(Playing);
	sceneManager.addScene(GameOver);
	sceneManager.addScene(MobileDevice);

	sceneManager.showNextScene();

	if (isMobile) {
		sceneManager.showScene(MobileDevice);
		return;
	}

	frameRate(60);
	initButtons();
}

function draw() {
	sceneManager.draw();
}

function initButtons() {
	const messages = ["Play", "Leaderboards", "Options", "Play Again", "Back to Menu"];

	textFont(assets.getFont("PressStart"));
	textSize(50);

	let startPlay = new Clickable();
	startPlay.onPress = function () {
		sceneManager.showScene(Playing);
	}
	let startLeaderboard = new Clickable();
	let startOptions = new Clickable();

	Buttons[GameState.GAME_MENU] = [
		defaultBehaviour(startPlay, messages[0], (width / 2) - textWidth(messages[0]) / 2, (height / 2) - 100),
		defaultBehaviour(startLeaderboard, messages[1], (width / 2) - textWidth(messages[1]) / 2, (height / 2)),
		defaultBehaviour(startOptions, messages[2], (width / 2) - textWidth(messages[2]) / 2, (height / 2) + 100)
	];

	let gameOverPlay = new Clickable();
	gameOverPlay.onPress = function () {
		sceneManager.showScene(Playing);
	}

	let gameOverMenu = new Clickable();
	gameOverMenu.onPress = function () {
		sceneManager.showScene(GameMenu);
	}

	Buttons[GameState.GAME_OVER] = [
		defaultBehaviour(gameOverPlay, messages[3], (width / 2) - textWidth(messages[3]) / 2, (height / 2) - 50),
		defaultBehaviour(gameOverMenu, messages[4], (width / 2) - textWidth(messages[4]) / 2, (height / 2) + 75)
	];
}

function defaultBehaviour(button, text, x, y) {
	button.locate(x, y);
	button.textFont = assets.getFont("PressStart");
	button.textColor = "#FFFF00";
	button.strokeWeight = 0;

	button.textSize = 50;
	button.text = text;

	button.width = textWidth(text);
	button.height = 50;

	button.onOutside = function () {
		this.textColor = "#FFFF00";
	}
	button.onHover = function () {
		this.textColor = "#BFBF40";
	}

	return button;
}

function keyboardInput(keybinds) {
	for (const [key, keyHandler] of Object.entries(keybinds)) {
		if (keyIsDown(Number(key))) {
			keyHandler();
		}
	}
}