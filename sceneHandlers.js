/*
 * Functions that handle the scene movements.
 * Right click handles translation and left click handles rotation
 */

// An integer value, in pixels, indicating the X coordinate at which the mouse pointer was located when the event occurred. 
let mouseDown = false, pageX = 0, pageY;
let speed = 1;

function rotateScene(deltax, deltay) {
    mainGroup.rotation.y += deltax / 100;
    mainGroup.rotation.x += deltay / 100;
    $("#rotation").html("rotation: 0," + mainGroup.rotation.y.toFixed(1) + ",0");
}

function translateScene(deltax, deltay) {
    mainGroup.position.x += deltax / 10;
    mainGroup.position.y -= deltay / 10;
}

function scaleScene(scale) {
    mainGroup.scale.set(scale, scale, scale);
    $("#scale").html("scale: " + scale);
}

function onMouseMove(evt) {
    if (!mouseDown) {
        return;
    }
    
    evt.preventDefault();
    
    var deltax = evt.pageX - pageX;
    pageX = evt.pageX;

    var deltay = evt.pageY - pageY;
    pageY= evt.pageY;

    if(evt.which == 1){
        rotateScene(deltax, deltay);
    } else if(evt.which === 3) {
        translateScene(deltax, deltay)
    }
    
}

function onMouseDown(evt) {
    evt.preventDefault();
    
    mouseDown = true;
    pageX = evt.pageX;
    pageY = evt.pageY;
}

function onMouseUp(evt) {
    evt.preventDefault();
    
    mouseDown = false;
}

function onScrollChange(evt) {
    if(evt.deltaY < 0) {
        speed += 0.1;
    } else {
        speed -= 0.1;
    }
    speed = Math.max(speed, 0);
    speed = Math.min(speed, 20);
    $("#speed").html("speed: " + speed.toFixed(1));
}

function addMouseHandler(canvas) {
    canvas.addEventListener( 'mousemove', 
            function(e) { onMouseMove(e); }, false );
    canvas.addEventListener( 'mousedown', 
            function(e) { onMouseDown(e); }, false );
    canvas.addEventListener( 'mouseup', 
            function(e) { onMouseUp(e); }, false );
    canvas.addEventListener( 'wheel', 
            function(e) { onScrollChange(e) }, false );
    canvas.addEventListener('contextmenu', event => event.preventDefault()); // Allows to use right click
}