
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

//What if the monsters keep spawning untill you kill X amount, instead of them being there from the start?. Then you can pass through the door. Or combine both?
//If yes, keep right side "door" more open for bigger spawn area


//Math.reduce to spawn X amount of enemies by empying array?

// let playerImg = new Image()
// playerImg.src = 'https://d30y9cdsu7xlg0.cloudfront.net/png/35-200.png';
// playerImg.onload = () => player.drawArrow(0);





// ---------- Player class ----------
class Player {
    constructor(x, y, w, h, speed, maxhealth, health, damage, stamina, maxStamina, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.color = 'black';
        this.health = health;
        this.maxhealth = maxhealth;
        this.damage = damage;
        this.stamina = stamina;
        this.maxStamina = maxStamina;
        this.angle = 0;


        // this.numberOfImages = 4
        // this.numberOfRows = 2
        // this.numOfActualImages = 4
        // this.rowImOn = 1
        this.img = img
        // this.sx = 0
        // this.sy = this.rowImOn * this.img.height / this.numberOfRows
        // this.sw = this.img.width / this.numberOfImages
        // this.sh = this.img.height / this.numberOfRows
        // this.dx = this.w
        // this.dy = this.h

    }
    drawArrow = (angle) => {
        this.angle = angle;
    }
    drawGuy = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(this.x + this.w/2, this.y + this.h/2);
        ctx.rotate(-Math.PI / 2);
        ctx.rotate(this.angle);
        ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
        // ctx.drawImage(
        //     this.img, this.sx, this.sy, this.sw, this.sh,
        //     this.dx, this.dy,
        //     // canvas.width / numberOfImages, 
        //     // canvas.height / numberOfRows * (sw / sh)
        //     150, 150
        // )
        ctx.restore();

    }
    
    init = () => {
        let i = 0;
        //console.log(player)
        setInterval(function () {
            //console.log(player.sw, player.sx, player)
            player.sx += player.sw
            i++
            if (i >= player.numOfActualImages - 1) {
                player.sx = 0;
                i = 0;
            }
        }, 30)
    }
    draw = () => {

        ctx.fillStyle = 'red'
        ctx.fillRect(10, 10, 200, 25)
        ctx.fillStyle = 'green'
        ctx.fillRect(10, 10, Math.max(0, this.health / 100 * 200), 25)

        if (this.health <= 0) {
            //this.dead()
        }
    }
    rechargeStamina = (num) => {
        if (this.stamina < this.maxStamina) {
            this.stamina += num
            if (this.stamina > this.maxStamina) {
                this.stamina = this.maxStamina
            }
        }
    }
    // rechargeHealth = (num) => {
    //     console.log('recharge health called');
    //     if (this.health < this.maxhealth) {
    //         this.health += num
    //         console.log('adding health');
    //     } else if (this.health > this.maxhealth) {
    //         this.health = this.maxhealth
    //         console.log('health max')
    //     }
    // }
    // dead = () => {
    //     cancelAnimationFrame(stopGame)
    //     restartGame()
    // }
}


// ---------- Player Projectile class ----------
// PROJECTILE CLASS
class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
    }
    update() {
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}




// ---------- Enemy class ----------
class Enemy {
    constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed
        this.color = color
        this.health = health
        this.damage = damage

        this.numberOfImages = 9
        this.numberOfRows = 3
        this.numOfActualImages = 9
        this.rowImOn = 1
        this.enemyImg = enemyImg
        this.sx = 0
        // this.sy = this.rowImOn * (this.enemyImg.height / this.numberOfRows)
        // this.sw = this.img.width / this.numberOfImages
        // this.sh = this.img.height / this.numberOfRows
        this.dx = 0
        this.dy = 0
    }
    loadHero = () => {
        this.EnemyImg.src = this.src
        this.EnemyImg.onload = this.draw
    }
    draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
    init = () => {
        let i = 0;
        
        setInterval(function () {
            
            player.sx += player.sw
            i++
            if (i >= player.numOfActualImages - 1) {
                player.sx = 0;
                i = 0;
            }
        }, 30)
    }
    update() {
        this.draw()
        this.x = this.x// + this.velocity.x
        this.y = this.y// + this.velocity.y
    }
    move() {
        if (player.x > this.x) {
            this.x += this.speed
        }
        if (player.x < this.x) {
            this.x -= this.speed
        }
        if (player.y > this.y) {
            this.y += this.speed
        }
        if (player.y < this.y) {
            this.y -= this.speed
        }
    }
    randomPathing() { //TESTING    Enemy random pathing left
        let randomNum = Math.floor(Math.random() * 2)
        this.x -= this.speed
        if (randomNum === 1) {
            this.y -= this.speed
        } else {
            this.y += this.speed
        }
    }
}

// ---------- Powerup class ----------
class Powerups {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color
    }
    draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
    update() {
        this.draw()
        this.x = this.x// + this.velocity.x
        this.y = this.y// + this.velocity.y
    }
}

// ---------- Heal Powerup ----------
class healPowerup extends Powerups {
    constructor(x, y, w, h, color) {
        super(x, y, w, h, color)
    }
    heal() {
        if (player.health < player.maxhealth) {
            player.health += 50

            if (player.health > player.maxhealth) {
                player.health = player.maxhealth
            }
        }
    }
}









//----------DECLARING PLAYER, ENEMY, OBJECTS ----------
// CREATING PLAYER 
let defaultPlayerX = 10
let defaultPlayerY = canvas.height / 2

let img = new Image()
img.src = './images/smallgirlx2.png';


const player = new Player(defaultPlayerX, defaultPlayerY, img.width, img.height, 5, 100, 100, 5, 100, 100, img) //(x, y, w, h, speed, maxhealth, health, damage, stamina, maxStamina)

const fireball = new Enemy(1150, Math.random() * 450 + 100, 50, 50, 1, 'red', 10, 1)



let healthPotion = new healPowerup(1000, 300, 30, 30, 'green')


let enemies = [];
let otherEnemies = [];
let maxAmountOfEnemies = 3; //we can ++ this to increase monsterspawn per room cleared
let maxAmountOfOtherEnemies = 3

const projectiles = [];

let powerups = [];
let maxAmountOfPowerups = 1

document.onmousemove = function (e) {
    var dx = e.pageX - (player.x + player.w / 2);
    var dy = e.pageY - (player.y + player.h / 2);
    var theta = Math.atan2(dy, dx);
    player.drawArrow(theta);
};



// var arrow = new Image();


// function drawArrow(angle) {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.save();
//     ctx.translate(player.x + player.w/2, player.y + player.h/2);
//     ctx.rotate(-Math.PI / 2);   // correction for image starting position
//     ctx.rotate(angle);
//       ctx.drawImage(playerImg, -playerImg.width / 2.5, -playerImg.height / 2.5);
//     ctx.restore();
//   }








// ---------- PLAYER MOVEMENT ----------
var LEFT = false;
var RIGHT = false;
var UP = false;
let DOWN = false;
document.onkeydown = function (e) {
    if (e.keyCode == 37) LEFT = true;
    if (e.keyCode == 39) RIGHT = true;
    if (e.keyCode == 38) UP = true;
    if (e.keyCode == 40) DOWN = true;
}
document.onkeyup = function (e) {
    if (e.keyCode == 37) LEFT = false;
    if (e.keyCode == 39) RIGHT = false;
    if (e.keyCode == 38) UP = false;
    if (e.keyCode == 40) DOWN = false;
}
function move() {
    if (LEFT && player.x > 6) {
        player.x -= player.speed;
    }
    if (RIGHT && player.x < (canvas.width - player.w)) {
        player.x += player.speed;
    }
    if (UP && player.y > 6) {
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







setInterval(() => {
    player.rechargeStamina(10)

}, 300)


// ---------- END OF Set Interval ----------







if (powerups.length < 1) {
    powerups.push(healthPotion)
}

// for (let i = otherEnemies.length; i < maxAmountOfOtherEnemies; i++) {
//     otherEnemies.push(new Enemy(1150, Math.random() * 450 + 100, 50, 50, 1, 'red', 10, 1))
// }
// for (let i = enemies.length; i < maxAmountOfEnemies; i++) {
//     enemies.push(new Enemy(Math.random() * 1000 + 200, Math.random() * 650, 50, 50, 1, 'blue', 10, 1))
// }



ctx.drawImage(player.img, player.x, player.y)


// ---------- ANIMATE ---------- ---------- ANIMATE ---------- ---------- ANIMATE ----------
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    player.drawGuy()

    player.draw()


    move() //Player movement




    powerups.forEach((powerup, x) => {

        if (detectCollision(player, powerup)) {
            powerup.heal()
            powerups.splice(x, 1)
        } else {
            powerup.draw()
        }
    })




    projectiles.forEach((projectile) => {
        projectile.update()
    })


    //  CREATING/PUSHING THE ENEMIES //


    if (enemies.length < maxAmountOfEnemies) {
        enemies.push(new Enemy(Math.random() * 1000 + 200, Math.random() * 650, 50, 50, 1, 'blue', 10, 1))
    }
    if (otherEnemies.length < maxAmountOfOtherEnemies) {
        otherEnemies.push(new Enemy(1150, Math.random() * 450 + 100, 50, 50, 1, 'red', 10, 1))
    }

    // [enemies] moving
    enemies.forEach((enemy) => {

        otherEnemies.forEach((otherenemy) => {
            if (!detectCollision(otherenemy, enemy) && (!detectCollision(otherenemy, player))) {
                otherenemy.randomPathing()
            }

            if (!detectCollision(enemy, player) && (!detectCollision(otherenemy, enemy))) {
                enemy.move()
            }
        });


    });

    // [enemies] updating   BLUE
    enemies.forEach((enemy, index) => {
        enemy.update(

            projectiles.forEach((projectile, pIndex) => {

                if (RectCircleColliding(projectile, enemy)) {
                    enemies.splice(index, 1)
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
    if (player.x == canvas.width - 50 && player.y < 350 && player.y > 250 && otherEnemies.length < 1 && enemies.length < 1) {
        console.log('next room!');
        let currentLevel = 1

        //fade screen
        //ctx.fillRect(0, 0, canvas.width, canvas.height)


        //reset player X and Y back
        player.x = defaultPlayerX
        player.y = defaultPlayerY

        //reset and push enemy amount
        // for (let i = otherEnemies.length; i < maxAmountOfOtherEnemies; i++) {
        //     otherEnemies.push(new Enemy(1150, Math.random() * 450 + 100, 50, 50, 1, 'red', 10, 1))
        // }
        // for (let i = enemies.length; i < maxAmountOfEnemies; i++) {
        //     enemies.push(new Enemy(Math.random() * 1000 + 200, Math.random() * 650, 50, 50, 1, 'blue', 10, 1))
        // }

        //reset and push powerup
        // if (Math.floor(Math.random() * 2) == 1) { //50% chance to spawn 1 powerup per room
        //     //poweruparray.push(healthPotion)
        // }


        //change background image to next level

        // let randomlevel = Math.floor(Math.random() * 2)

        // if (randomlevel = 0) {
        //     document.querySelector("#canvas").style.backgroundImage = "url('NEXTLEVEL')"
        // } else if (randomelevl = 1) {
        //     document.querySelector("#canvas").style.backgroundImage = "url('NEXTLEVEL')"
        // } else if (randomelevl = 2) {
        //     document.querySelector("#canvas").style.backgroundImage = "url('NEXTLEVEL')"
        // }




    }


}
img.onload = () => {
    player.init()
    animate()
}

// ---------- END OF ANIMATE ---------- ---------- END OF ANIMATE ---------- ---------- END OF ANIMATE ----------





// ---------- PLAYER ATTACK EVENT LISTENER ----------
addEventListener('click', (event) => {
    if (player.stamina > 10) {
        player.stamina -= 10;

        const angle = Math.atan2(
            event.clientY - player.y - 100,
            event.clientX - player.x - 100
        )
        const velocity = {
            x: Math.cos(angle) * 14,
            y: Math.sin(angle) * 14
        }
        projectiles.push(
            new Projectile(player.x + player.w / 2, player.y + player.h / 2, 5, 'red', velocity)
        )
    } else {
        console.log('Not enough Stamina!');
    }
})

//event listener for Player to follow cursor
// addEventListener('mousemove', (event) => {
//     state.mouse.x = event.clientX
//     state.mouse.y = event.clientY
// })




// ---------- COLLISION DETECTION ----------



//detectCollision(projectile, enemy) // hero projectile vs enemy




// ---------- COLLISION DETECTION - HERO VS ENEMY ----------
function detectCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        return true
    }
}

// ---------- COLLISION DETECTION - HERO Projectile VS ENEMY ----------
// return true if the rectangle and circle are colliding
function RectCircleColliding(circle, rect) {
    var distX = Math.abs(circle.x - rect.x - rect.w / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.radius)) { return false; }
    if (distY > (rect.h / 2 + circle.radius)) { return false; }

    if (distX <= (rect.w / 2)) { return true; }
    if (distY <= (rect.h / 2)) { return true; }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (circle.radius * circle.radius));
}






// ---------- END OF COLLISION DETECTION ----------