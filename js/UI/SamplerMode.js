
// Mode select for the sampler (one shot | looping | granular)

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

function SamplerMode(labels,value) {
    this.labels = labels;
    this.value = value;
}
var proto = SamplerMode.prototype;


//-------------------------------------------------------------------------------------------
//  POSITION
//-------------------------------------------------------------------------------------------

proto.place = function(parent,point) {
    this.parent = parent;
    this.relativePosition = new Point(point.x * units,point.y * units);
    this.position = combinePoints([this.parent.position,this.relativePosition]);
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
    var w = 150 * units;
    var h = 200 * units;
    return hitTest(this.position.x, this.position.y - (h/2), w, h);
};


proto.click = function() {
    if (this.hitTest()) {
        //
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


    // MARKINGS //
    color.fill(ctx,textCol);
    color.stroke(ctx,textCol);
    ctx.textAlign = 'left';


    // Label //
    setFont(ctx,font,bodyType,400,'italic');
    var fontOff = bodyType * 0.3;
    ctx.fillText(this.labels[0],x,y + fontOff - (bodyType * 1.5));
    ctx.fillText(this.labels[1],x,y + fontOff);
    ctx.fillText(this.labels[2],x,y + fontOff + (bodyType * 1.5));

};


