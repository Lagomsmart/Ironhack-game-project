import { ctx, player, } from './../script.js'

class Powerups {
    constructor(x, y, w, h, color, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color
        this.img = img
    }
}


export { Powerups }