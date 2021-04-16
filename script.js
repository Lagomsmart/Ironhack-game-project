import { Player } from './class/player.js';
import { Projectile } from './class/projectile.js';
import { Zombie } from './class/zombie.js';
import { Fireball } from './class/fireball.js';
import { healPowerup } from './class/healpowerup.js';
import { detectCollision, RectCircleColliding, PowerupCollosion } from './collision.js'
import { AmmoCap } from './class/ammocap.js';

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

const startButton = document.querySelector('.startButton')
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
    3132,
    207,
    0.5,
    'red',
    10,
    1
)
let fireballImg = new Image()
fireballImg.src = './sprites/fireball.png'
fireball.enemyImg = fireballImg

//(x, y, w, h, speed, color, health, damage) 
const zombie = new Zombie(
    Math.random() * 800 + 400,
    Math.random() * 650,
    1700,
    175,
    1,
    'blue',
    10,
    10
)
const zombie2 = new Zombie(
    Math.random() * 800 + 400,
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




let healthPotion = new healPowerup(1000, 300, 30, 30, 'green')



let enemies = [];
let otherEnemies = [];
let maxAmountOfEnemies = 2; //we can ++ this to increase monsterspawn per room cleared
let maxAmountOfOtherEnemies = 3
let currentLevel = 1

const projectiles = [];

let powerups = [];
let maxAmountOfPowerups = 1

console.log(healthPotion.draw());













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







if (powerups.length < 1) {
    powerups.push(healthPotion)
}

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
healthPotion.draw()
console.log(healthPotion)


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
        cancelAnimationFrame(animate)
        score.innerHTML = currentLevel - 1
    }

    PowerupCollosion(player, powerups)


    projectiles.forEach((projectile) => {
        projectile.update()
    })


    // [enemies] moving
    enemies.forEach((enemy) => {

        otherEnemies.forEach((otherenemy) => {
            otherenemy.randomPathing()

        });
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
                    projectiles.splice(pIndex, 1)
                }
            })

        )
    })

    // [otherEnemies] updating  RED
    otherEnemies.forEach((enemy, index) => {
        enemy.update(

            projectiles.forEach((projectile, pIndex) => {

                if (RectCircleColliding(projectile, enemy)) {
                    otherEnemies.splice(index, 1)
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


        //reset player X and Y back
        player.x = defaultPlayerX
        player.y = defaultPlayerY

        //increase difficulty
        maxAmountOfOtherEnemies += 2
        maxAmountOfEnemies += 2

        //reset and push enemy amount
        for (let i = otherEnemies.length; i < maxAmountOfOtherEnemies; i++) {
            otherEnemies.push(fireball)
        }//(x, y, w, h, speed, color, health, damage, enemyImg)
        for (let i = enemies.length; i < maxAmountOfEnemies; i++) {
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


        let randompowerup = Math.floor(Math.random() * 2)
        //reset and push powerup
        // if (randompowerup == 0) { //50% chance to spawn 1 powerup per room
        //     //poweruparray.push(healthPotion)
        // } else if (randompowerup == 1) { //50% chance to spawn 1 powerup per room
        //     //poweruparray.push(ammocap)
        // }




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


//RESET GAME
//restartGame = () => {
// ctx.clearRect(0, 0, canvas.width, canvas.height)
// currentLevel = 1
// player.health = 100
// player.stamina = 100
// player.maxStamina = 100
// maxAmountOfEnemies = 2
// maxAmountOfOtherEnemies = 2
// enemies = [];
// otherEnemies = []
// enemies.push(zombie1)
// enemies.push(zombie2)
//}


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


// ---------- PLAYER ATTACK EVENT LISTENER ----------
addEventListener('click', (event) => {
    if (player.stamina >= 10) {
        player.stamina -= 10;

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
            new Projectile(player.x + player.w / 2, player.y + player.h / 2, 2, 'gold', velocity)
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


window.enemies = enemies
window.otherEnemies = otherEnemies
window.player = player


export { ctx, player, powerups, currentLevel }