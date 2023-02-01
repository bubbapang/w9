import MovingObject from "./moving_object.js"

document.addEventListener("DOMContentLoaded", function() {

    const canvas = document.getElementById("myCanvas")
    const context = canvas.getContext("2d")
    context.fillStyle = "black"
    context.fillRect(0, 0, 1400, 700)
    
    console.log("event listened to!")

})
