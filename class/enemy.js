import { ctx, player, } from './../script.js'


export default class Enemy {
    constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed
        this.color = color
        this.health = health
        this.damage = damage

        // this.numberOfImages = 9
        // this.numberOfRows = 3
        // this.numOfActualImages = 9
        // this.rowImOn = 1
        // this.enemyImg = enemyImg
        // this.sx = 0
        // // this.sy = this.rowImOn * (this.enemyImg.height / this.numberOfRows)
        // // this.sw = this.img.width / this.numberOfImages
        // // this.sh = this.img.height / this.numberOfRows
        // this.dx = 0
        // this.dy = 0
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
    update() {
        this.init() // Iterates through each enemy and runs this.init for every single one
        
        //draw enemy here?
        


    }
    move() {
        if (player.x > this.x) {
            this.x += this.speed
        }
        if (player.x < this.x) {
            this.x -= this.speed
        }
        if (player.y > this.y) {
            this.y += this.speed
        }
        if (player.y < this.y) {
            this.y -= this.speed
        }
    }
    randomPathing() { //TESTING    Enemy random pathing left
        let randomNum = Math.floor(Math.random() * 2)
        this.x -= this.speed
        if (randomNum === 1) {
            this.y -= this.speed
        } else {
            this.y += this.speed
        }
    }
}

export { Enemy }