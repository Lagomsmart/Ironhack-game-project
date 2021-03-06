import { ctx, player, } from './../script.js'



export default class Enemy {
    constructor(x, y, w, h, speed, color, health, damage) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed
        this.color = color
        this.health = health
        this.damage = damage

    }
    update() {


        this.draw()


    }
    move() { // Enemy Zombie Movement
        if (player.x > this.x) {
            this.x += this.speed * 2
        }
        if (player.x < this.x) {
            this.x -= this.speed * 2
        }
        if (player.y > this.y) {
            this.y += this.speed
        }
        if (player.y < this.y) {
            this.y -= this.speed
        }
    }
    randomPathing() { // Enemy Fireball Movement
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