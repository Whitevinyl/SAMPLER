
// Master object for the UI

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------


var pot, wave;
var dragCursor = new Alpha(0);

function MasterUI() {

}
var proto = MasterUI.prototype;


proto.setup = function() {
    this.resize();

    pot = new Pot('Division', 0.1, 20, 1);
    pot.place(dx, dy,66);

    wave = new WaveDisplay();
    wave.place(dx - (this.body/2), 40*units);
};

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {

    conditionAlpha((potOver || activePot),dragCursor,5);
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