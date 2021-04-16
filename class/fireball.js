import Enemy from './enemy.js';
import { ctx, player, } from './../script.js'



let fireballImg = new Image()
fireballImg.src = './sprites/fireball.png'



export default class Fireball extends Enemy {
    constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
        super(x, y, w, h, speed, color, health, damage, enemyImg)
        this.numberOfImages = 6
        this.numberOfRows = 0
        this.numOfActualImages = 6
        this.rowImOn = 0
        this.enemyImg = fireballImg
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
        }).bind(this), 100)
    }
    draw() {

        let size = .3

        ctx.drawImage(
            this.enemyImg,
            this.sx,
            this.sy,
            this.sw,
            this.sh,
            this.x, this.y,
            this.w / 6 * size, this.h * size
        )


    }
}


export { Fireball }