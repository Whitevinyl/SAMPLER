
// A panel object wraps all the controls/interface for each module

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
