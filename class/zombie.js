import { ctx } from '../script.js';
import Enemy from './enemy.js';
import { player } from '../script.js'

// let sx = 0
// let sy = rowImOn * img.height / numberOfRows
// let sw = img.width / numberOfImages
// let sh = img.height / numberOfRows
// let dx = 0
// let dy = 0

console.log('hi')

class Zombie extends Enemy {
    constructor(x, y, w, h, speed, color, health, damage, enemyImg) {
        super(x, y, w, h, speed, color, health, damage, enemyImg)
        this.numberOfImages = 9
        this.numberOfRows = 3
        this.numOfActualImages = 9
        this.rowImOn = 0
        this.enemyImg = enemyImg
        this.sx = 0
        this.sy = 0
        this.sw = this.w / this.numberOfImages
        this.sh = this.h
        this.dx = 0
        this.dy = 0
    }
    init = () => {
        let i = 0;
        //console.log(this)
        setInterval((function () {
            this.sx += this.sw
            i++
            if (i >= this.numOfActualImages - 1) {
                this.sx = 0;
                i = 0;
            }
        }).bind(this), 500)
    }
    draw() {

        ctx.save()


        // const angle = Math.atan2(
        //     event.clientY - (player.y + player.h / 2) - 100,
        //     event.clientX - (player.x + player.w / 2) - 100
        // )
        // console.log(player.x, player.y)

        console.log('y00o', player)
        // ctx.rotate(-5 * Math.PI / 180);
        // ctx.translate(150, 75);
        // ctx.rotate(20 * (Math.PI / 180));
        // ctx.translate(-150, -75);

        let size = .9

        let centerX = this.x + (this.w / 9 * size / 2)
        let centerY = this.y + (this.h * size / 2)

        ctx.translate(centerX, centerY);

        ctx.rotate(145 * Math.PI / 180);
        //ctx.rotate(Math.PI / 2);
        ctx.translate(-1 * centerX, -1 * centerY)
        // ctx.drawImage(
        //     this.enemyImg, this.x, this.y,
        //     this.w, this.h
        // )



        ctx.drawImage(
            this.enemyImg,
            this.sx,
            this.sy,
            this.sw,
            this.sh,
            this.x, this.y,
            this.w / 9 * size, this.h * size
        )



        ctx.restore()

    }

}

export { Zombie }