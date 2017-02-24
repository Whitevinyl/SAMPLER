
// A generic large button UI settings

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

function BoxButton(label,event) {
    this.label = arg(label, '').toUpperCase();
    this.event = event;
}
var proto = BoxButton.prototype;

//-------------------------------------------------------------------------------------------
//  POSITION
//-------------------------------------------------------------------------------------------


proto.place = function(parent,point,w,h) {
    this.parent = parent;
    this.relativePosition = new Point(point.x * units,point.y * units);
    this.position = combinePoints([this.parent.position,this.relativePosition]);
    this.size = new Point(w,h);
};

proto.resize = function(point) {
    if (point) {
        this.relativePosition = new Point(point.x * units,point.y * units);
        this.position = combinePoints([this.parent.position,this.relativePosition]);
    }
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
    var sizeX = this.size.x * units;
    var sizeY = this.size.y * units;
    return hitTest(this.position.x - (sizeX/2), this.position.y - (sizeY/2), sizeX, sizeY);
};


proto.click = function() {
    if (this.hitTest()) {
        this.event();
    }
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
    var w = this.size.x * u;
    var h = this.size.y * u;
    var hw = w/2;
    var hh = h/2;


    // OUTLINE //
    color.stroke(ctx,primaryCol);
    ctx.lineWidth = thickLine * u;
    ctx.beginPath();
    ctx.moveTo(x - hw, y - hh);
    ctx.lineTo(x - hw, y + hh);
    ctx.lineTo(x + hw, y + hh);
    ctx.lineTo(x + hw, y - hh);
    ctx.stroke();


    // MARKINGS //
    color.fill(ctx,textCol);
    color.stroke(ctx,textCol);
    ctx.textAlign = 'center';

    // label //
    setFont(ctx,font,bodyType,300);
    ctx.fillText(this.label,x,y + (bodyType * 0.32));

    // arrow //
    var as = 6*u;
    var ao = (w*0.365);
    ctx.beginPath();
    ctx.moveTo(x - ao - as, y - (as/2));
    ctx.lineTo(x - ao, y + (as/2));
    ctx.lineTo(x - ao + as, y - (as/2));
    ctx.stroke();

};




