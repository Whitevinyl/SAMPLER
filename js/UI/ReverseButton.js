
// Icon  & label button

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

function Reverse(label,value) {
    this.label = label.toUpperCase();
    this.value = value;
}
var proto = Reverse.prototype;

//-------------------------------------------------------------------------------------------
//  POSITION
//-------------------------------------------------------------------------------------------

proto.place = function(parent,point) {
    this.parent = parent;
    this.relativePosition = new Point(point.x * units,point.y * units);
    this.position = combinePoints([this.parent.position,this.relativePosition]);
    this.size = new Point(80,80);
};

proto.resize = function(point) {
    if (point) {
        this.relativePosition = new Point(point.x * units,point.y * units);
        this.position = combinePoints([this.parent.position,this.relativePosition]);
    }
};


//-------------------------------------------------------------------------------------------
//  INTERACTION
//-------------------------------------------------------------------------------------------

proto.hitTest = function() {
    return hitTest(this.position.x - (this.size.x/2), this.position.y - (this.size.y/2), this.size.x, this.size.y);
};


proto.click = function() {
    if (this.hitTest()) {

        this.value = !this.value;

    }
};


proto.drag = function() {

};

//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {

};

//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

proto.draw = function(ctx,font) {
    var u = units;
    var x = this.position.x;
    var y = this.position.y;
    var ih = 9 * u;

    // MARKINGS //
    color.fill(ctx, textCol);
    color.stroke(ctx, textCol);
    ctx.textAlign = 'center';
    ctx.lineWidth = thinLine * u;


    // Label //
    setFont(ctx, font, dataType);
    ctx.fillText(this.label, x, y + (14*u) + (dataType * 0.3));


    if (this.value) {
        color.stroke(ctx,primaryCol);
    } else {
        color.stroke(ctx,textCol);
    }



    ctx.beginPath();

    ctx.moveTo(x - (ih*0.3), y - ih);
    ctx.lineTo(x - (ih*1.3), y);
    ctx.lineTo(x - (ih*0.3), y);

    ctx.moveTo(x + (ih*0.3), y);
    ctx.lineTo(x + (ih*1.3), y - ih);
    ctx.lineTo(x + (ih*0.3), y - ih);


    ctx.stroke();

};