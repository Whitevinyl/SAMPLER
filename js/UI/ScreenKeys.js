
// An onscreen keyboard

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

function ScreenKeys(x,y) {
    this.position = new Point(x,y);
}
proto = ScreenKeys.prototype;

//-------------------------------------------------------------------------------------------
//  POSITION
//-------------------------------------------------------------------------------------------


proto.place = function(parent,x,y) {
    this.parent = parent;
    this.relativePosition = new Point(x,y);
    this.position = combinePoints([this.parent.position,this.relativePosition]);
};

proto.resize = function() {

};


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {

};

//-------------------------------------------------------------------------------------------
//  INTERACTION
//-------------------------------------------------------------------------------------------

proto.hitTest = function() {
    return hitTest(this.position.x, this.position.y, 1, 1);
};


proto.click = function() {
};


proto.drag = function() {

};

//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

proto.draw = function(ctx, font) {
    var u = units;
    var x = this.position.x;
    var y = this.position.y;
    var w = UI.body;
    var h = (30 * u);
    var i;

    var whiteWidth = w/15;
    var blackWidth = whiteWidth * 0.65;

    var bL = -blackWidth*0.68;
    var bM = -blackWidth*0.5;
    var bR = -blackWidth*0.32;

    var blackOffset = [
        0, bL, bR, 0, bL, bM, bR,
        0, bL, bR, 0, bL, bM, bR, 0, 0
    ];

    color.stroke(ctx,textCol);
    ctx.lineWidth = thinLine * u;


    // WHITE KEYS //
    ctx.beginPath();
    for (i=0; i<=15; i++) {
        var ks = 0;
        if (i!=0 && i!=3 && i!=7 && i!=10 && i!=14 && i!=15) {
            ks = h/2;
        }
        ctx.moveTo(x + (whiteWidth * i), y + ks);
        ctx.lineTo(x + (whiteWidth * i), y + h);
    }
    ctx.stroke();


    // BLACK KEYS //
    for (i=0; i<=15; i++) {
        if (i!=0 && i!=3 && i!=7 && i!=10 && i!=14 && i!=15) {
            var kx = x + (whiteWidth * i) + blackOffset[i];
            ctx.beginPath();
            ctx.moveTo(kx, y);
            ctx.lineTo(kx, y + (h/2));
            ctx.lineTo(kx + blackWidth, y + (h/2));
            ctx.lineTo(kx + blackWidth, y);
            ctx.stroke();
        }
    }

};

