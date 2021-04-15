import { ctx } from '../script.js';
import Enemy from './enemy.js';


// let sx = 0
// let sy = rowImOn * img.height / numberOfRows
// let sw = img.width / numberOfImages
// let sh = img.height / numberOfRows
// let dx = 0
// let dy = 0


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
        }).bind(this), 100)
    }
    draw() {
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.drawImage(this.enemyImg, this.x, this.y, this.w, this.h)
        //ctx.save();
        //ctx.translate(this.x + this.w / 2, this.y + this.h / 2); //Offset x and y 
        // ctx.rotate(-Math.PI / 2); //Correct for original image position 
        //ctx.rotate(Math.PI / 180 * 45); //angle


        // ctx.drawImage(git
        //     this.enemyImg, this.sx, this.sy, this.sw, this.sh,
        //     this.x, this.y,
        //     // canvas.width / numberOfImages, 
        //     // canvas.height / numberOfRows * (sw / sh)
        //     150, 150
        // )
        ctx.drawImage(
            this.enemyImg, this.sx, this.sy, this.sw, this.sh,
            -this.w / 2, -this.h / 2,
            // canvas.width / numberOfImages, 
            // canvas.height / numberOfRows * (sw / sh)
            150, 150
        )
        // ctx.drawImage(this.img, this.x, this.y, this.width, 
        //     this.height, x, y, this.width, this.height);

        // ctx.save();
        // ctx.translate(x + this.width / 2, y + this.height / 2);
        // ctx.rotate(this.angle * Math.PI / 180);
        // ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
        //                         -this.width / 2, -this.height / 2, this.width, this.height);
        // ctx.restore();

        ctx.restore()

    }

}

export { Zombie }