import { Player } from './class/player.js';
import { Projectile } from './class/projectile.js';
import { Zombie } from './class/zombie.js';
import { Fireball } from './class/fireball.js';
import { MedkitPowerup } from './class/medkitpowerup.js';
import { detectCollision, RectCircleColliding, PowerupCollosion } from './collision.js'
import { AmmoCap } from './class/ammocap.js';

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const startButton = document.querySelector('.startButton')
const restartButton = document.querySelector('.restartButton')
const splashScreen = document.querySelector('.SplashScreen')
const finishScreen = document.querySelector('.FinishScreen')
const score = document.querySelector('#score')


//What if the monsters keep spawning untill you kill X amount, instead of them being there from the start?. Then you can pass through the door. Or combine both?
//If yes, keep right side "door" more open for bigger spawn area


//Math.reduce to spawn X amount of enemies by empying array?

// let playerImg = new Image()
// playerImg.src = 'https://d30y9cdsu7xlg0.cloudfront.net/png/35-200.png';
// playerImg.onload = () => player.drawArrow(0);




//----------DECLARING PLAYER, ENEMY, OBJECTS ----------
// CREATING PLAYER 
let defaultPlayerX = 10
let defaultPlayerY = canvas.height / 2

let img = new Image()
img.src = './images/smallgirlx2.png';

const fireball = new Fireball(
    1150,
    Math.random() * 450 + 100,
    3123,
    207,
    .2,
    'red',
    10,
    1
)
let fireballImg = new Image()
fireballImg.src = './sprites/fireball.png'
fireball.enemyImg = fireballImg

//(x, y, w, h, speed, color, health, damage) 
const zombie = new Zombie(
    Math.random() * 800 + 600,
    Math.random() * 650,
    1700,
    175,
    1,
    'blue',
    10,
    10
)
const zombie2 = new Zombie(
    Math.random() * 800 + 600,
    Math.random() * 650,
    1700,
    175,
    1,
    'blue',
    10,
    10
)

let zombieImg = new Image()
zombieImg.src = './images/zombie-revised.png'
zombie.enemyImg = zombieImg
zombie2.enemyImg = zombieImg

const player = new Player(defaultPlayerX, defaultPlayerY, 101, 101, 5, 100, 100, 5, 100, 100, img) //(x, y, w, h, speed, maxhealth, health, damage, stamina, maxStamina)

let ammoCapUpgrade = new AmmoCap(800, 300, 75, 75, 'yellow') //x, y, w, h, color
let ammoCapUpgradeImg = new Image()
ammoCapUpgradeImg.src = './images/ammo.png'
ammoCapUpgrade.img = ammoCapUpgradeImg



let medkit = new MedkitPowerup(Math.random() * 600 + 500, 100, 70, 70, 'green')
let medkitImg = new Image()
medkitImg.src = './images/firstaid.png'
medkit.img = medkitImg




let enemies = [];
let otherEnemies = [];
let maxAmountOfEnemies = 2; //we can ++ this to increase monsterspawn per room cleared
let maxAmountOfOtherEnemies = 3
let currentLevel = 1
let zombiesOnScreen = 0
let fireballsOnScreen = 0
let maxFireballsOnScreen = 2
let maxZombiesOnScreen = 2
const projectiles = [];
let powerups = [];
let maxAmountOfPowerups = 1





let explosionImg = new Image()
explosionImg.src = './sprites/explosion.png'
// explImg = explosionImg

class Explosion {
    constructor(x, y, w, h, explosionImg) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.explosionImg = explosionImg
        this.numberOfImages = 24
        this.numberOfRows = 0
        this.numOfActualImages = 24
        this.rowImOn = 0
        this.sx = 0
        this.sy = 0
        this.sw = this.w / this.numberOfImages
        this.sh = this.h
        this.dx = 0
        this.dy = 0
    }
    init = () => {
        let i = 0;
        setInterval((function () {
            this.sx += this.sw
            i++
            if (i >= this.numOfActualImages - 1) {
                this.sx = 0;
                i = 0;
            }
        }).bind(this), 500)
    }
    draw(projectile) {
        let size = .5
        console.log(projectile)
        ctx.drawImage(
            this.explosionImg,
            this.sx,
            this.sy,
            this.sw,
            this.sh,
            projectile.x,
            projectile.y,
            this.w / 24 * size, this.h * size
        )
    }
}

const explosion = new Explosion(
    200,
    200,
    3123,
    135,
    explosionImg
)
console.log(explosion)









// ---------- PLAYER MOVEMENT ----------
var LEFT = false;
var RIGHT = false;
var UP = false;
let DOWN = false;
document.onkeydown = function (e) {
    if (e.keyCode == 65) LEFT = true;
    if (e.keyCode == 68) RIGHT = true;
    if (e.keyCode == 87) UP = true;
    if (e.keyCode == 83) DOWN = true;
    if (e.keyCode == 82) player.reload()
}
document.onkeyup = function (e) {
    if (e.keyCode == 65) LEFT = false;
    if (e.keyCode == 68) RIGHT = false;
    if (e.keyCode == 87) UP = false;
    if (e.keyCode == 83) DOWN = false;
}
function move() {
    if (LEFT && player.x > 6) {
        player.x -= player.speed;
    }
    if (RIGHT && player.x < (canvas.width - player.w)) {
        player.x += player.speed;
    }
    if (UP && player.y > 50) {
        player.y -= player.speed;
    }
    if (DOWN && player.y < (canvas.height - player.h)) {
        player.y += player.speed;
    }
}
// ---------- END OF PLAYER MOVEMENT ----------









// ---------- Set Interval ----------


setInterval(() => {
    enemies.forEach((enemy) => {
        if (detectCollision(enemy, player)) {
            player.health -= enemy.damage
        }
    });

    otherEnemies.forEach((otherenemy) => {
        if (detectCollision(otherenemy, player)) {
            player.health -= otherenemy.damage
        }
    });
}, 1000)











// ---------- END OF Set Interval ----------







// if (powerups.length < 1) {
//     powerups.push(medkit)
// }
// if (powerups.length < 2) {
//     powerups.push(ammoCapUpgrade)
// }

for (let i = otherEnemies.length; i < maxAmountOfOtherEnemies; i++) {
    otherEnemies.push(fireball)
}
for (let i = enemies.length; i < 1; i++) {
    enemies.push(zombie)
}
for (let i = enemies.length; i < 2; i++) {
    enemies.push(zombie2)
}



ctx.drawImage(player.img, player.x, player.y)



// ---------- ANIMATE ---------- ---------- ANIMATE ---------- ---------- ANIMATE ----------
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    player.drawGuy()
    player.draw()
    move() //Player movement

    // END THE GAME
    if (player.health < 1) {
        // splashScreen.style.display = 'flex'
        finishScreen.style.display = 'flex'
        cancelAnimationFrame(null)
        score.innerHTML = currentLevel - 1
        restartGame()
        player.healh = 100
    }

    PowerupCollosion(player, powerups)

    powerups.forEach((powerup) => {
        powerup.draw()
    })

    projectiles.forEach((projectile) => {
        projectile.update()
    })


    // [enemies] moving
    otherEnemies.forEach((otherenemy) => {
        otherenemy.randomPathing()
    });
    enemies.forEach((enemy) => {
        enemy.move()
    });

    // [enemies] updating   BLUE
    enemies.forEach((enemy, index) => {
        enemy.update(

            projectiles.forEach((projectile, pIndex) => {

                if (RectCircleColliding(projectile, enemy)) {

                    enemy.health -= player.damage
                    if (enemy.health < 1) {
                        enemies.splice(index, 1)
                    }
                    explosion.draw(projectile)
                    projectiles.splice(pIndex, 1)
                }
            })

        )
    })

    if (otherEnemies.length < enemies.length) {

    }


    // [otherEnemies] updating  RED FIREBALL
    otherEnemies.forEach((enemy, index) => {
        enemy.update(

            projectiles.forEach((projectile, pIndex) => {

                if (RectCircleColliding(projectile, enemy)) {
                    otherEnemies.splice(index, 1)
                    explosion.draw(projectile)
                    projectiles.splice(pIndex, 1)
                }

                //If projectile is outside of screen, delete it
                if (projectile.y < 0 || projectile.y > 2000 || projectile.x < -200 || projectile.x > 2000) {
                    projectiles.splice(index, 1);
                }
            })
        )
        if (enemy.x < -200) { // if enemy walk off screen left, they are removed from array
            otherEnemies.splice(index, 1)
        }
    })





    //If player reaches next door
    if (player.x > 1050 && player.y > 150 && player.y < 550 && otherEnemies.length < 1 && enemies.length < 1) {
        console.log('next room!');

        currentLevel++
        //fade screen
        //ctx.fillRect(0, 0, canvas.width, canvas.height)


        //function for spawning enemies in on timer. setInterval
        //on new wave => fill array every second until i = amountofenemies counter 

        //declaring and increasing fireball speed
        let fireballspeed = 2
        if (currentLevel % 3 == 0) {
            fireballspeed++
        }

        //reset player X and Y back
        player.x = defaultPlayerX
        player.y = defaultPlayerY

        //increase difficulty
        zombiesOnScreen = 0
        fireballsOnScreen = 0
        // maxFireballsOnScreen = 2
        // maxZombiesOnScreen = 2
        maxAmountOfOtherEnemies += 3
        maxAmountOfEnemies += 3
        maxZombiesOnScreen += 2
        maxFireballsOnScreen += 1

        //reset and push enemy amount
        //(x, y, w, h, speed, color, health, damage, enemyImg)
        setInterval((function () {
            if (enemies.length < maxAmountOfEnemies && zombiesOnScreen <= maxZombiesOnScreen) {
                zombiesOnScreen++
                enemies.push(new Zombie(
                    1250,
                    Math.random() * 650 + 50,
                    1700,
                    175,
                    1,
                    'blue',
                    10,
                    10
                ))
            }
            if (otherEnemies.length < maxAmountOfOtherEnemies && fireballsOnScreen <= maxFireballsOnScreen) { //(let i = otherEnemies.length; i < maxAmountOfOtherEnemies; i++)
                fireballsOnScreen++
                otherEnemies.push(new Fireball(
                    1250,
                    Math.random() * 550 + 100,
                    3132,
                    207,
                    fireballspeed,
                    'red',
                    2,
                    1
                ))
            }//(x, y, w, h, speed, color, health, damage, enemyImg)




            // for (let i = otherEnemies.length; i < maxAmountOfOtherEnemies; i++) { //(let i = otherEnemies.length; i < maxAmountOfOtherEnemies; i++)
            //     fireballsOnScreen++
            //     otherEnemies.push(new Fireball(
            //         1250,
            //         Math.random() * 550 + 100,
            //         3132,
            //         207,
            //         fireballspeed,
            //         'red',
            //         2,
            //         1
            //     ))
            // }//(x, y, w, h, speed, color, health, damage, enemyImg)
            // for (let i = enemies.length; i < maxAmountOfEnemies; i++) {
            //     zombiesOnScreen++
            //     enemies.push(new Zombie(
            //         1250,
            //         Math.random() * 650 + 50,
            //         1700,
            //         175,
            //         1,
            //         'blue',
            //         10,
            //         10
            //     ))
            // }
        }), 1000)


        let randompowerup = Math.floor(Math.random() * 3)
        // reset and push powerup
        if (randompowerup == 0) { //50% chance to spawn 1 powerup per room
            powerups.push(new MedkitPowerup(Math.random() * 600 + 500, 100, 70, 70, 'green', medkitImg))
        } else if (randompowerup == 1) { //50% chance to spawn 1 powerup per room
            powerups.push(new AmmoCap(800, 300, 75, 75, 'yellow', ammoCapUpgradeImg))
        } else if (randompowerup == 2) {
            //Nothing spawns
        }




        //change background image to next level
        let randomlevel = Math.floor(Math.random() * 5)
        console.log(randomlevel);
        if (randomlevel == 0) {
            document.querySelector("#canvas").style.backgroundImage = "url('./Levels/1Level.png')"
        } else if (randomlevel == 1) {
            document.querySelector("#canvas").style.backgroundImage = "url('./Levels/2Level.png')"
        } else if (randomlevel == 2) {
            document.querySelector("#canvas").style.backgroundImage = "url('./Levels/3Level.png')"
        } else if (randomlevel == 3) {
            document.querySelector("#canvas").style.backgroundImage = "url('./Levels/4Level.png')"
        } else if (randomlevel == 4) {
            document.querySelector("#canvas").style.backgroundImage = "url('./Levels/5Level.png')"
        }


    }


}

// ---------- END OF ANIMATE ---------- ---------- END OF ANIMATE ---------- ---------- END OF ANIMATE ----------


img.onload = () => {
    player.init()

}
fireballImg.onload = () => {
    fireball.init()
}
zombieImg.onload = () => {
    zombie.init()
    zombie2.init()
}
explosionImg.onload = () => {
    explosion.init()
}


//RESET GAME
function restartGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    currentLevel = 1
    player.health = 100
    player.stamina = 100
    player.maxStamina = 100
    maxAmountOfEnemies = 2
    maxAmountOfOtherEnemies = 2
    maxZombiesOnScreen = 2
    maxFireballsOnScreen = 2
    player.bulletcost = 10

    enemies = []
    otherEnemies = []

    // for (let i = 0; i < enemies.length; i++) {
    //     enemies.slice(0, enemies.length)
    // }
    // for (let i = 0; i < enemies.length; i++) {
    //     otherEnemies.slice(0, otherEnemies.length)
    // }
    enemies.push(zombie)
    enemies.push(zombie2)
    player.x = defaultPlayerX
    player.y = defaultPlayerY
}


document.onmousemove = function (e) {
    var dx = e.pageX - (player.x + player.w / 2) - 100;
    var dy = e.pageY - (player.y + player.h / 2) - 100;
    var theta = Math.atan2(dy, dx);
    player.drawArrow(theta);
};




//START GAME
startButton.addEventListener('click', () => {
    console.log("Go!");
    animate()
    //spawnenemies?
    splashScreen.style.display = 'none'
    finishScreen.style.display = 'none'

})

restartButton.addEventListener('click', () => {
    console.log("Go!");
    //animate() doubles the instance of animate.. why?
    //spawnenemies?
    splashScreen.style.display = 'none'
    finishScreen.style.display = 'none'
    restartGame()
})


// ---------- PLAYER ATTACK EVENT LISTENER ----------
addEventListener('click', (event) => {
    if (player.stamina >= player.bulletcost) {
        player.stamina -= player.bulletcost;

        if (player.stamina < 10) {
            console.log('Not enough Ammo! RELOADING'); 0
            player.reload()
        }
        const angle = Math.atan2(
            event.clientY - (player.y + player.h / 2) - 100,
            event.clientX - (player.x + player.w / 2) - 100
        )
        const velocity = {
            x: Math.cos(angle) * 14, //bullet speed
            y: Math.sin(angle) * 14
        }
        projectiles.push(
            new Projectile(player.x + player.w / 2, player.y + player.h / 2, 2, 'rbga(254, 0 , 0)', velocity)
        )
    } else {
        console.log('Not enough Ammo! RELOADING');
    }
})

//event listener for Player to follow cursor
// addEventListener('mousemove', (event) => {
//     state.mouse.x = event.clientX
//     state.mouse.y = event.clientY
// })

// Makes you able to console log the variable in browser
window.enemies = enemies
window.otherEnemies = otherEnemies
window.player = player
window.medkit = medkit
window.ammoCapUpgrade = ammoCapUpgrade


export { ctx, player, powerups, currentLevel }