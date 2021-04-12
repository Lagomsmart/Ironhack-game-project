
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


// CREATING PLAYER 
const player = new Player(10, 10, 50, 50, 15)



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
    if (LEFT) {
        player.x -= player.speed;
    }
    if (RIGHT) {
        player.x += player.speed;
    }
    if (UP) {
        player.y -= player.speed;
    }
    if (DOWN) {
        player.y += player.speed;
    }
}
// ---------- END OF PLAYER MOVEMENT ----------



// onkeydown = function (e) {     //----- OLD WAY OF MOVING -----
//     console.log(e.key)
//     if (e.key === 'ArrowLeft') {
//         if (player.x > 0) {
//             player.x -= 30
//         }
//     }
//     if (e.key === 'ArrowRight') {
//         if (player.x < 960) {
//             player.x += 30
//         }
//     }
//     if (e.key === 'ArrowUp') {
//         if (player.y > 0) {
//             player.y -= 30
//         }
//     }
//     if (e.key === 'ArrowDown') {
//         if (player.y < 640) {
//             player.y += 30
//         }
//     }
// }

const projectiles = []


// ANIMATE
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    player.draw()
    move() //Player movement

    projectiles.forEach((projectile) => {
        projectile.update()
    })
}


// PLAYER ATTACK EVENT LISTENER
addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - player.y,
        event.clientX - player.x
    )
    const velocity = {
        x: Math.cos(angle) * 6,
        y: Math.sin(angle) * 6
    }
    projectiles.push(
        new Projectile(player.x, player.y, 5, 'red', velocity)
    )
})


animate()


// COLLISION DETECTION - HERO VS ENEMY
// function detectCollision(rect1, rect2, frameId) {
//     if (rect1.x < rect2.x + rect2.w &&
//         rect1.x + rect1.w > rect2.x &&
//         rect1.y < rect2.y + rect2.h &&
//         rect1.y + rect1.h > rect2.y) {
//         // collision detected!
//         console.log("COLLISION")
//         cancelAnimationFrame(frameId)
//         alert("GAME OVER NOOB")
//     }
// }