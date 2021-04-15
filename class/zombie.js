import { ctx } from '../script.js';
import Enemy from './enemy.js';

class Zombie extends Enemy {
    constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
        super(x, y, w, h, speed, color, health, damage, enemyImg)
        this.numberOfImages = 9
        this.numberOfRows = 3
        this.numOfActualImages = 9
        this.rowImOn = 0
        this.enemyImg = enemyImg
        this.sx = 0
        this.sy = this.rowImOn * 314
        this.sw = 338
        this.sh = 314
        this.dx = 0
        this.dy = 0
    }
    init = () => {
        let i = 0;

        setInterval((function () {

            this.sx += this.sw

            if (i % 3 === 0) {
                this.sy += this.sh
                this.rowImOn++
            }
            i++
            if (i >= this.numOfActualImages - 1) {
                this.sx = 0;
                this.sy = 0;
                i = 0;
                this.rowImOn = 0;
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