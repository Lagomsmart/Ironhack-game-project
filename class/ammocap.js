import { ctx, player, } from '../script.js'

import { Powerups } from './powerups.js';


class AmmoCap extends Powerups {
    constructor(x, y, w, h, color, img) {
        super(x, y, w, h, color, img)

    }
    ability() {
        player.maxStamina += 20
    }
    draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}

export { AmmoCap }