import { ctx, player, } from '../script.js'

import { Powerups } from './powerups.js';



class MedkitPowerup extends Powerups {
    constructor(x, y, w, h, color, img) {
        super(x, y, w, h, color, img)
        this.img = img

    }
    ability() { // Increase player health by 50 ( Max 100 )
        if (player.health < player.maxhealth) {
            player.health += 50

            if (player.health > player.maxhealth) {
                player.health = player.maxhealth
            }
        }
    }
    draw = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}

export { MedkitPowerup }