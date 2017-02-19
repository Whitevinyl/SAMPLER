

// INIT //
var canvas = [];
var ctx = [];
var TWEEN;
var fonts;


// METRICS //
var halfX = 0;
var halfY = 0;
var fullX = 0;
var fullY = 0;
var units = 0;
var dx = halfX;
var dy = halfY;
var headerType = 0;
var midType = 0;
var dataType = 0;
var bodyType = 0;
var subType = 0;
var device = "desktop";


// INTERACTION //
var mouseX = 0;
var mouseY = 0;
var touchTakeover = false;
var touch;
var mouseIsDown = false;




// COLORS //
var bgCols = [new RGBA(0,0,25,1)];
var textCol = new RGBA(255,255,255,1);
var primaryCol = new RGBA(255,67,101,1);
var secondaryCol = new RGBA(0,0,51,1);


//-------------------------------------------------------------------------------------------
//  INITIALISE
//-------------------------------------------------------------------------------------------


function init() {

    // SETUP CANVAS //
    var cnvs = document.getElementById("main");
    var cntx = cnvs.getContext("2d");
    cntx.mozImageSmoothingEnabled = false;
    cntx.imageSmoothingEnabled = false;

    canvas.push(cnvs);
    ctx.push(cntx);


    StartAudioContext(Tone.context, '#main').then(function(){
        //started
    });

    // SET CANVAS & DRAWING POSITIONS //
    metrics();

    // INITIALISE THINGS //
    setupInteraction(canvas[0]);
    setupAudio();



    // DONE //
    fonts = new Fonts(['Bodoni:n4,o4'],2,function(){
        setupDrawing();
        draw();
    });
    fonts.setup();
}




//-------------------------------------------------------------------------------------------
//  MAIN LOOP
//-------------------------------------------------------------------------------------------


function draw() {
    update();
    drawBG();
    drawScene();

    requestAnimationFrame(draw);
}


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------


function update() {
    if (TWEEN) {
        TWEEN.update();
    }
}









