import { ctx, player, } from './../script.js'

class Powerups {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color
    }
<<<<<<< HEAD
    // draw = () => {
    //     ctx.fillStyle = this.color
    //     ctx.fillRect(this.x, this.y, this.w, this.h)
    // }
=======
    draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
>>>>>>> 243043637aa2ac25195acbfaa0f2c78b0864a1af
}


export { Powerups }