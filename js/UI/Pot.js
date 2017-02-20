
// A generic dial/knob for UI settings

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

var ringWidth = 5;
var sensitivity = 120;
var startAngle = TAU * 0.375;
var fullAngle = TAU * 0.75;

function Pot(label,min,max,value) {
    this.label = arg(label,'').toUpperCase();
    this.min   = arg(min,  0);
    this.max   = arg(max,  99);
    this.value = arg(value,50);
    this.value = valueInRange(value,min,max);

    this.range = this.max - this.min;
    this.lastNormal = 0;
    this.clickX = 0;
}
var proto = Pot.prototype;


//-------------------------------------------------------------------------------------------
//  POSITION
//-------------------------------------------------------------------------------------------

proto.place = function(x,y,size) {
    this.position = new Point(x,y);
    this.size     = arg(size,65);
};


//-------------------------------------------------------------------------------------------
//  HIT TEST
//-------------------------------------------------------------------------------------------

proto.hitTest = function() {
    var size = (this.size * units) * 1.2;
    return hitTest(this.position.x - (size/2), this.position.y - (size/2), size, size);
};


proto.click = function() {
    activePot = this;
    this.lastNormal = this.normal();
    this.clickX = mouseX;
};


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {

    if (activePot === this) {
        var norm = this.lastNormal + ((mouseX - this.clickX) / (sensitivity*units));
        norm = valueInRange(norm,0,1);
        this.value = this.min + (this.range * norm);
        //var v = this.value * 2;
        //color.master.R = v; // temp
        //color.master.G = v; // temp
        //color.master.B = v; // temp
    }
};

proto.normal = function() {
    return (this.value - this.min) / this.range;
};


//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

proto.draw = function(ctx,font) {
    var u = units;
    var size = this.size * u;
    var rad = size/2;
    var x = this.position.x;
    var y = this.position.y;
    var valOffset = 0;
    var roundVal = Math.round(this.value);
    if (roundVal < 0) {
        valOffset = -(midType * 0.15);
    }


    // TEXT //
    color.fill(ctx,textCol);
    ctx.textAlign = 'center';

    // Value //
    setFont(ctx,font,midType,300);
    ctx.fillText(roundVal,x + valOffset,y + (midType * 0.32));

    // Label //
    setFont(ctx,font,dataType);
    ctx.fillText(this.label,x,y + rad + (2*u));




    // POT RINGS //
    var width = ringWidth * u;
    var fillAngle = fullAngle * this.normal();

    // BG Ring //
    color.fill(ctx,secondaryCol);
    ctx.beginPath();
    ctx.arc(x,y,rad, startAngle + fillAngle, startAngle + fullAngle);
    ctx.arc(x,y,rad - width, startAngle + fullAngle, startAngle + fillAngle,true);
    ctx.closePath();
    ctx.fill();


    // Foreground Ring //
    color.fill(ctx,primaryCol);
    if (activePot === this) color.fill(ctx,textCol);
    ctx.beginPath();
    ctx.arc(x,y,rad, startAngle,startAngle + fillAngle);
    ctx.arc(x,y,rad - width, startAngle + fillAngle, startAngle,true);
    ctx.closePath();
    ctx.fill();
};

