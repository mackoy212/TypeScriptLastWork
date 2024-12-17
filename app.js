"use strict";
// Enum for hero types
var HeroType;
(function (HeroType) {
    HeroType["Warrior"] = "WARRIOR";
    HeroType["Mage"] = "MAGE";
    HeroType["Archer"] = "ARCHER";
})(HeroType || (HeroType = {}));
// Enum for attack types
var AttackType;
(function (AttackType) {
    AttackType["Physical"] = "PHYSICAL";
    AttackType["Magical"] = "MAGICAL";
    AttackType["Ranged"] = "RANGED";
})(AttackType || (AttackType = {}));
// Function to create a new hero
function createHero(name, type) {
    // Implement hero creation logic based on the provided type
    const hero = {
        id: Date.now(),
        name,
        type,
        attackType: type === HeroType.Warrior ? AttackType.Physical : AttackType.Magical,
        stats: {
            health: 100,
            attack: 50,
            defense: 30,
            speed: 20
        },
        isAlive: true
    };
    return hero;
}
// Function to calculate damage
function calculateDamage(attacker, defender) {
    // Implement damage calculation logic based on hero stats and attack type
    const damage = Math.max(attacker.stats.attack - defender.stats.defense, 1);
    const isCritical = Math.random() < 0.2;
    const remainingHealth = Math.max(defender.stats.health - damage * (isCritical ? 2 : 1), 0);
    return {
        damage: damage,
        isCritical: isCritical,
        remainingHealth: remainingHealth
    };
}
// Function to perform a round of battle
function battleRound(hero1, hero2) {
    // Implement battle logic and return the result
    const result1 = calculateDamage(hero1, hero2);
    const result2 = calculateDamage(hero2, hero1);
    hero2.stats.health = result1.remainingHealth;
    hero1.stats.health = result2.remainingHealth;
    let outcome = '';
    if (result1.remainingHealth <= 0 && result2.remainingHealth <= 0) {
        outcome = 'It\'s a draw!';
    }
    else if (result1.remainingHealth <= 0) {
        outcome = `${hero2.name} wins!`;
    }
    else if (result2.remainingHealth <= 0) {
        outcome = `${hero1.name} wins!`;
    }
    else {
        outcome = 'The battle continues...';
    }
    return outcome;
}
// Find a hero by property
function findHeroByProperty(heroes, property, value) {
    return heroes.find((hero) => hero[property] === value);
}
// Example usage
const heroes = [
    createHero('Dmitro', HeroType.Warrior),
    createHero('Mepli', HeroType.Mage)
];
const battleResult = battleRound(heroes[0], heroes[1]);
console.log(battleResult);
const hero = findHeroByProperty(heroes, 'type', HeroType.Warrior);
console.log(hero);
//# sourceMappingURL=app.js.map