
// Audio waveform display

//-------------------------------------------------------------------------------------------
//  INIT
//-------------------------------------------------------------------------------------------

function WaveDisplay() {
    this.data = [[],[]];
}
var proto = WaveDisplay.prototype;


//-------------------------------------------------------------------------------------------
//  POSITION
//-------------------------------------------------------------------------------------------

proto.place = function(x,y) {
    this.position = new Point(x,y);
};

//-------------------------------------------------------------------------------------------
//  POPULATE
//-------------------------------------------------------------------------------------------

proto.populate = function(data) {

    // MONO OR STEREO //
    var mono = true;
    if (data.length === 2) {
        mono = false;
    }

    // GET LENGTH & SPACING //
    this.data = [[],[]];
    var i, h;
    var l = UI.body/3;
    var peak = 0;
    var jump;

    if (mono) {
        jump = (data.length-1)/l;
    } else {
        jump = (data[0].length-1)/l;
    }
    var steps = Math.min(jump,20);

    // LOOP & POPULATE DATA //
    for (i=0; i<l; i++) {

        var s = 0;
        var a = 0;
        var b = 0;
        var index = Math.floor(i * jump);

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


        this.data[0].push(a);
        this.data[1].push(b);
    }


    // NORMALISE //
    var norm = 1/peak;
    for (i=0; i<l; i++) {
        this.data[0][i] *= norm;
        this.data[1][i] *= norm;
    }
};


//-------------------------------------------------------------------------------------------
//  UPDATE
//-------------------------------------------------------------------------------------------

proto.update = function() {

};


//-------------------------------------------------------------------------------------------
//  DRAW
//-------------------------------------------------------------------------------------------

proto.draw = function(ctx) {
    var u = units;
    var h = 60 * u;
    var w = UI.body;
    var x = this.position.x;
    var y = this.position.y + h;
    var l = this.data[0].length;
    var i;

    /*color.stroke(ctx,primaryCol);
    ctx.beginPath();
    ctx.moveTo(x,y + (this.data[0] * h));
    for (var i=0; i<l; i++) {
        ctx.lineTo(x + i,y + (this.data[i] * h));
    }
    ctx.stroke();*/


    ctx.globalAlpha = 1;

    color.fill(ctx,secondaryCol);
    ctx.beginPath();
    ctx.moveTo(x,y);
    for (i=0; i<l; i++) {
        //ctx.fillRect(x + (2*i),y,2,-(this.data[1][i] * h));
        ctx.lineTo(x + (3*i), y - (this.data[1][i] * h));
    }
    ctx.lineTo(x + w, y);
    ctx.closePath();
    ctx.fill();

    color.fill(ctx,primaryCol);
    ctx.beginPath();
    ctx.moveTo(x,y);
    for (i=0; i<l; i++) {
        //ctx.fillRect(x + (2*i),y,2,-(this.data[0][i] * h));
        ctx.lineTo(x + (3*i), y + (this.data[1][i] * h));
    }
    ctx.lineTo(x + UI.body, y);
    ctx.closePath();
    ctx.fill();

    color.fill(ctx,highlightCol);
    ctx.globalAlpha = 0.1;
    ctx.fillRect(x + (w/2), y-h, w/5, h*2);
    ctx.globalAlpha = 1;
};

