// When the player is defeated or there are no more enemies, call an endGame() function that:
// * Alerts the player's total stats
// * Asks the player if they want to play again
// * If yes, call startGame() to restart the game
// After the player skips or defeats an enemy (and there are still more robots to fight):
// *Ask the player if they want to "shop"
// *If no, continue as normal
// *If yes, call the shop() function
// *In the shop() function, ask player if they want to "refill" health, "upgrade" attack, or "leave" the shop
// *If refill, subtract money points from player and increase health
// *If upgrade, subtract money points from player and increase attack power
// *If leave, alert goodbye and exit the function
// *If any other invalid option, call shop() again

var fight = function (enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.confirm(
      "Press OK to fight this round and Cancel to skip this round."
    );

    // if player picks "skip" confirm and then stop the loop
    if (!promptFight) {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to skip?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(
          playerInfo.name + " has decided to skip this fight. Goodbye!"
        );
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
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
      window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }

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
};

var startGame = function () {
  // Set player stats
  playerInfo.reset();

  for (i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      // Announce the game and round
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // assign enemy for the round
      var pickedEnemyObj = enemyInfo[i];

      //reset enemy health
      pickedEnemyObj.health = randomNumber(40, 60);

      // debugger option
      // debugger;

      // Option to shop
      if (playerInfo.health > 0 && i < enemyNames.length - 1) {
        var storeConfirm = window.confirm("Would you like to visit the shop?");
        if (storeConfirm) {
          shop();
        }
      }
      // begin the round
      fight(pickedEnemyObj);
    } else {
      window.alert("Your robot died in battle! Game Over!");
      break;
    }
  }
  endGame();
};

var endGame = function () {
  // Player robot is still alive
  if (playerInfo.health > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        playerInfo.money +
        "."
    );
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
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store?"
  );

  switch (shopOptionPrompt) {
    case "REFILL":
    case "refill":
      playerInfo.refillHealth();
      break;

    case "UPGRADE":
    case "upgrade":
      playerInfo.upgradeAttack();
      break;

    case "LEAVE":
    case "leave":
      window.alert("Leaving the store");
      break;

    default:
      window.alert("Please pick a valid option.");
      shop();
      break;
  }
};

// Number Randomizer
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (60 - 40 + 1)) + min;

  return value;
};

var playerInfo = {
  name: "",
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.name = window.prompt("What is your robot's name?");
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
// Start the game
// startGame();
