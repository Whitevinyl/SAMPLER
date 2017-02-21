
// Master object for the UI

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------


//var wave;
var pots = [];
var dragCursor = new Alpha(0);

function MasterUI() {
    this.sampler = new Panel(0,0);
}
var proto = MasterUI.prototype;


proto.setup = function() {
    this.resize();

    var pot;

    pot = new Pot('Chance', 0, 99, 89);
    pot.place(this.sampler, dx - (50*units), dy + (5*units),64);
    this.sampler.controls.push(pot);


    pot = new Pot('Depth', -20, 20, 0, true);
    pot.place(this.sampler, dx + (50*units), dy + (5*units),64);
    this.sampler.controls.push(pot);

    var wave = new WaveDisplay();
    wave.place(this.sampler, dx - (this.body/2), 45*units);
    this.sampler.controls.push(wave);
};

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {
    conditionAlpha((potOver || activePot),dragCursor,5);

    /*var l = pots.length;
    for (var i=0; i<l; i++) {
        pots[i].update();
    }*/

    this.sampler.update();

    primaryCol = color.blend(primaries[1], primaries[2],this.sampler.controls[0].value);
};



function conditionAlpha(condition,alpha,speed) {
    if (condition) {
        if (alpha.a < 100) {
            alpha.a += speed;
        }
    } else {
        if (alpha.a > 0) {
            alpha.a -= speed;
        }
    }
}

//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

proto.draw = function(ctx, font) {
    this.sampler.draw(ctx, font);
};

//-------------------------------------------------------------------------------------------
//  RESIZE
//-------------------------------------------------------------------------------------------

proto.resize = function() {
    this.body = fullX * 0.85;
};

//-------------------------------------------------------------------------------------------
//  INTERACTION
//-------------------------------------------------------------------------------------------


proto.click = function() {
    this.sampler.click();
};


proto.drag = function() {
    this.sampler.drag();
};





// separate these out //
//v v v v v v v v v v //

//-------------------------------------------------------------------------------------------
//  HANDLE
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

function Handle(x,y) {
    this.position = new Point(x,y);
}
proto = Handle.prototype;

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {

};

//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

proto.draw = function(ctx) {
    var u = units;
    var size = 6 * u;
    var x = this.position.x;
    var y = this.position.y;

    ctx.lineWidth = lineWeight * u;
    color.stroke(ctx,primaryCol);

    ctx.beginPath();
    ctx.moveTo(x,y - size);
    ctx.lineTo(x + size,y);
    ctx.lineTo(x,y + size);
    ctx.lineTo(x - size,y);
    ctx.closePath();
    ctx.stroke();
};






//-------------------------------------------------------------------------------------------
//  PANEL
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

function Panel(x,y) {
    this.position = new Point(x,y);
    this.controls = [];
}
proto = Panel.prototype;

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {
    var l = this.controls.length;
    for (var i=0; i<l; i++) {
        this.controls[i].update();
    }
};

//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

proto.draw = function(ctx, font) {
    var l = this.controls.length;
    for (var i=0; i<l; i++) {
        this.controls[i].draw(ctx, font);
    }
};

//-------------------------------------------------------------------------------------------
//  INTERACTION
//-------------------------------------------------------------------------------------------

proto.hitTest = function() {
};


proto.click = function() {
    var l = this.controls.length;
    for (var i=0; i<l; i++) {
        if (this.controls[i].hitTest()) {
            this.controls[i].click();
        }
    }
};


proto.drag = function() {
    potOver = false;
    var l = this.controls.length;
    for (var i=0; i<l; i++) {
        if (this.controls[i].hitTest()) {
            potOver = true;
        }

        if (mouseIsDown) {
            this.controls[i].drag();
        }
    }
};