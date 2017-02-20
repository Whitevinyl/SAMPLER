
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
    pot.place(dx - (50*units), dy,66);
    pots.push(pot);


    pot = new Pot('Depth', 0, 99, 50);
    pot.place(dx + (50*units), dy,66);
    pots.push(pot);

    wave = new WaveDisplay();
    wave.place(dx - (this.body/2), 40*units);
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