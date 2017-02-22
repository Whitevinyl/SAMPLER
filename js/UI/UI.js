
// Master object for the UI

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------


var dragCursor = new Alpha(0);


function MasterUI() {

}
var proto = MasterUI.prototype;


proto.setup = function() {
    this.resize();
    var pot, wave, keys, button;



    // SAMPLER PANEL //
    this.sampler = new Panel(dx - (this.body/2),0);

    pot = new Pot('Chance', 0, 99, 89);
    pot.place(this.sampler, 30*units, dy + (5*units),64);
    this.sampler.controls.push(pot);

    pot = new Pot('Depth', -20, 20, 14, true);
    pot.place(this.sampler, 120*units, dy + (5*units),64);
    this.sampler.controls.push(pot);

    wave = new WaveDisplay();
    wave.place(this.sampler, 0, 45*units);
    this.sampler.controls.push(wave);

    button = new BoxButton('New Sample',buttonEvent);
    button.place(this.sampler,this.body/2, dy - (40*units), 170, 40);
    this.sampler.controls.push(button);


    // KEYBOARD PANEL //
    this.keyboard = new Panel(dx - (this.body/2), fullY - (30*units));

    keys = new ScreenKeys();
    keys.place(this.keyboard,0, 0);
    this.keyboard.controls.push(keys);
};

function buttonEvent() {
    console.log('button');
}

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {
    conditionAlpha((potOver || activePot),dragCursor,5);
    primaryCol = color.blend(primaries[1], primaries[2],this.sampler.controls[0].value);

    this.sampler.update();
    this.keyboard.update();
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
    this.keyboard.draw(ctx, font);
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
    this.keyboard.click();
};


proto.drag = function() {
    this.sampler.drag();
    this.keyboard.drag();
};







