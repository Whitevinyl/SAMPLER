
// generic canvas functions, common objects & conversions.

//-------------------------------------------------------------------------------------------
//  SETTINGS
//-------------------------------------------------------------------------------------------

var TAU = 2 * Math.PI;

//-------------------------------------------------------------------------------------------
//  FUNCTIONS
//-------------------------------------------------------------------------------------------


// IS CURSOR WITHIN GIVEN BOUNDARIES //
function hitTest(x,y,w,h) {
    var mx = mouseX;
    var my = mouseY;
    return (mx>x && mx<(x+w) && my>y && my<(y+h));
}


// LOCK A VALUE WITHIN GIVEN RANGE //
function valueInRange(value,floor,ceiling) {
    if (value < floor) {
        value = floor;
    }
    if (value> ceiling) {
        value = ceiling;
    }
    return value;
}


// CHECK IF IN A RANGE /
function isInRange(value,min,max) {
    return ((value > min) && (value < max));
}


// LERP TWEEN / EASE //
function lerp(current,destination,speed) {
    return current + (((destination-current)/100) * speed);
}


// CHECK ARGUMENTS ARE GOOD //
function arg(a,b) {
    if (a !== undefined || null) {
        return a;
    } else {
        return b;
    }
}


// IS VAL A NEAR TO VAL B //
function near(a,b,factor) {
    return Math.round(a/factor) == Math.round(b/factor);
}


// MAX DECIMAL PLACES //
function decimalRound(n,places) {
    var p = Math.pow(10,places);
    return Math.round(n * p) / p;
}


// CONVERT DEGREES TO RADIANS //
function degToRad(deg) {
    return deg * (Math.PI/180);
}


// CONVERT RADIANS TO DEGREES //
function radToDeg(rad) {
    return (rad/TAU) * 180;
}


// COMBINED RADIUS //
function getRadius(a,b) {
    return Math.sqrt((a*a)+(b*b));
}


// CONVERT FROM VECTOR TO ANGLE //
function angleFromVector(vector) {
    return Math.atan2(vector.y,vector.x);
}


// CONVERT FROM ANGLE TO VECTOR //
function vectorFromAngle(angle) {
    return new Vector(Math.cos(angle),Math.sin(angle));
}


// NORMALISE VECTOR //
function normalizeVector(vector, scale) {
    var vx = vector.x;
    var vy = vector.y;
    var norm = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    if (norm !== 0) {
        vx = scale * vector.x / norm;
        vy = scale * vector.y / norm;
    }
    return new Vector(vx,vy);
}


// COMBINE POINTS //
function combinePoints(points) {
    var l = points.length;
    var point = new Point();

    for (var i=0; i<l; i++) {
        point.x += points[i].x;
        point.y += points[i].y;
    }
    return point;
}


// AVERAGE OF TWO VALUES //
function getAverage(a,b) {
    return (a+b)/2;
}


// SECONDS TO MINUTES //
function secondsToMinutes(time) {
    time = Math.round(time);
    var minutes = Math.floor(time / 60);
    var seconds = time - (minutes * 60);
    return str_pad_left(minutes,'0',2) + ':' + str_pad_left(seconds,'0',2);
}
function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

//-------------------------------------------------------------------------------------------
//  OBJECTS
//-------------------------------------------------------------------------------------------


// POINT //
function Point( x, y ) {
    this.x = x || 0;
    this.y = y || 0;
}
Point.prototype.clone = function() {
    return new Point(this.x,this.y);
};


// 3D POINT //
function Point3D( x, y, z ) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}


// VECTOR //
function Vector( x, y ) {
    this.x = x || 0;
    this.y = y || 0;
}
Vector.prototype.clone = function() {
    return new Vector(this.x,this.y);
};
Vector.prototype.magnitude = function() {
    return Math.sqrt((this.x*this.x) + (this.y*this.y));
};

Vector.prototype.normalise = function() {
    var m = this.magnitude();
    if (m>0) {
        this.x /= m;
        this.y /= m;
    }
};


// ALPHA //
function Alpha(a) {
    this.a = a || 0;
}