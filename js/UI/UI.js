
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
    var pos, pot, wave, keys, button, data;
    var u = units;

    var dxu = dx/u;
    var dyu = dy/u;
    var bu  = this.body/u;


    // SAMPLER PANEL //
    this.sampler = new Panel(dx - (this.body/2),0);
    pos = [
        new Point((bu/2) - 150, dyu - 14),
        new Point((bu/2) + 150, dyu - 14),
        new Point(   0, 45),
        new Point(bu/2, dyu - 45),
        new Point(0, dyu - 10.5),
        new Point(122, dyu + 3.5),
        new Point(bu/2, dyu + 3.5)
    ];
    this.sampler.controlPositions = pos;

    pot = new Pot('Rate', 0, 99, 50);
    pot.place(this.sampler, pos[0],62);
    this.sampler.controls.push(pot);

    pot = new Pot('Glitch', 0, 99, 0);
    pot.place(this.sampler, pos[1],62);
    this.sampler.controls.push(pot);

    wave = new WaveDisplay();
    wave.place(this.sampler, pos[2]);
    this.sampler.controls.push(wave);

    button = new BoxButton('New Sample',buttonEvent);
    button.place(this.sampler,pos[3], 165, 35);
    this.sampler.controls.push(button);

    button = new SamplerMode(['One Shot', 'Looping', 'Granular'],0);
    button.place(this.sampler,pos[4]);
    this.sampler.controls.push(button);

    button = new Reverse('Reverse',false);
    button.place(this.sampler,pos[5]);
    this.sampler.controls.push(button);

    data = new TrackDetails('Spectral Digits','Procedurally Generated');
    data.place(this.sampler,pos[6]);
    this.sampler.controls.push(data);


    // KEYBOARD PANEL //
    this.keyboard = new Panel(dx - (this.body/2), fullY - (30*units));
    pos = [
        new Point(0,0)
    ];
    this.keyboard.controlPositions = pos;

    keys = new ScreenKeys();
    keys.place(this.keyboard,pos[0]);
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
    //primaryCol = color.blend(primaries[1], primaries[2],this.sampler.controls[0].value);

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
    this.body = 700 * units;
    if (this.sampler) {
        this.sampler.resize(dx - (this.body/2),0);
        this.keyboard.resize(dx - (this.body/2), fullY - (30*units));
    }

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







