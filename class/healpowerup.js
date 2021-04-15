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
}

export { healPowerup }