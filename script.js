




let roadImg = new Image()
roadImg.src = './images/road.png'
roadImg.onload = function (e) {
    ctx.drawImage(roadImg, 0, 0, 700, 900)
}


// PLAYABLE HERO CHARACTER
class Player {
    constructor(x, y, w, h, src, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.src = src;
        this.PlayerImg = new Image()
        this.speed = speed
    }
    loadHero = () => {
        this.PlayerImg.src = this.src
        this.PlayerImg.onload = this.draw
    }
    draw = () => {
        ctx.drawImage(this.HeroImg, this.x, this.y, this.w, this.h)
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
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }
    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}






// CREATING PLAYER 
const player = new Player(x, y, w, h, src, speed)
player.draw()



//CREATING PROJECTILES
const projectile = new Projectile(player.x, player.y, 5, 'red', { x: 1, y: 1 })
projectile.draw()




// ANIMATE
function animate() {
    requestAnimationFrame(animate)
    projectiles.forEach((projectile) => {
        projectile.update()
    })
}




// PLAYER ATTACK EVENT LISTENER
addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientx - canvas.width / 2
    )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        new Projectile()
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