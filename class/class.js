

// // ---------- Player class ----------
// export default class Player {
//     constructor(x, y, w, h, speed, maxhealth, health, damage, stamina, maxStamina, img) {
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//         this.speed = speed;
//         this.color = 'black';
//         this.health = health;
//         this.maxhealth = maxhealth;
//         this.damage = damage;
//         this.stamina = stamina;
//         this.maxStamina = maxStamina;
//         this.angle = 0;


//         // this.numberOfImages = 4
//         // this.numberOfRows = 2
//         // this.numOfActualImages = 4
//         // this.rowImOn = 1
//         this.img = img
//         // this.sx = 0
//         // this.sy = this.rowImOn * this.img.height / this.numberOfRows
//         // this.sw = this.img.width / this.numberOfImages
//         // this.sh = this.img.height / this.numberOfRows
//         // this.dx = this.w
//         // this.dy = this.h

//     }
//     drawArrow = (angle) => {
//         this.angle = angle;
//     }
//     drawGuy = () => {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.save();
//         ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
//         ctx.rotate(-Math.PI / 2);
//         ctx.rotate(this.angle);
//         ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
//         // ctx.drawImage(
//         //     this.img, this.sx, this.sy, this.sw, this.sh,
//         //     this.dx, this.dy,
//         //     // canvas.width / numberOfImages, 
//         //     // canvas.height / numberOfRows * (sw / sh)
//         //     150, 150
//         // )
//         ctx.restore();

//     }

//     init = () => {
//         let i = 0;
//         //console.log(player)
//         setInterval(function () {
//             //console.log(player.sw, player.sx, player)
//             player.sx += player.sw
//             i++
//             if (i >= player.numOfActualImages - 1) {
//                 player.sx = 0;
//                 i = 0;
//             }
//         }, 30)
//     }
//     draw = () => {

//         ctx.fillStyle = 'red'
//         ctx.fillRect(10, 10, 200, 25)
//         ctx.fillStyle = 'green'
//         ctx.fillRect(10, 10, Math.max(0, this.health / 100 * 200), 25)

//         if (this.health <= 0) {
//             //this.dead()
//         }
//     }
//     rechargeStamina = (num) => {
//         if (this.stamina < this.maxStamina) {
//             this.stamina += num
//             if (this.stamina > this.maxStamina) {
//                 this.stamina = this.maxStamina
//             }
//         }
//     }
//     // rechargeHealth = (num) => {
//     //     console.log('recharge health called');
//     //     if (this.health < this.maxhealth) {
//     //         this.health += num
//     //         console.log('adding health');
//     //     } else if (this.health > this.maxhealth) {
//     //         this.health = this.maxhealth
//     //         console.log('health max')
//     //     }
//     // }
//     // dead = () => {
//     //     cancelAnimationFrame(stopGame)
//     //     restartGame()
//     // }
// }


// // ---------- Player Projectile class ----------
// // PROJECTILE CLASS
// export class Projectile {
//     constructor(x, y, radius, color, velocity) {
//         this.x = x
//         this.y = y
//         this.radius = radius
//         this.color = color
//         this.velocity = velocity
//     }
//     draw() {
//         ctx.beginPath()
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//         ctx.fillStyle = this.color
//         ctx.fill()
//     }
//     update() {
//         this.draw()
//         this.x = this.x + this.velocity.x
//         this.y = this.y + this.velocity.y
//     }
// }




// // ---------- Enemy class ----------
// export class Enemy {
//     constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//         this.speed = speed
//         this.color = color
//         this.health = health
//         this.damage = damage

//         // this.numberOfImages = 9
//         // this.numberOfRows = 3
//         // this.numOfActualImages = 9
//         // this.rowImOn = 1
//         // this.enemyImg = enemyImg
//         // this.sx = 0
//         // // this.sy = this.rowImOn * (this.enemyImg.height / this.numberOfRows)
//         // // this.sw = this.img.width / this.numberOfImages
//         // // this.sh = this.img.height / this.numberOfRows
//         // this.dx = 0
//         // this.dy = 0
//     }
//     init = () => {
//         let i = 0;

//         setInterval((function () {

//             this.sx += this.sw

//             if (i % 3 === 0) {
//                 this.sy += this.sh
//                 this.rowImOn++
//             }
//             i++
//             if (i >= this.numOfActualImages - 1) {
//                 this.sx = 0;
//                 this.sy = 0;
//                 i = 0;
//                 this.rowImOn = 0;
//             }
//         }).bind(this), 300)
//     }
//     update() {
//         this.init() // Iterates through each enemy and runs this.init for every single one
//     }
//     move() {
//         if (player.x > this.x) {
//             this.x += this.speed
//         }
//         if (player.x < this.x) {
//             this.x -= this.speed
//         }
//         if (player.y > this.y) {
//             this.y += this.speed
//         }
//         if (player.y < this.y) {
//             this.y -= this.speed
//         }
//     }
//     randomPathing() { //TESTING    Enemy random pathing left
//         let randomNum = Math.floor(Math.random() * 2)
//         this.x -= this.speed
//         if (randomNum === 1) {
//             this.y -= this.speed
//         } else {
//             this.y += this.speed
//         }
//     }
// }

// // ----------- ZOMBIE CLASS ------------ //

// export class Zombie extends Enemy {
//     constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
//         super(x, y, w, h, speed, color, health, damage, enemyImg)
//         this.numberOfImages = 9
//         this.numberOfRows = 3
//         this.numOfActualImages = 9
//         this.rowImOn = 0
//         this.enemyImg = enemyImg
//         this.sx = 0
//         this.sy = this.rowImOn * 314
//         this.sw = 338
//         this.sh = 314
//         this.dx = 0
//         this.dy = 0
//     }

// }





// // ------------ FIREBALL CLASS ------------ //
// export class Fireball extends Enemy {
//     constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
//         super(x, y, w, h, speed, color, health, damage, enemyImg)
//         this.numberOfImages = 6
//         this.numberOfRows = 2
//         this.numOfActualImages = 6
//         this.rowImOn = 0
//         this.enemyImg = enemyImg
//         this.sx = 0
//         this.sy = this.rowImOn * 197
//         this.sw = 512
//         this.sh = 197
//         this.dx = 0
//         this.dy = 0
//     }

// }





// // ---------- Powerup class ----------
// export class Powerups {
//     constructor(x, y, w, h, color) {
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//         this.color = color
//     }
//     draw = () => {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.w, this.h)
//     }
//     update() {
//         this.draw()
//         this.x = this.x// + this.velocity.x
//         this.y = this.y// + this.velocity.y
//     }
// }

// // ---------- Heal Powerup ----------
// export class healPowerup extends Powerups {
//     constructor(x, y, w, h, color) {
//         super(x, y, w, h, color)
//     }
//     heal() {
//         if (player.health < player.maxhealth) {
//             player.health += 50

//             if (player.health > player.maxhealth) {
//                 player.health = player.maxhealth
//             }
//         }
//     }
// }

