import MovingObject from "./moving_object.js"

// inheriting from MO
Bullet.prototype = Object.create(MovingObject)
Bullet.prototype.constructor = Bullet

function Bullet() {
    
}
