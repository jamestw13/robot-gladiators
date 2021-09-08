var playerName;
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

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

var fight = function (enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
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
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = enemyHealth - playerAttack;
    console.log(
      playerName +
        " attacked " +
        enemyName +
        ". " +
        enemyName +
        " now has " +
        enemyHealth +
        " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + " has died!");

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + " still has " + enemyHealth + " health left.");
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
      enemyName +
        " attacked " +
        playerName +
        ". " +
        playerName +
        " now has " +
        playerHealth +
        " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }
};

var startGame = function () {
  // Reset player stats
  playerName = window.prompt("What is your robot's name?");
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  for (i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      // Announce the game and round
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // assign enemy for the round
      var pickedEnemyName = enemyNames[i];

      //reset enemy health
      enemyHealth = 20;

      // debugger option
      // debugger;

      // begin the round
      fight(pickedEnemyName);
    } else {
      window.alert("Your robot died in battle! Game Over!");
      break;
    }
  }
  endGame();
};

var endGame = function () {
  // Player robot is still alive
  if (playerHealth > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        playerMoney +
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

// Start the game
startGame();
