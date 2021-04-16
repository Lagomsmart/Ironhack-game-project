import { ctx } from '../script.js';
import Enemy from './enemy.js';
import { player } from '../script.js'

// let sx = 0
// let sy = rowImOn * img.height / numberOfRows
// let sw = img.width / numberOfImages
// let sh = img.height / numberOfRows
// let dx = 0
// let dy = 0

let zombieImg = new Image()
zombieImg.src = './images/zombie-revised.png'

class Zombie extends Enemy {
    constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
        super(x, y, w, h, speed, color, health, damage, enemyImg)
        this.numberOfImages = 9
        this.numberOfRows = 0
        this.numOfActualImages = 9
        this.rowImOn = 0
        this.enemyImg = zombieImg
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
    draw() {

        ctx.save()

        let angle = Math.atan2(
            player.y - (this.y + this.h / 2) - 100,
            player.x - (this.x + this.w / 2) - 100
        )

        let angleDeg = Math.atan2(this.y - player.y, this.x - player.x) * 180 / Math.PI;

        let size = .9

        let centerX = this.x + (this.w / 9 * size / 2)
        let centerY = this.y + (this.h * size / 2)

        ctx.translate(centerX, centerY);
        ctx.rotate(angleDeg * Math.PI / 180);
        ctx.translate(-1 * centerX, -1 * centerY)

        ctx.drawImage(
            this.enemyImg,
            this.sx,
            this.sy,
            this.sw,
            this.sh,
            this.x, this.y,
            this.w / 9 * size, this.h * size
        )
        
        ctx.restore()

    }

}

export { Zombie }