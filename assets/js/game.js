// Number Randomizer
var randomNumber = function (min, max) {
	var value = Math.floor(Math.random() * (60 - 40 + 1)) + min;

	return value;
};

// check if player wants to fight or skip
var fightOrSkip = function () {
	// ask player if they'd like to fight or run
	var promptFight = window.prompt(
		'Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.'
	);

	// validate prompt answer
	if (promptFight === "" || promptFight === null) {
		window.alert("You need to provide a valid answer! Please try again.");
		// use return to call it again and stop the rest of this function from running
		return fightOrSkip();
	}

	// convert promptFight to all lowercase so we can check with less options
	promptFight = promptFight.toLowerCase();

	if (promptFight === "skip") {
		// confirm player wants to skip
		var confirmSkip = window.confirm("Are you sure you'd like to quit?");

		// if yes (true), leave fight
		if (confirmSkip) {
			window.alert(
				playerInfo.name + " has decided to skip this fight. Goodbye!"
			);
			// subtract money from playerMoney for skipping, but don't let them go into the negative
			playerInfo.money = Math.max(0, playerInfo.money - 10);
			// stop while() loop using break; and enter next fight

			// return true if player wants to leave
			return true;
		}
	}
	return false;
};

// the fight loop
var fight = function (enemy) {
	// player initiative randomizer
	var isPlayerTurn = true;
	if (Math.random() > 0.5) {
		isPlayerTurn = false;
	}

	while (playerInfo.health > 0 && enemy.health > 0) {
		if (isPlayerTurn) {
			// ask player if they want to fight or skip
			if (fightOrSkip()) {
				break;
			}

			// remove enemy's health by subtracting the amount set in the playerInfo.attack variable
			var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
			enemy.health = Math.max(0, enemy.health - damage);

			console.log(
				playerInfo.name +
					" attacked " +
					enemy.name +
					". " +
					enemy.name +
					" now has " +
					enemy.health +
					" health remaining."
			);

			// check enemy's health
			if (enemy.health <= 0) {
				window.alert(enemy.name + " has died!");

				// award player money for winning
				playerInfo.money = playerInfo.money + 20;

				// leave while() loop since enemy is dead
				break;
			} else {
				window.alert(
					enemy.name + " still has " + enemy.health + " health left."
				);
			}
			// player gets attacked first
		} else {
			// remove players's health by subtracting the amount set in the enemyAttack variable
			var damage = randomNumber(enemy.attack - 3, enemy.attack);
			playerInfo.health = Math.max(0, playerInfo.health - damage);
			console.log(
				enemy.name +
					" attacked " +
					playerInfo.name +
					". " +
					playerInfo.name +
					" now has " +
					playerInfo.health +
					" health remaining."
			);

			// check player's health
			if (playerInfo.health <= 0) {
				window.alert(playerInfo.name + " has died!");
				// leave while() loop if player is dead
				break;
			} else {
				window.alert(
					playerInfo.name + " still has " + playerInfo.health + " health left."
				);
			}
		}
		isPlayerTurn = !isPlayerTurn;
	}
};

// START GAME FUNCTION
var startGame = function () {
	window.alert("Welcome to Robot Gladiators!");

	// debugger option
	//   debugger;

	// Set player stats
	playerInfo.reset();

	for (var i = 0; i < enemyInfo.length; i++) {
		if (playerInfo.health > 0) {
			// Announce the game and round
			window.alert("Round " + (i + 1));

			// assign enemy for the round
			var pickedEnemyObj = enemyInfo[i];

			// reset enemy health
			pickedEnemyObj.health = randomNumber(40, 60);

			// begin fight
			fight(pickedEnemyObj);

			// Option to shop
			if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
				var storeConfirm = window.confirm("Would you like to visit the shop?");
				if (storeConfirm) {
					shop();
				}
			}
		} else {
			window.alert("Your robot died in battle! Game Over!");
			break;
		}
	}
	endGame();
};

// ENDGAME FUNCTION
var endGame = function () {
	// Player robot is still alive
	if (playerInfo.health > 0) {
		window.alert(
			"Congrats on your robot surviving in the pit! You now have a score of " +
				playerInfo.money +
				"."
		);
		// Retrieve current high score from local storage
		var highscore = localStorage.getItem("highscore");
		var championBot = localStorage.getItem("champion");
		// Compare the current player score with high score

		// if the player score is higher
		if (!highscore || highscore < playerInfo.money) {
			// set new high score in localStorage
			localStorage.setItem("highscore", playerInfo.money);
			// set current robot name object into localstorage
			localStorage.setItem("champion", playerInfo.name);
			// send player message that they got the new high score
			window.alert("Congrats on winning the new high score!");
		}
		// if high score is higher send a message that they did not get the high score
		else {
			window.alert(
				"Too bad you did not beat the reigning champion, " +
					championBot +
					" who got " +
					highscore +
					" points."
			);
		}
	}
	// Player robot died
	else {
		window.alert("Your robot perished in battle.");
	}

	var playAgainConfirm = window.confirm(
		"Would you like to enter a new robot into the pit?"
	);

	// restart the game
	if (playAgainConfirm) {
		startGame();
	}
	// end the game session
	else {
		window.alert(
			"Thanks for playing Robot Gladiators. The gladitorial pit awaits your return."
		);
	}
};

// SHOP FUNCTION
var shop = function () {
	var shopOptionPrompt = window.prompt(
		"Would you like to:\n1) Refill your health\n2) Upgrade your attack\n3) leave the store?"
	);

	shopOptionPrompt = parseInt(shopOptionPrompt);

	switch (shopOptionPrompt) {
		case 1:
			playerInfo.refillHealth();
			break;

		case 2:
			playerInfo.upgradeAttack();
			break;

		case 3:
			window.alert("Leaving the store");
			break;

		default:
			window.alert("Please pick a valid option.");
			shop();
			break;
	}
};

// SET PLAYER NAME FUNCTION
var getPlayerName = function () {
	var name = "";

	while (name === "" || name === null) {
		name = window.prompt("Enter your robot's name!");
	}

	console.log("Your robot's name is " + name);
	return name;
};

/* GAME STATES */

var playerInfo = {
	name: "",
	health: 100,
	attack: 10,
	money: 10,
	reset: function () {
		this.name = getPlayerName();
		this.health = 100;
		this.attack = 10;
		this.money = 10;
	},
	refillHealth: function () {
		if (playerInfo.money >= 7) {
			window.alert("Refilling " + playerInfo.name + "'s health by 20 for $7");
			playerInfo.health += 20;
			playerInfo.money -= 7;
		} else {
			window.alert("You do not have enough money!");
		}
	},
	upgradeAttack: function () {
		if (playerInfo.money >= 7) {
			window.alert("Upgrading " + playerInfo.name + "'s attack by 6 for $7");
			playerInfo.attack += 6;
			playerInfo.money -= 7;
		} else {
			window.alert("You do not have enough money!");
		}
	},
};

var enemyInfo = [
	{ name: "Roborto", attack: randomNumber(10, 14) },
	{ name: "Amy Android", attack: randomNumber(10, 14) },
	{ name: "Robo Trumble", attack: randomNumber(10, 14) },
];
