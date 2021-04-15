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
    draw() {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.enemyImg, this.x, this.y, this.w, this.h)
    }

}

export { Zombie }