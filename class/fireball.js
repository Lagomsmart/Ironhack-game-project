import Enemy from './enemy.js';
import { ctx, player, } from './../script.js'


export default class Fireball extends Enemy {
    constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
        super(x, y, w, h, speed, color, health, damage, enemyImg)
        this.numberOfImages = 6
        this.numberOfRows = 2
        this.numOfActualImages = 6
        this.rowImOn = 0
        this.enemyImg = enemyImg
        this.sx = 0
        this.sy = this.rowImOn * 197
        this.sw = 512
        this.sh = 197
        this.dx = 0
        this.dy = 0
    }
    draw() {
        ctx.drawImage(this.enemyImg, this.x, this.y, this.w, this.h)
    }
}


export { Fireball }