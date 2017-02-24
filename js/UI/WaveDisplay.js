
// Audio waveform display

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

var division = 1.6;

function WaveDisplay() {
    this.data = [[],[]];
    this.duration = 0;
    this.start = 10;
    this.end = 100;
    this.loopStart = 50;
    this.loopEnd = 75;
}
var proto = WaveDisplay.prototype;


//-------------------------------------------------------------------------------------------
//  POSITION
//-------------------------------------------------------------------------------------------

proto.place = function(parent,point) {
    this.parent = parent;
    this.relativePosition = new Point(point.x * units,point.y * units);
    this.position = combinePoints([this.parent.position,this.relativePosition]);

    var handleX = 0;
    var handleY = - (6*units);
    var perc = UI.body/100;
    this.handles = [];
    this.handles.push(new Handle(this,handleX + (this.start * perc), handleY, 12, 'x'));
    this.handles.push(new Handle(this,handleX + (this.loopStart * perc), handleY, 12, 'x'));
    this.handles.push(new Handle(this,handleX + (this.loopEnd * perc), handleY, 12, 'x'));
};

proto.resize = function(point) {
    if (point) {
        this.relativePosition = new Point(point.x * units,point.y * units);
        this.position = combinePoints([this.parent.position,this.relativePosition]);
    }
    this.populate(this.parent.wave,this.parent.duration);

    var handleX = 0;
    var handleY = - (6*units);
    var perc = UI.body/100;
    this.handles[0].resize(handleX + (this.start * perc), handleY);
    this.handles[1].resize(handleX + (this.loopStart * perc), handleY);
    this.handles[2].resize(handleX + (this.loopEnd * perc), handleY);

};

//-------------------------------------------------------------------------------------------
//  POPULATE
//-------------------------------------------------------------------------------------------

proto.populate = function(data, duration) {

    this.parent.wave = data;
    this.parent.duration = duration;

    // MONO OR STEREO //
    var mono = true;
    if (data.length === 2) {
        mono = false;
    }

    // GET LENGTH & SPACING //
    this.data = [[],[]];
    this.duration = secondsToMinutes(duration);
    var i, h;
    var l = UI.body/division;
    var peak = 0;
    var jump;

    if (mono) {
        jump = (data.length-1)/l;
    } else {
        jump = (data[0].length-1)/l;
    }
    var steps = Math.min(jump,50);


    // LOOP & POPULATE DATA //
    for (i=0; i<l; i++) {

        var s = 0;
        var a = 0;
        var b = 0;
        var index = Math.floor(i * jump);

        // check multpile steps between jumps for greater accuracy //
        for (h=0; h<steps; h++) {

            var step = Math.floor((jump/steps))* h;
            if (mono) {
                if (data[index + step]) {
                    s = data[index + step];
                }
            }
            else {
                if (data[0][index + step]) {
                    s = Math.max(data[0][index + step] + data[1][index + step]);
                }
            }

            if (s > 0 && s > a) {
                a = s;
            }
            if (s < 0 && s < b) {
                b = s;
            }

            if (Math.abs(s) > peak) {
                peak = Math.abs(s);
            }
        }

        // push highs & lows //
        this.data[0].push(a);
        this.data[1].push(b);
    }


    // NORMALISE //
    if (peak > 0.1) { // maybe scale norm strength based on level
        var norm = 1/peak;
        for (i=0; i<l; i++) {
            this.data[0][i] *= norm;
            this.data[1][i] *= norm;
        }
    }
};


//-------------------------------------------------------------------------------------------
//  INTERACTION
//-------------------------------------------------------------------------------------------

proto.hitTest = function() {
    var size = 10;
    return hitTest(this.position.x, this.position.y, size, size);
};


proto.click = function() {
    var l = this.handles.length;
    for (var i=0; i<l; i++) {
        if (this.handles[i].hitTest()) {
            this.handles[i].click();
        }
    }
};


proto.drag = function() {
    if (mouseIsDown) {
        var l = this.handles.length;
        for (var i=0; i<l; i++) {
            this.handles[i].drag();
        }


        // boundaries //
        if (this.handles[0] != activeHandle && this.handles[0].position.x > this.handles[1].position.x) {
            this.handles[0].position.x = this.handles[1].position.x;
        }
        if (this.handles[1] != activeHandle && this.handles[1].position.x < this.handles[0].position.x) {
            this.handles[1].position.x = this.handles[0].position.x;
        }
        if (this.handles[2] != activeHandle && this.handles[2].position.x <= this.handles[1].position.x) {
            this.handles[2].position.x = this.handles[1].position.x + 2;
        }
        if (this.handles[1] != activeHandle && this.handles[1].position.x >= this.handles[2].position.x) {
            this.handles[1].position.x = this.handles[2].position.x - 2;
        }

        this.handles[0].position.x = valueInRange(this.handles[0].position.x, this.position.x, this.position.x + UI.body);
        this.handles[1].position.x = valueInRange(this.handles[1].position.x, this.position.x, this.position.x + UI.body - 2);
        this.handles[2].position.x = valueInRange(this.handles[2].position.x, this.position.x, this.position.x + UI.body);



        // settings //
        var perc = UI.body/100;
        this.start = this.handles[0].relativePosition.x / perc;
        this.loopStart = this.handles[1].relativePosition.x / perc;
        this.loopEnd = this.handles[2].relativePosition.x / perc;
    }
};


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {

    // handles //
    var l = this.handles.length;
    for (var i=0; i<l; i++) {
        this.handles[i].update();
    }
};


//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

proto.draw = function(ctx,font) {
    var u = units;
    var h = 50 * u;
    var w = UI.body;
    var perc = w/100;
    var x = this.position.x;
    var y = this.position.y + h;
    var l = this.data[0].length;
    var i;



    ctx.globalAlpha = 1;
    ctx.lineWidth = thickLine * u;

    // STYLE A //
    /*color.fill(ctx,secondaryCol);
    for (i=0; i<l; i++) {
        ctx.fillRect(x + (division*i),y,division,-(this.data[1][i] * h));
    }

    color.fill(ctx,primaryCol);
    for (i=0; i<l; i++) {
        ctx.fillRect(x + (division*i),y,division,-(this.data[0][i] * h));
    }*/



    // STYLE B //
    color.fill(ctx,secondaryCol);
    ctx.beginPath();
    ctx.moveTo(x,y);
    for (i=0; i<l; i++) {
        ctx.lineTo(x + (division*i), y - (this.data[1][i] * h));
    }
    ctx.lineTo(x + w, y);
    ctx.closePath();
    ctx.fill();

    color.fill(ctx,primaryCol);
    ctx.beginPath();
    ctx.moveTo(x,y);
    for (i=0; i<l; i++) {
        ctx.lineTo(x + (division*i), y + (this.data[1][i] * h));
    }
    ctx.lineTo(x + w, y);
    ctx.closePath();
    ctx.fill();


    /*var st = this.start * perc;
    var ls = this.loopStart * perc;
    var le = this.loopEnd * perc;*/

    var st = this.handles[0].displayPosition.x - this.position.x;
    var ls = this.handles[1].displayPosition.x - this.position.x;
    var le = this.handles[2].displayPosition.x - this.position.x;


    //darken //
    color.fill(ctx,bgCols[0]);
    ctx.globalAlpha = 0.7;
    ctx.fillRect(x, y-h, st, h*2);
    ctx.fillRect(x + le, y-h, w - le, h*2);



    // highlight //
    color.fill(ctx,highlightCol);
    color.stroke(ctx,highlightCol);
    ctx.globalAlpha = 0.1;
    ctx.fillRect(x + ls, y-h, le - ls, h*2);

    ctx.beginPath();
    ctx.moveTo(x + st, y - h);
    ctx.lineTo(x + st, y + h);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // handles //
    l = this.handles.length;
    for (i=0; i<l; i++) {
        this.handles[i].draw(ctx);
    }


    // MARKINGS //
    color.fill(ctx,textCol);
    color.stroke(ctx,textCol);
    ctx.textAlign = 'center';
    setFont(ctx,font,dataType);



    // marker nodes //
    y = this.position.y - (12*u);
    ctx.fillText('START',x + st,y - (6*u));
    ctx.fillText('LOOP',x + ls + ((le - ls)/2),y - (6*u));

    ctx.beginPath();
    ctx.moveTo(x + ls + ((le - ls)/2) - (7*u), y + (3*u));
    ctx.lineTo(x + ls + ((le - ls)/2) + (7*u), y + (3*u));
    ctx.stroke();


    // duration //
    y = this.position.y + (h*1.5) + (dataType * 0.3);
    ctx.fillText(this.duration,x + w - (20*u),y);
    ctx.beginPath();
    ctx.moveTo(x + w - (20*u) - (7*u), y + (h/4));
    ctx.lineTo(x + w - (20*u) + (7*u), y + (h/4));
    ctx.stroke();
};

