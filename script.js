
const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')



// let roadImg = new Image()
// roadImg.src = './images/road.png'
// roadImg.onload = function (e) {
//     ctx.drawImage(roadImg, 0, 0, 640, 960)
// }


// PLAYABLE HERO CHARACTER
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


class Enemy {
    constructor(x, y, w, h, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.EnemyImg = new Image()
        this.speed = speed
        this.color = 'red'
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
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}


// CREATING PLAYER 
const player = new Player(10, 10, 50, 50, 15)

// CREATING ENEMY
const enemyLevel1 = new Enemy(Math.random() * 650 + 50, 200, 50, 50, 15)

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


const projectile = new Projectile (player.x, player.y, 5, 'red', 30) // might need to be removed later

const projectiles = []


// ANIMATE
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    player.draw()
    move() //Player movement
    enemyLevel1.draw()

    projectiles.forEach((projectile) => {
        projectile.update()
    })

    enemies.forEach((enemy, index) => {
        enemy.update(

            projectiles.forEach((projectile) => {
                const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)

                // objects touch
                if (dist - enemy.h/2 - projectile.radius < 1) {
                    enemies.splice(index, 1)
                    projectiles.splice(index, 1)
                }
            
            })
        )
    })

    detectCollision(projectile, enemyLevel1) // hero projectile vs enemy

    detectCollision(player, enemyLevel1) // player and enemy collide
}



// PLAYER ATTACK EVENT LISTENER
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


animate()


// COLLISION DETECTION - HERO VS ENEMY
function detectCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        // collision detected!
        console.log("COLLISION")
        alert("Enemy HIT")
    }
}