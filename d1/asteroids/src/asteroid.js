import MovingObject from "./moving_object.js"

// inheriting from MO
Asteroid.prototype = Object.create(MovingObject)
Asteroid.prototype.constructor = Asteroid

function Asteroid() {

}
