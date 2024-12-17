// Enum for hero types
enum HeroType {
    Warrior = "WARRIOR",
    Mage = "MAGE",
    Archer = "ARCHER"
}

// Enum for attack types
enum AttackType {
    Physical = "PHYSICAL",
    Magical = "MAGICAL",
    Ranged = "RANGED"
}

// Interface for hero characteristics
interface HeroStats {
    health: number;
    attack: number;
    defense: number;
    speed: number;
}

// Interface for hero
interface Hero {
    id: number;
    name: string;
    type: HeroType;
    attackType: AttackType;
    stats: HeroStats;
    isAlive: boolean;
}

// Interface for attack result
interface AttackResult {
    damage: number;
    isCritical: boolean;
    remainingHealth: number;
}

// Function to create a new hero
function createHero(name: string, type: HeroType): Hero {
    // Implement hero creation logic based on the provided type
    const hero: Hero = {
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
function calculateDamage(attacker: Hero, defender: Hero): AttackResult {
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
function battleRound(hero1: Hero, hero2: Hero): string {
    // Implement battle logic and return the result
    const result1 = calculateDamage(hero1, hero2);
    const result2 = calculateDamage(hero2, hero1);

    hero2.stats.health = result1.remainingHealth;
    hero1.stats.health = result2.remainingHealth;

    let outcome = '';
    if (result1.remainingHealth <= 0 && result2.remainingHealth <= 0) {
        outcome = 'It\'s a draw!';
    } else if (result1.remainingHealth <= 0) {
        outcome = `${hero2.name} wins!`;
    } else if (result2.remainingHealth <= 0) {
        outcome = `${hero1.name} wins!`;
    } else {
        outcome = 'The battle continues...';
    }

    return outcome;
}

// Find a hero by property
function findHeroByProperty(heroes: Hero[], property: keyof Hero, value: any): Hero | undefined {
    return heroes.find((hero) => hero[property] === value);
}

// Example usage
const heroes: Hero[] = [
    createHero('Dmitro', HeroType.Warrior),
    createHero('Mepli', HeroType.Mage)
];

const battleResult = battleRound(heroes[0], heroes[1]);
console.log(battleResult);

const hero = findHeroByProperty(heroes, 'type', HeroType.Warrior);
console.log(hero);