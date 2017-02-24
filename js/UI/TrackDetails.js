
// Track name and creator text

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

function TrackDetails(title,creator) {
    this.title = "'" + title.toUpperCase() + "'";
    this.creator = creator;
}
var proto = TrackDetails.prototype;


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
    return false;
};


proto.click = function() {

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
    color.fill(ctx, textCol);
    ctx.textAlign = 'center';


    // Label //
    setFont(ctx, font, bodyType);
    ctx.fillText(this.title, x, y);
    setFont(ctx, font, bodyType,400,'italic');
    ctx.fillText(this.creator, x, y + (bodyType*1.6));

};