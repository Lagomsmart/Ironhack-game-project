import { ctx, player, } from '../script.js'

import { Powerups } from './powerups.js';



class healPowerup extends Powerups {
    constructor(x, y, w, h, color) {
        super(x, y, w, h, color)
        
    }
    heal() {
        if (player.health < player.maxhealth) {
            player.health += 50

            if (player.health > player.maxhealth) {
                player.health = player.maxhealth
            }
        }
    }
    draw = () => {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
}

export { healPowerup }