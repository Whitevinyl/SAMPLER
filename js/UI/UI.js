
// Master object for the UI

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------


var wave;
var pots = [];
var dragCursor = new Alpha(0);

function MasterUI() {

}
var proto = MasterUI.prototype;


proto.setup = function() {
    this.resize();

    var pot;

    pot = new Pot('Chance', 0, 99, 50);
    pot.place(dx - (50*units), dy + (5*units),64);
    pots.push(pot);


    pot = new Pot('Depth', -20, 20, 0, true);
    pot.place(dx + (50*units), dy + (5*units),64);
    pots.push(pot);

    wave = new WaveDisplay();
    wave.place(dx - (this.body/2), 45*units);
};

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {
    conditionAlpha((potOver || activePot),dragCursor,5);

    var l = pots.length;
    for (var i=0; i<l; i++) {
        pots[i].update();
    }

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

proto.draw = function() {

};

//-------------------------------------------------------------------------------------------
//  RESIZE
//-------------------------------------------------------------------------------------------

proto.resize = function() {
    this.body = fullX * 0.85;
};



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

    ctx.lineWidth = 1.5 * u;
    color.stroke(ctx,primaryCol);

    ctx.beginPath();
    ctx.moveTo(x,y - size);
    ctx.lineTo(x + size,y);
    ctx.lineTo(x,y + size);
    ctx.lineTo(x - size,y);
    ctx.closePath();
    ctx.stroke();
};

