import { ctx } from '../script.js';
import Enemy from './enemy.js';

class Zombie extends Enemy {
    constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
        super(x, y, w, h, speed, color, health, damage, enemyImg)
        this.numberOfImages = 3
        this.numberOfRows = 3
        this.numOfActualImages = 3
        this.rowImOn = 0
        this.enemyImg = enemyImg
        this.sx = 0
        this.sy = this.rowImOn * this.h
        this.sw = this.w / 3
        this.sh = this.h / 3
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
        }).bind(this), 300)
    }
    draw() {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.drawImage(this.enemyImg, this.x, this.y, this.w, this.h)
        ctx.drawImage(
            this.enemyImg, this.sx, this.sy, this.sw, this.sh,
            this.x, this.y,
            // canvas.width / numberOfImages, 
            // canvas.height / numberOfRows * (sw / sh)
            250, 250
        )
    }

}

export { Zombie }