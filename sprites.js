const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const img = new Image();
//img.src = './frame-sprite-animation.png'
//img.src = './coin-sprite-animation-sprite-sheet.png'
img.src = `./orc.png`
img.onload = animate;


//ORc Dying
let numberOfImages = 13
let numberOfRows = 21
let numOfActualImages = 7
let rowImOn = 20

//Coin Flipping
// let numberOfImages = 10
// let numberOfRows = 1
// let numOfActualImages = 10
// let rowImOn = 0


let sx = 0
let sy = rowImOn * img.height / numberOfRows
let sw = img.width / numberOfImages
let sh = img.height / numberOfRows
let dx = 0
let dy = 0



function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
        img, sx, sy, sw, sh,
        dx, dy,
        // canvas.width / numberOfImages, 
        // canvas.height / numberOfRows * (sw / sh)
        50, 50
    )

}

let i = 0;
setInterval(function () {
    console.log(sw, sx)
    sx += sw
    i++
    if (i >= numOfActualImages - 1) {
        sx = 0;
        i = 0;
    }
    //if(sx * sw >= )
    // if (sx >= img.width - (numOfActualImages * sw)) {
    //     sx = 0
    // }
}, 30)
