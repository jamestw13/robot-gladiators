var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;

console.log(playerName, playerAttack, playerHealth);

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function () {
  // Alert players that they're starting the round (this is already done).
  window.alert("Welcome to Robot Gladiators!");

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
};

fight();
