const inquirer = require("inquirer");
const Enemy = require("./Enemy");
const Player = require("./Player");

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function () {
  this.enemies.push(new Enemy("Storm Trooper", "T-17 Blaster"));
  this.enemies.push(new Enemy("Darth Vader", "red light saber"));
  this.enemies.push(new Enemy("Emporer Palpatine", "Force Lightning"));

  this.currentEnemy = this.enemies[0];

  inquirer
    .prompt({
      type: "text",
      name: "name",
      message: "What is your name?",
    })
    // destructure name from the prompt object
    .then(({ name }) => {
      this.player = new Player(name);

      this.startNewBattle();
    });
};

Game.prototype.startNewBattle = function () {
  if (this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  } else {
    this.isPlayerTurn = false;
  }

  console.log("Your stats are as follows:");
  console.table(this.player.getStats());
  console.log(this.currentEnemy.getDescription());

  this.battle();
};

Game.prototype.battle = function () {
  if (this.isPlayerTurn) {
    // player prompts will go here
    inquirer
      .prompt({
        type: "list",
        message: "What would you like to do?",
        name: "action",
        choices: ["Attack", "Use potion"],
      })
      .then(({ action }) => {
        if (action === "Use potion") {
          // follow-up prompt will go here
          if (!this.player.getInventory()) {
            console.log("You don't have any potions!");
            return this.checkEndOfBattle();
          }
          inquirer
            .prompt({
              type: "list",
              message: "Which potion would you like to use?",
              name: "action",
              choices: this.player
                .getInventory()
                .map((item, index) => `${index + 1}: ${item.name}`),
            })
            .then(({ action }) => {
              const potionDetails = action.split(": ");

              this.player.usePotion(potionDetails[0] - 1);
              console.log(`You used a ${potionDetails[1]} potion`);
              return this.checkEndOfBattle();
            });
        } else {
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);

          console.log(`You attacked ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());
          return this.checkEndOfBattle();
        }
      });
  } else {
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
    return this.checkEndOfBattle();
  }
};

Game.prototype.checkEndOfBattle = function () {
  if (this.player.isAlive() && this.currentEnemy.isAlive()) {
    this.isPlayerTurn = !this.isPlayerTurn;
    this.battle();
  } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
    console.log(`You've defeated ${this.currentEnemy.name}`);

    this.player.addPotion(this.currentEnemy.potion);
    console.log(
      `${this.player.name} found a ${this.currentEnemy.potion.name} potion`
    );

    this.roundNumber++;
    this.player.health = this.player.health + 100;

    if (this.roundNumber < this.enemies.length) {
      this.currentEnemy = this.enemies[this.roundNumber];
      this.startNewBattle();
    } else {
      console.log("You Win!");
    }
  } else {
    console.log("You've been defeated!");
  }
};

module.exports = Game;
