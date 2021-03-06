import { ctx, player, powerups } from './script.js'

// ---------- COLLISION DETECTION - HERO VS ENEMY ----------
function detectCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.sw > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        return true
    }
}

function fireballdetectCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.sw / 2 > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.sh / 2 > rect2.y) {
        return true
    }
}

//collision for powerups
function newdetectCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        return true
    }
}

// ---------- COLLISION DETECTION - HERO Projectile VS ENEMY ----------
// return true if the rectangle and circle are colliding
function RectCircleColliding(circle, rect) {
    var distX = Math.abs(circle.x - rect.x - rect.sw / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.sw / 2 + circle.radius)) { return false; }
    if (distY > (rect.h / 2 + circle.radius)) { return false; }

    if (distX <= (rect.sw / 2)) { return true; }
    if (distY <= (rect.h / 2)) { return true; }

    var dx = distX - rect.sw / 2;
    var dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (circle.radius * circle.radius));
}

//fireball
function fireballRectCircleColliding(circle, rect) {
    var distX = Math.abs(circle.x - rect.x - rect.sw / 5);
    var distY = Math.abs(circle.y - rect.y - rect.sh / 5);

    if (distX > (rect.sw / 5 + circle.radius)) { return false; }
    if (distY > (rect.sh / 5 + circle.radius)) { return false; }

    if (distX <= (rect.sw / 5)) { return true; }
    if (distY <= (rect.sh / 5)) { return true; }

    var dx = distX - rect.sw / 5;
    var dy = distY - rect.sh / 5;
    return (dx * dx + dy * dy <= (circle.radius * circle.radius));
}


// Powerup and Player Collision
function PowerupCollosion() {
    powerups.forEach((powerup, x) => {

        if (newdetectCollision(player, powerup)) {
            powerup.ability()
            powerups.splice(x, 1)
        }
    })
}

export { detectCollision, RectCircleColliding, PowerupCollosion, fireballdetectCollision, fireballRectCircleColliding }