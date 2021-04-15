import Enemy from './enemy.js';
import { ctx, player, } from './../script.js'


export default class Fireball extends Enemy {
    constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
        super(x, y, w, h, speed, color, health, damage, enemyImg)
        this.numberOfImages = 6
        this.numberOfRows = 2
        this.numOfActualImages = 6
        this.rowImOn = 1
        this.enemyImg = enemyImg
        this.sx = 0
        this.sy = this.rowImOn * this.h
        this.sw = this.w
        this.sh = this.h
        this.dx = 0
        this.dy = 0
        this.dw = this.w //wrong?
        this.dh = this.h //wrong?
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
        ctx.drawImage(this.enemyImg, this.x, this.y, this.dw, this.dh)
    }
}


export { Fireball }