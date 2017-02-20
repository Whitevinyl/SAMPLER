



function setupDrawing() {

}



//-------------------------------------------------------------------------------------------
//  BG
//-------------------------------------------------------------------------------------------


function drawBG() {
    ctx[0].globalAlpha = 1;
    color.fill(ctx[0],bgCols[0]);
    ctx[0].fillRect(0,0,fullX,fullY);
}


//-------------------------------------------------------------------------------------------
//  FOREGROUND
//-------------------------------------------------------------------------------------------


function drawScene() {
    var u = units;
    var font = "Open Sans";
    var ct = ctx[0];



    color.fill(ct,textCol);
    ct.textAlign = 'center';
    setFont(ct,font,bodyType);


    pot.draw(ct,font);
    wave.draw(ct);


    color.stroke(ct,textCol);
    ct.lineWidth = 1.5 * u;
    drawDragCursor(ct,mouseX,mouseY,(12 * (dragCursor.a/100)) * u);
}



//-------------------------------------------------------------------------------------------
//  DRAW FUNCTIONS
//-------------------------------------------------------------------------------------------


function setFont(ctx,font,size,weight,style) {
    font   = arg(font, 'Helvetica, sans-serif');
    size   = arg(size, 16);
    weight = arg(weight, 400);
    style  = arg(style, '');

    var fontStyle = '' + weight + ' ';
    if (style !== '') fontStyle += style + ' ';
    fontStyle += size + 'px ' + font;

    ctx.font = fontStyle;
}


function spacedText(ctx,string,x,y,spacing) {

    var chars = string.length;
    var fullWidth = (chars-1) * spacing;
    var charList = [];
    var charWidths = [];
    for (var i=0; i<chars; i++) {
        var c = string.substr(i, 1);
        var w = ctx.measureText(c).width;
        charList.push (c);
        charWidths.push(w);
        fullWidth += w;
    }

    x -= fullWidth/2;

    for (i=0; i<chars; i++) {
        ctx.fillText(charList[i], x, y);
        x += (spacing + charWidths[i]);
    }
}


function drawPlay(ct,x,y,w,h) {
    ct.beginPath();
    ct.moveTo(x - (w/2), y - (h/2));
    ct.lineTo(x - (w/2), y + (h/2));
    ct.lineTo(x + (w/2), y);
    ct.closePath();
    ct.fill();
}

function drawPause(ct,x,y,w,h) {
    ct.fillRect(x - (w*0.45), y - (h/2), w*0.25, h);
    ct.fillRect(x + (w*0.2), y - (h/2), w*0.25, h);
}

function drawHamburger(ct,x,y,w,h,t) {
    ct.fillRect(x - (w/2), y - (h/2), w, t);
    ct.fillRect(x - (w/2), y - (t/2), w, t);
    ct.fillRect(x - (w/2), y + (h/2) - t, w, t);
}

function drawDragCursor(ct,x,y,s) {
    ct.beginPath();
    ct.moveTo(x + s - (s/4), y - (s/2));
    ct.lineTo(x + s + (s/4), y);
    ct.lineTo(x + s - (s/4), y + (s/2));

    ct.moveTo(x - s + (s/4), y - (s/2));
    ct.lineTo(x - s - (s/4), y);
    ct.lineTo(x - s + (s/4), y + (s/2));
    ct.stroke();
}



//-------------------------------------------------------------------------------------------
//  EFFECTS
//-------------------------------------------------------------------------------------------


