
// Mouse & touchscreen events on the canvas.

//-------------------------------------------------------------------------------------------
//  SETUP
//-------------------------------------------------------------------------------------------

var potOver = false;
var activePot = null;

function setupInteraction(target) {

    // MOUSE //
    target.addEventListener("mousedown", mousePress, false);
    target.addEventListener("mouseup", mouseRelease, false);
    target.addEventListener("mousemove", mouseMove, false);


    // TOUCH //
    target.addEventListener('touchstart', function(event) {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
            touch = event.targetTouches[0];
            touchTakeover = true;
        } else {
            touchTakeover = false;
        }
        clickOrTouch();
    }, false);

    target.addEventListener('touchmove', function(event) {
        event.preventDefault();
        if (event.targetTouches.length == 1) {
            touch = event.targetTouches[0];
        }
        mouseMove(event);
    }, false);

    target.addEventListener('touchend', function(event) {
        mouseRelease();
        touchTakeover = false;
    }, false);

}


//-------------------------------------------------------------------------------------------
//  MOUSE / TOUCH
//-------------------------------------------------------------------------------------------



function mousePress() {

    mouseIsDown = true;
    rolloverCheck();

    // LOOP POTS (Temp ) //
    var l = pots.length;
    for (var i=0; i<l; i++) {
        if (pots[i].hitTest()) {
            pots[i].click();
        }
    }
}



function mouseRelease() {
    mouseIsDown = false;
    activePot = null;
}



function mouseMove(event) {

    var x,y;

    if (touchTakeover==true) {
        x = touch.pageX;
        y = touch.pageY;
    } else {
        x = event.pageX;
        y = event.pageY;
    }

    const ratio = getPixelRatio();
    mouseX = x * ratio;
    mouseY = y * ratio;
    rolloverCheck();


    // LOOP POTS (Temp ) //
    potOver = false;
    var l = pots.length;
    for (var i=0; i<l; i++) {
        if (pots[i].hitTest()) {
            potOver = true;
        }

        if (mouseIsDown) {
            pots[i].drag();
        }
    }
}

function rolloverCheck() {
    var u = units;
    var test = hitTest(dx-(30*u), dy+(40*u), 60*u, 60*u);
}



// DETERMINE CLICK //
function clickOrTouch(event) {

    var x,y;

    if (touchTakeover==true) {
        x = touch.pageX;
        y = touch.pageY;
    } else {
        x = event.pageX;
        y = event.pageY;
    }

    const ratio = getPixelRatio();
    mouseX = x * ratio;
    mouseY = y * ratio;

    if (!mouseIsDown) {
        mousePress(event);
    }
}




