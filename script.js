
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
const player = new Player(10, 10, 50, 50, 5)
player.draw()



//CREATING PROJECTILES
const projectile = new Projectile(player.x, player.y, 5, 'red', { x: 1, y: 1 })
projectile.draw()

const projectiles = []







// MOVING PLAYER
onkeydown = function (e) {
    console.log(e.key)
    if (e.key === 'ArrowLeft') {
        if (player.x > 0) {
            player.x -= 15
        }
    }
    if (e.key === 'ArrowRight') {
        if (player.x < 960) {
            player.x += 15
        }
    }
    if (e.key === 'ArrowUp') {
        if (player.y > 0) {
            player.y -= 15
        }
    }
    if (e.key === 'ArrowDown') {
        if (player.y < 640) {
            player.y += 15
        }
    }
}




// ANIMATE
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)


    projectiles.forEach((projectile) => {
        projectile.update()
    })

    player.draw()
}

animate()


// PLAYER ATTACK EVENT LISTENER
addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
    )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        new Projectile(player.x, player.y, 5, 'red', velocity)
    )
})












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