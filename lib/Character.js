// function Character() {}

// Character.prototype.isAlive = function () {
//   if (this.health === 0) {
//     return false;
//   }
//   return true;
// };

// Character.prototype.getHealth = function () {
//   return `${this.name}'s health is now ${this.health}!`;
// };

// Character.prototype.getAttackValue = function () {
//   const min = this.strength - 5;
//   const max = this.strength + 5;

//   return Math.floor(Math.random() * (max - min) + min);
// };

// Character.prototype.reduceHealth = function (health) {
//   this.health -= health;

//   if (this.health < 0) {
//     this.health = 0;
//   }
// };

class Character {
  constructor(name = "") {
    this.name = name;
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
  }
  isAlive() {
    if (this.health === 0) {
      return false;
    }
    return true;
  }
  getHealth() {
    return `${this.name}'s health is now ${this.health}!`;
  }
  getAttackValue() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max - min) + min);
  }
  reduceHealth(health) {
    this.health -= health;

    if (this.health < 0) {
      this.health = 0;
    }
  }
}

module.exports = Character;
