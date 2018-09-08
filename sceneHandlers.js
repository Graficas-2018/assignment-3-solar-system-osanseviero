// An integer value, in pixels, indicating the X coordinate at which the mouse pointer was located when the event occurred. 
var mouseDown = false, pageX = 0;

function rotateScene(deltax) {
    mainGroup.rotation.y += deltax / 100;
    $("#rotation").html("rotation: 0," + mainGroup.rotation.y.toFixed(1) + ",0");
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
    rotateScene(deltax);
}

function onMouseDown(evt) {
    evt.preventDefault();
    
    mouseDown = true;
    pageX = evt.pageX;
}

function onMouseUp(evt) {
    evt.preventDefault();
    
    mouseDown = false;
}

function addMouseHandler(canvas) {
    canvas.addEventListener( 'mousemove', 
            function(e) { onMouseMove(e); }, false );
    canvas.addEventListener( 'mousedown', 
            function(e) { onMouseDown(e); }, false );
    canvas.addEventListener( 'mouseup', 
            function(e) { onMouseUp(e); }, false );
}