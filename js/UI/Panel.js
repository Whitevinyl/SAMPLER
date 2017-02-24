
// A panel object wraps all the controls/interface for each module

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

function Panel(x,y) {
    this.position = new Point(x,y);
    this.controls = [];
    this.controlPositions = [];
    this.wave = null;
    this.duration = 0;
}
proto = Panel.prototype;

//-------------------------------------------------------------------------------------------
//  POSITION
//-------------------------------------------------------------------------------------------

proto.resize = function(x,y) {

    if (x) {
        this.position.x = x;
    }
    if (y) {
        this.position.y = y;
    }

    var l = this.controls.length;
    for (var i=0; i<l; i++) {
        this.controls[i].resize(this.controlPositions[i]);
    }
};

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
    //potOver = false;
    var l = this.controls.length;
    for (var i=0; i<l; i++) {
        /*if (this.controls[i].hitTest()) {
            potOver = true;
        }*/

        if (mouseIsDown) {
            this.controls[i].drag();
        }
    }
};
