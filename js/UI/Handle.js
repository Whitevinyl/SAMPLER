
// A draggable handle node for envelope, EQ & waveform settings

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

function Handle(parent,x,y,size,mode) {
    this.parent = parent;
    this.relativePosition = new Point(x,y);
    this.position = combinePoints([this.parent.position,this.relativePosition]);
    this.displayPosition = new Point(this.position.x,this.position.y);
    this.size = size;
    this.mode = mode;
}
proto = Handle.prototype;


//-------------------------------------------------------------------------------------------
//  POSITION
//-------------------------------------------------------------------------------------------

proto.resize = function(x,y) {
    this.relativePosition = new Point(x,y);
    this.position = combinePoints([this.parent.position,this.relativePosition]);
};


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {
    this.displayPosition.x = lerp(this.displayPosition.x,this.position.x,30);
    this.displayPosition.y = lerp(this.displayPosition.y,this.position.y,30);
};


//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

proto.draw = function(ctx) {
    var u = units;
    var size = (this.size/2) * u;
    var x = this.displayPosition.x;
    var y = this.displayPosition.y;

    ctx.lineWidth = thickLine * u;
    color.stroke(ctx,primaryCol);

    ctx.beginPath();
    ctx.moveTo(x,y - size);
    ctx.lineTo(x + size,y);
    ctx.lineTo(x,y + size);
    ctx.lineTo(x - size,y);
    ctx.closePath();
    ctx.stroke();
};


//-------------------------------------------------------------------------------------------
//  INTERACTION
//-------------------------------------------------------------------------------------------

proto.hitTest = function() {
    var size = (this.size * units) * 2;
    return hitTest(this.position.x - (size/2), this.position.y - (size/2), size, size);
};


proto.click = function() {
    activeHandle = this;
};


proto.drag = function() {
    if (activeHandle === this) {
        switch (this.mode) {

            case 'x':
                this.relativePosition.x = mouseX - this.parent.position.x;
                break;

            case 'y':
                this.relativePosition.y = mouseY - this.parent.position.y;
                break;

            case 'xy':
                this.relativePosition.x = mouseX - this.parent.position.x;
                this.relativePosition.y = mouseY - this.parent.position.y;
                break;
        }
        this.position = combinePoints([this.parent.position,this.relativePosition]);
    }
};

