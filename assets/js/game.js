var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

window.alert("Welcome to Robot Gladiators!");
function fight(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // Ask player if they want to fight or skip this round
    var promptFight = window.prompt(
      "would you like to FIGHT or SKIP this battle?"
    );

    //   PLAYER CHOOSES SKIP
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm skip
      var confirmSkip = window.confirm(
        "Are you sure you'd like to skip this fight?"
      );

      if (confirmSkip) {
        window.alert(playerName + " has chosen to skip the fight!");
        playerMoney -= 2;
        console.log(playerMoney);
        break;
      }
    }

    // PLAYER CHOOSES FIGHT
    else if (promptFight === "fight" || promptFight === "FIGHT") {
      // Subtract the value of playerAttack from the value of enemyHealth, and use that result to update the value in the enemyHealth variable.
      enemyHealth -= playerAttack;

      // Log a resulting message to the console to confirm that it worked.
      console.log(
        playerName +
          " attacked for " +
          playerAttack +
          " points. " +
          enemyName +
          "'s health is now " +
          enemyHealth +
          "."
      );

      // Check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
        break;
      } else {
        window.alert(enemyName + " has " + enemyHealth + " health left.");
      }

      // Subtract the value of enemyAttack from the value of playerHealth, and use that result to update the value in the playerHealth variable.
      playerHealth -= enemyAttack;
      // Log a resulting message to the console to confirm that it worked.
      console.log(
        enemyName +
          " attacked for " +
          enemyAttack +
          " points. " +
          playerName +
          "'s health is now " +
          playerHealth +
          "."
      );
      // Check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
      } else {
        window.alert(playerName + " has " + playerHealth + " health left.");
      }
    }
    // PLAYER CHOOSES INVALID CHOICE
    else {
      window.alert("Invalid option. Choose FIGHT or SKIP.");
    }
  }
}

for (i = 0; i < enemyNames.length; i++) {
  var pickedEnemyName = enemyNames[i];
  enemyHealth = 50;
  fight(pickedEnemyName);
}
