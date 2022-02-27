const prompts = require('prompts');

    class Room {
        constructor(name, description) {
            this.name = name;
            this.description = description;
            this.doors = [];
            this.enemy = [];
        }   

    addDoor(room) {
        this.doors.push(room);
    }

    addEnemy(enemie) {
        this.enemy.push(enemie);
    }

    lookAround() {
        console.log("\nYou look around you.\n" + planet[player.currentRoom].description + "\n\nThere is a doorway leading to: \n");
            for (let i = 0; i < planet[player.currentRoom].doors.length; i++) {
            console.log(planet[player.currentRoom].doors[i].name);
        };
        console.log("------------------------");
            if(planet[player.currentRoom].enemy != 0) {
                for (let i = 0; i < planet[player.currentRoom].enemy.length; i++) {
                    console.log("\nYou see a " + planet[player.currentRoom].enemy[i].charaName + ".");
                    };

            } else {
                console.log("\nIt seems like you're alone. You can relax and go to a different room maybe.\n");
            }}
    }

    class Pawn {
        constructor(charaName, hitPoints, attackDamagePoints, attackHits, weapon) {
            this.charaName = charaName;
            this.hitPoints = hitPoints;
            this.attackDamagePoints = attackDamagePoints;
            this.attackHits = attackHits;
            this.weapon = weapon;
            this.currentRoom = 0;
        }

        goToRoom(room) {
            this.currentRoom = planet.indexOf(room);
            console.log("\nYou move to " + planet[player.currentRoom].name);
            console.log("------------------------");
            for(i = 0; i < planet[player.currentRoom].enemy.length; i++) {
                planet[player.currentRoom].enemy[i].getAttacked(player);
            }
            if(room == portal) {
                console.log("You have reached the portal! You won the game. Nice playing with you. Byebye!\n");
                process.exit(0);
            }
        }

        attack(enemy) {
            if(planet[player.currentRoom].enemy != 0) {
                let throwing = Math.floor(Math.random()*101);
                    if(throwing < this.attackHits) {
                        console.log("You hit the enemy.");
                        enemy.hitPoints -= this.attackDamagePoints;
                        console.log("The " + planet[player.currentRoom].enemy[i].charaName + " has " + enemy.hitPoints + " hit points left.\n");
                            if(enemy.hitPoints <= 0) {
                                for (let i = 0; i < planet[player.currentRoom].enemy.length; i++) {
                                    if(planet[player.currentRoom].enemy[i] == enemy) {
                                        planet[player.currentRoom].enemy.splice(i, 1);
                                    }
                                };
                            }
                    } else {
                        console.log("What happened? You missed the enemy! Try to attack it again, you don't want to have it roaming into the corridors.");
                    }                        
        }}
    }

    class Enemy extends Pawn {
        constructor(charaName, hitPoints, attackDamagePoints, attackHits, weapon) {
        super(charaName, hitPoints, attackDamagePoints, attackHits, weapon);
        }

        getAttacked(player) {
            let throwing = Math.floor(Math.random()*101);
                if(throwing < this.attackHits) {
                    console.log("\nYou see a " + planet[player.currentRoom].enemy[i].charaName + ".");
                    console.log("The enemy seems to not like you, and hits you with its " + planet[player.currentRoom].enemy[i].weapon + ".");
                    player.hitPoints -= this.attackDamagePoints;
                    console.log("The attack was quite strong, and Player has now " + player.hitPoints + " hit points remaining. Be careful.\n");
                    console.log("You might want to attack back, even if you're a bit weakened.")
                    if(player.hitPoints <= 0) {
                        console.log("It seems like the enemy was stronger than you. Don't be disappointed you died, start the game again and take your revenge!");
                        process.exit(0);
                    }
                } else {
                    console.log("\nYou see a " + planet[player.currentRoom].enemy[i].charaName + ". It looks a bit angry.");
                    console.log("The " + planet[player.currentRoom].enemy[i].charaName + " tries to attack you, but misses its shot. I advise you attack back.\n");
                }
        }

    }
    
    let player = new Pawn("Player", 10, 2, 75, "Sharp sword");

    let rat = new Enemy("Sewer Rat", 2, 1, 50, "Sharp teeth");
    let dragon = new Enemy("Giant Dragon", 4, 8, 90, "Sharp claws and fire breath");

    let dungeon = new Room("Dungeon", "You are in the Dungeon, and it is a big and damp room with broken statues all around.");
    let hallway = new Room("Hallway", "You are in the Hallway, and it is a long and dark hallway with dark pools of water on the floor, and some fungus growing on the walls.");
    let chamber = new Room("Chamber", "You are in the Chamber, and it is a small chamber, which is illuminated by a glowing portal of some some kind.");
    let portal = new Room("Portal", "Congratulations, you made it!");

    let planet = [dungeon, hallway, chamber, portal];

    dungeon.addDoor(hallway);
    hallway.addDoor(dungeon);
    hallway.addDoor(chamber);
    chamber.addDoor(hallway);
    chamber.addDoor(portal);

    hallway.addEnemy(rat);
    chamber.addEnemy(dragon);

    async function gameLoop() {

        const initialActionChoices = [
            { title: 'Look around', value: 'look' },
            { title: 'Go to Room', value: 'goToRoom' },
            { title: 'Attack', value: 'attack' },
            { title: 'Exit game', value: 'exit' }
        ];

        const response = await prompts({
            type: 'select',
            name: 'value',
            message: 'Choose your action',
            choices: initialActionChoices
        });

        switch(response.value) {
        case "exit":
            console.log("Sad to see you go! Bye \n");
            process.exit(0);
            break;
        case "look":
            planet[player.currentRoom].lookAround();
            break;
        case "goToRoom":
            const roomChoices = [];
            for (i = 0; i < planet[player.currentRoom].doors.length; i++) {
                roomChoices.push({
                    title: planet[player.currentRoom].doors[i].name,
                    value: planet[player.currentRoom].doors[i].name,
                    room: planet[player.currentRoom].doors[i],
                })};
    
            const roomResponse = await prompts({
                type: 'select',
                name: 'value',
                message: 'Which room do you want to go to?',
                choices: roomChoices,
            });

            for(i = 0; i < roomChoices.length; i++) {
                if(roomChoices[i].value == roomResponse.value) {
                    player.goToRoom(roomChoices[i].room);             
                }
            }
            break;
        case "attack":
                const enemyChoices = [];
                for (i = 0; i < planet[player.currentRoom].enemy.length; i++) {
                    enemyChoices.push({
                        title: planet[player.currentRoom].enemy[i].charaName,
                        value: planet[player.currentRoom].enemy[i].charaName,
                        enemy: planet[player.currentRoom].enemy[i],
                    })};
        
                const enemyResponse = await prompts({
                    type: 'select',
                    name: 'value',
                    message: 'Which enemy do you want to attack?',
                    choices: enemyChoices,
                });
        
                for(i = 0; i < enemyChoices.length; i++) {
                    if(enemyChoices[i].value == enemyResponse.value) {
                        console.log("\nYou attack the " + planet[player.currentRoom].enemy[i].charaName + " with your " + player.weapon + ".");
                        player.attack(enemyChoices[i].enemy);
                    }
                }
            break;     
        }
    gameLoop();
    }

    process.stdout.write('\033c'); // clear screen on windows

    console.log('WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!')
    console.log('================================================')
    console.log('You walk down the stairs to the dungeons')
    gameLoop();