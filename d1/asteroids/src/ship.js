import MovingObject from "./moving_object.js"

// inheriting from MO
Ship.prototype = Object.create(MovingObject)
Bullet.prototype.constructor = Bullet

function Bullet() {
    
}
