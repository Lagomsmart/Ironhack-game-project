
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')



// let roadImg = new Image()
// roadImg.src = './images/road.png'
// roadImg.onload = function (e) {
//     ctx.drawImage(roadImg, 0, 0, 640, 960)
// }

// ---------- Player class ----------
class Player {
    constructor(x, y, w, h, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.PlayerImg = new Image()
        this.speed = speed
        this.color = 'black'
    }
    loadHero = () => {
        this.PlayerImg.src = this.src
        this.PlayerImg.onload = this.draw
    }
    draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
        //ctx.drawImage(this.HeroImg, this.x, this.y, this.w, this.h)
    }
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
    constructor(x, y, w, h, speed, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.EnemyImg = new Image()
        this.speed = speed
        this.color = color
    }
    loadHero = () => {
        this.EnemyImg.src = this.src
        this.EnemyImg.onload = this.draw
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


// CREATING PLAYER 
const player = new Player(10, canvas.height / 2, 50, 50, 15)

// CREATING ENEMY
//const enemyLevel1 = new Enemy(650, 200, 50, 50, 15)
const enemyLevel1 = new Enemy(Math.random() * 1000 + 200, Math.random() * 650, 50, 50, 15, 'green')

let enemies = [];


// ---------- MOVING PLAYER ----------
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


const projectile = new Projectile(player.x, player.y, 5, 'red', 30) // might need to be removed later
const projectiles = []





//enemies.push()






// ---------- ANIMATE ----------
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    player.draw()
    move() //Player movement

    //enemyLevel1.draw()

    projectiles.forEach((projectile) => {
        //detectCollision(projectile, enemyLevel1)
        projectile.update()
    })


    if (enemies.length < 2) { // if new room? spawn push new enemies into array
        enemies.push(new Enemy(Math.random() * 1000 + 200, Math.random() * 650, 50, 50, 15, 'blue'))
    }

    enemies.forEach((enemy, index) => {
        enemy.update()
    });

    // enemies.forEach((enemy, i) => {
    //     projectiles.forEach((projectile, j) => {
    //         if (
    //             projectile.x < enemy.x + enemy.width &&
    //             projectile.x + projectile.width > enemy.x &&
    //             projectile.y < enemy.y + enemy.height &&
    //             projectile.y + projectile.height > enemy.y
    //         ) {
    //             enemies.splice(i, 1);
    //             projectiles.splice(j, 1);
    //         }
    //         // if(enemy.y >canvas.height +600){
    //         //   enemies.splice(i,1)
    //         // }
    //         if (projectile.y < 0 || projectile.y > 2000) {
    //             projectiles.splice(j, 1);
    //         }
    //     });
    // });


    enemies.forEach((enemy, index) => {
        enemy.update(

            projectiles.forEach((projectile) => {

                const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

                // objects touch
                if (dist - enemy.h / 2 - projectile.radius < 1) {
                    setTimeout(() => {
                        enemies.splice(index, 1)
                        projectiles.splice(index, 1)
                    })
                }
            })
        )
        //detectCollision(player, enemy) // player and enemy collide
    })
    //If player reaches next door
    if (player.x == canvas.width - 50 && player.y < 350 && player.y > 250) {
        console.log('next room!');
    }




}

animate()
// ---------- END OF ANIMATE ----------





// ---------- PLAYER ATTACK EVENT LISTENER ----------
addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - player.y - 100,
        event.clientX - player.x - 100
    )
    const velocity = {
        x: Math.cos(angle) * 14,
        y: Math.sin(angle) * 14
    }
    projectiles.push(
        new Projectile(player.x, player.y, 5, 'red', velocity)
    )
})








// ---------- COLLISION DETECTION ----------

// VALS COLLISION CODE
function detectCollision() {
    enemies.forEach((enemy, i) => {
        projectiles.forEach((projectile, j) => {
            if (
                projectile.x < enemy.x + enemy.w &&
                projectile.x + projectile.w > enemy.x &&
                projectile.y < enemy.y + enemy.h &&
                projectile.y + projectile.h > enemy.y

                // rect1.x < rect2.x + rect2.w &&
                // rect1.x + rect1.w > rect2.x &&
                // rect1.y < rect2.y + rect2.h &&
                // rect1.y + rect1.h > rect2.y
            ) {
                //enemies[i].strength--;
                // if (enemies[i].strength <= 0) {
                //     let newCoin = {
                //         x: enemies[i].x,
                //         y: enemies[i].y,
                //         width: 20,
                //         height: 20,
                //         imgP: 0,
                //     };
                //     coins.push(newCoin);
                //     enemies.splice(i, 1);
                // }
                projectiles.splice(j, 1);
            }
            // if(enemy.y >canvas.height +600){
            //   enemies.splice(i,1)
            // }
            if (projectile.y < 0 || projectile.y > 2000) {
                projectiles.splice(j, 1);
            }
        });
    });
}



//detectCollision(projectile, enemy) // hero projectile vs enemy




// COLLISION DETECTION - HERO VS ENEMY
// function detectCollision(rect1, rect2) {
//     if (rect1.x < rect2.x + rect2.w &&
//         rect1.x + rect1.w > rect2.x &&
//         rect1.y < rect2.y + rect2.h &&
//         rect1.y + rect1.h > rect2.y) {
//         // collision detected!
//         console.log("COLLISION")
//         alert("Player HIT")
//     }
// }

// COLLISION DETECTION - HERO Projectile VS ENEMY
// function detectCollisionProjectilveVsHero(rect1, rect2) {
//     if (rect1.x < rect2.x + rect2.w &&
//         rect1.x + rect1.w > rect2.x &&
//         rect1.y < rect2.y + rect2.h &&
//         rect1.y + rect1.h > rect2.y) {
//         // collision detected!
//         console.log("COLLISION - Enemy hit by Projectile")
//     }
// }






// ---------- END OF COLLISION DETECTION ----------