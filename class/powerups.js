import { ctx, player, } from './../script.js'

class Powerups {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color
    }
    draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
    update() {
        this.draw()
        this.x = this.x// + this.velocity.x
        this.y = this.y// + this.velocity.y
    }
}


export { Powerups }