import { ctx, player, currentLevel } from './../script.js'


export default class Player {
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
        this.bulletcost = 10


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
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
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
        setInterval(function () {
            player.sx += player.sw
            i++
            if (i >= player.numOfActualImages - 1) {
                player.sx = 0;
                i = 0;
            }
        }, 30)
    }
    draw = () => {
        //HP Bar
        ctx.fillStyle = 'red'
        ctx.fillRect(10, 10, 200, 25)
        ctx.fillStyle = 'green'
        ctx.fillRect(10, 10, Math.max(0, this.health / 100 * 200), 25)
        ctx.fillStyle = 'black'
        ctx.font = '20px ccclobberintimecrunchy';
        ctx.fillText(`health`, 80, 30)

        //Stamina Bar
        ctx.fillStyle = 'white'
        ctx.fillRect(250, 10, 200, 25)
        ctx.fillStyle = 'yellow'
        ctx.fillRect(250, 10, Math.max(0, this.stamina / 100 * 200), 25)
        ctx.fillStyle = 'black'
        ctx.font = '20px ccclobberintimecrunchy';
        ctx.fillText(`ammo`, 320, 30)

        //Score
        ctx.fillStyle = 'white'
        ctx.font = '32px ccclobberintimecrunchy';
        ctx.fillText(`Current Level: ${currentLevel}`, 870, 40)

    }
    reload = () => {
        setTimeout(() => {
            this.stamina = this.maxStamina
            console.log("Reloading, 2 seconds!");
        }, 2000)
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
}


export { Player }