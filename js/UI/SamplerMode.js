
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
    this.size = new Point(150,150);
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
    return hitTest(this.position.x - (5*units), this.position.y - (this.size.y/2) - (5*units), this.size.x, this.size.y);
};


proto.click = function() {
    if (this.hitTest()) {

        var sy = this.position.y - (this.size.y/2);
        var thirdY = this.size.y/3;

        if (mouseY < (sy + thirdY)) {
            this.value = 0;
            colorToColor(primaryCol,primaries[2],0.4);
        }
        else if (mouseY > (sy + (thirdY * 2))) {
            this.value = 2;
            colorToColor(primaryCol,primaries[0],0.4);
        }
        else {
            this.value = 1;
            colorToColor(primaryCol,primaries[1],0.4);
        }

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
    var margin = 30 * u;


    // MARKINGS //
    color.fill(ctx,textCol);
    color.stroke(ctx,textCol);
    ctx.textAlign = 'left';
    ctx.lineWidth = thinLine * u;


    // Label //
    setFont(ctx,font,bodyType,400,'italic');
    var fontOff = bodyType * 0.3;
    var vSpace = bodyType * 2.7;
    ctx.fillText(this.labels[0], x + margin, y + fontOff - vSpace);
    ctx.fillText(this.labels[1], x + margin, y + fontOff);
    ctx.fillText(this.labels[2], x + margin, y + fontOff + vSpace);


    var ih = 9 * u;


    if (this.value === 0) {
        color.stroke(ctx,primaryCol);
    } else {
        color.stroke(ctx,textCol);
    }
    ctx.beginPath();
    ctx.moveTo(x     ,     y - vSpace + (ih/2));
    ctx.lineTo(x + ih,     y - vSpace - (ih/2));
    ctx.lineTo(x + ih,     y - vSpace + (ih/2));
    ctx.lineTo(x + (ih*2), y - vSpace - (ih/2));
    ctx.stroke();


    if (this.value === 1) {
        color.stroke(ctx,primaryCol);
    } else {
        color.stroke(ctx,textCol);
    }
    ctx.beginPath();
    ctx.moveTo(x + ih,     y - (ih/2));
    ctx.lineTo(x + (ih*2), y - (ih/2));
    ctx.lineTo(x + ih,     y + (ih/2));
    ctx.lineTo(x     ,     y - (ih/2));
    ctx.stroke();


    if (this.value === 2) {
        color.stroke(ctx,primaryCol);
    } else {
        color.stroke(ctx,textCol);
    }
    ctx.beginPath();
    ctx.moveTo(x     ,     y + vSpace + (ih/2));
    ctx.lineTo(x + ih,     y + vSpace - (ih/2));
    ctx.moveTo(x + ih,     y + vSpace + (ih/2));
    ctx.lineTo(x + (ih*2), y + vSpace - (ih/2));
    ctx.stroke();


};


