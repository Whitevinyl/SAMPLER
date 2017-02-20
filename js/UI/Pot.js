
// A generic dial/knob for UI settings

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

var ringWidth = 5;
var sensitivity = 120;
var fullAngle = TAU * 0.75;
var originAngle = (TAU / 4);
var negativeAngle = TAU - fullAngle;
var startAngle = (TAU / 4) + (negativeAngle/2);


function Pot(label,min,max,value,center) {
    this.label   = arg(label,'').toUpperCase();
    this.min     = arg(min,  0);
    this.max     = arg(max,  99);
    this.value   = arg(value,50);
    this.value   = valueInRange(value,min,max);
    this.display = min;

    this.range = this.max - this.min;

    this.center  = 0;
    if (center) {
        this.center = fullAngle/2;
        this.display = min + (this.range/2);
    }



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
//  INTERACTION
//-------------------------------------------------------------------------------------------

proto.hitTest = function() {
    var size = (this.size * units) * 1.2;
    return hitTest(this.position.x - (size/2), this.position.y - (size/2), size, size);
};


proto.click = function() {
    activePot = this;
    this.drag();
};


proto.drag = function() {
    if (activePot === this) {

        // get cursor angle and make relative of origin //
        var cursorAngle = angleFromVector( new Vector(mouseX - this.position.x, mouseY - this.position.y) );
        cursorAngle -= originAngle;
        if (cursorAngle < 0) {
            cursorAngle += TAU; // keep angle positive
        }

        // get norm from angle //
        var norm = (cursorAngle - (negativeAngle/2)) / fullAngle;
        norm = valueInRange(norm,0,1);

        // snapping //
        if (this.center && isInRange(norm, 0.49, 0.51)) {
            norm = 0.5;
        }

        // set value from norm //
        this.value = this.min + (this.range * norm);
    }
};


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {
    this.display = lerp(this.display,this.value,22);
};


proto.normal = function() {
    return (this.display - this.min) / this.range;
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
        valOffset = -(midType * 0.15); // ignore minus sign for centering
    }
    var width = ringWidth * u;
    var fillAngle = fullAngle * this.normal();



    // POT RINGS //

    // BG Ring //
    color.fill(ctx,secondaryCol);
    ctx.beginPath();
    ctx.arc(x,y,rad, startAngle, startAngle + fullAngle);
    ctx.arc(x,y,rad - width, startAngle + fullAngle, startAngle, true);
    ctx.closePath();
    ctx.fill();


    // Foreground Ring //
    color.fill(ctx,primaryCol);
    if (activePot === this) color.fill(ctx,textCol);
    ctx.beginPath();
    ctx.arc(x,y,rad, startAngle + this.center, startAngle + fillAngle, (startAngle + fillAngle)<(startAngle + this.center));
    ctx.arc(x,y,rad - width, startAngle + fillAngle, startAngle + this.center, !((startAngle + fillAngle)<(startAngle + this.center)));
    ctx.closePath();
    ctx.fill();




    // MARKINGS //
    color.fill(ctx,textCol);
    color.stroke(ctx,textCol);
    ctx.textAlign = 'center';

    // Value //
    setFont(ctx,font,midType,300);
    ctx.fillText(''+roundVal,x + valOffset,y + (midType * 0.32));

    // Label //
    setFont(ctx,font,dataType);
    ctx.fillText(this.label,x,y + rad + (2*u));

    // Center mark //
    if (this.center) {
        ctx.lineWidth = 1.5 * u;
        ctx.beginPath();
        ctx.moveTo(x,y - rad);
        ctx.lineTo(x,y - rad + width);
        ctx.stroke();
    }
};

