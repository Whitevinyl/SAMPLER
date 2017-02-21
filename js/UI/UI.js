
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

function Handle(parent,x,y,size,mode) {
    this.parent = parent;
    this.relativePosition = new Point(x,y);
    this.position = combinePoints([this.parent.position,this.relativePosition]);
    this.size = size;
    this.mode = mode;
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
    var size = (this.size/2) * u;
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
//  INTERACTION
//-------------------------------------------------------------------------------------------

proto.hitTest = function() {
    var size = (this.size * units) * 2;
    return hitTest(this.position.x - (size/2), this.position.y - (size/2), size, size);
};


proto.click = function() {
    activeHandle = this;
};


proto.drag = function() {
    if (activeHandle === this) {
        switch (this.mode) {

            case 'x':
                this.relativePosition.x = mouseX - this.parent.position.x;
                break;

            case 'y':
                this.relativePosition.y = mouseY - this.parent.position.y;
                break;

            case 'xy':
                this.relativePosition.x = mouseX - this.parent.position.x;
                this.relativePosition.y = mouseY - this.parent.position.y;
                break;
        }
        this.position = combinePoints([this.parent.position,this.relativePosition]);
    }
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
        this.controls[i].click();
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