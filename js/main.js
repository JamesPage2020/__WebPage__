// == DECLARATION OF CANVAS ==
const CANVAS = document.getElementById('mainCir');
const C = CANVAS.getContext('2d');

var r = document.querySelector(':root');
var rs = getComputedStyle(r); //get properties and values from r (root)

var sides = CANVAS.clientHeight;

CANVAS.width = sides;
CANVAS.height = sides;

// == DECLARATION 0F INITIAL VALUES ==
var mouse = {
    x: 0,
    y: 0,
};

var properties = {
    center: sides / 2,
    scale: CANVAS.width * 0.25,
    angleX: 0,
    angleY: 0,
    angleZ: 0,
    pointR: CANVAS.width / 99,
    colour: {
        background: rs.getPropertyValue('--colourBg'),
        lines: rs.getPropertyValue('--colourLn'),
    },
    lineSize: rs.getPropertyValue('--borderSize'),
    mousePosDir: {
        x: 1,
        y: 1,
    },
    windowCenter: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    }
};

function drawScreen() {
    C.fillStyle = properties.colour.background;
    C.clearRect(0, 0, CANVAS.width, CANVAS.height);

    var _points = [];
    for (var ctr = 0; ctr < shape.points.length; ctr++) {
        var _point = shape.points[ctr];
        _point = mmath.rotationY(_point, properties.angleY);
        _point = mmath.rotationX(_point, properties.angleX);
        _point = mmath.rotationZ(_point, properties.angleZ);
        var _x = _point[0] * properties.scale + properties.center;
        var _y = _point[1] * properties.scale + properties.center;
        var lst = [_x, _y];
        _points.push(lst);
        drawCircle(_x, _y, 2);
    }

    for (var ctr = 0; ctr < shape.lines.length; ctr++) {
        var _p1 = _points[shape.lines[ctr][0]];
        var _p2 = _points[shape.lines[ctr][1]];
        drawLine(_p1, _p2, properties.lineSize);
    }
}

function drawCircle(pointX, pointY, width = 1) {
    C.strokeStyle = properties.colour.lines;
    C.fillStyle = properties.colour.lines;

    if (width) {
        C.lineWidth = width;
    }

    C.beginPath();
    C.arc(pointX, pointY, properties.pointR, 0, 2 * Math.PI);
    C.fill();
    C.stroke();
}

function drawLine(begin, end, width) {

    C.strokeStyle = properties.colour.lines;

    C.lineWidth = width;

    C.beginPath();
    C.moveTo(begin[0], begin[1]);
    C.lineTo(end[0], end[1]);
    C.stroke();
}

function rotationDirection() {
    var mapFn = (n, start1, stop1, start2, stop2) => ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
    var lerpFn = (start, end, amt) => (1-amt)*start+amt*end;

    var _magx = Math.abs(properties.windowCenter.x - mouse.x);
    var _magy = Math.abs(properties.windowCenter.y - mouse.y);
    var _magz = Math.sqrt((properties.windowCenter.x-mouse.x)**2 + (properties.windowCenter.y - mouse.y)**2) / 2;

    //console.log("mag x: " + _magx + ", " + "mag y: " + _magy + ", " + "mag z: " + _magz + ", ")

    var magx = mapFn(_magx, 0, properties.windowCenter.x, .001, .01);
    var magy = mapFn(_magy, 0, properties.windowCenter.x, .001, .01);
    var magz = mapFn(_magz, 0, properties.windowCenter.x, .001, .02);

    // magx = lerpFn(magx, _magx, 0.001);
    // magy = lerpFn(magy, _magy, 0.001);
    // magz = lerpFn(magz, _magz, 0.001);

    if ((mouse.x >= properties.windowCenter.x) && (mouse.y < properties.windowCenter.y)) {
        properties.mousePosDir.x = 1;
        properties.mousePosDir.y = 1;
    } else if ((mouse.x > properties.windowCenter.x) && (mouse.y >= properties.windowCenter.y)) {
        properties.mousePosDir.x = 1;
        properties.mousePosDir.y = -1;
    }  else if ((mouse.x <= properties.windowCenter.x) && (mouse.y > properties.windowCenter.y)) {
        properties.mousePosDir.x = -1;
        properties.mousePosDir.y = -1;
    }  else if ((mouse.x < properties.windowCenter.x) && (mouse.y <= properties.windowCenter.y)) {
        properties.mousePosDir.x = -1;
        properties.mousePosDir.y = 1;
    }

    properties.angleX += properties.mousePosDir.x * magx;
    properties.angleY += properties.mousePosDir.y * magy;
    properties.angleZ += (properties.mousePosDir.x * properties.mousePosDir.y) * magz;
}

class Dodecahedron {
    // https://themathkid.tumblr.com/post/124789024821/hyrodium-the-coordinates-of-vertexes-of-regular

    constructor() {
        var phi = (1 + Math.pow(5, 0.5)) / 2;

        this.p0 = [1, -1, 1];
        this.p1 = [1 / phi, -phi, 0];
        this.p2 = [-1 / phi, -phi, 0];
        this.p3 = [-1, -1, 1];
        this.p4 = [0, -1 / phi, phi];
        this.p5 = [-phi, 0, 1 / phi];
        this.p6 = [-1, 1, 1];
        this.p7 = [0, 1 / phi, phi];
        this.p8 = [1, 1, 1];
        this.p9 = [1, 1, -1];
        this.p10 = [-1, -1, -1];
        this.p11 = [-1 / phi, phi, 0];
        this.p12 = [1 / phi, phi, 0];
        this.p13 = [phi, 0, 1 / phi];
        this.p14 = [phi, 0, -1 / phi];
        this.p15 = [-1, 1, -1];
        this.p16 = [-phi, 0, -1 / phi];
        this.p17 = [0, 1 / phi, -phi];
        this.p18 = [1, -1, -1];
        this.p19 = [0, -1 / phi, -phi];

        this.v0 = [0, 1];
        this.v1 = [1, 2];
        this.v2 = [2, 3];
        this.v3 = [3, 4];
        this.v4 = [4, 0];
        this.v5 = [4, 7];
        this.v6 = [0, 13];
        this.v7 = [1, 18];
        this.v8 = [2, 10];
        this.v9 = [3, 5];
        this.v10 = [8, 13];
        this.v11 = [13, 14];
        this.v12 = [14, 18];
        this.v13 = [18, 19];
        this.v14 = [19, 10];
        this.v15 = [10, 16];
        this.v16 = [16, 5];
        this.v17 = [5, 6];
        this.v18 = [6, 7];
        this.v19 = [7, 8];
        this.v20 = [12, 9];
        this.v21 = [9, 17];
        this.v22 = [17, 15];
        this.v23 = [15, 11];
        this.v24 = [11, 12];
        this.v25 = [12, 8];
        this.v26 = [9, 14];
        this.v27 = [17, 19];
        this.v28 = [15, 16];
        this.v29 = [11, 6];

        this.points = [this.p0, this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.p8, this.p9, this.p10, this.p11, this.p12, this.p13, this.p14, this.p15, this.p16, this.p17, this.p18, this.p19];
        this.lines = [this.v0, this.v1, this.v2, this.v3, this.v4, this.v5, this.v5, this.v6, this.v7, this.v8, this.v9,
        this.v10, this.v11, this.v12, this.v13, this.v14, this.v15, this.v16, this.v17, this.v18, this.v19,
        this.v20, this.v21, this.v22, this.v23, this.v24, this.v25, this.v26, this.v27, this.v28, this.v29];
    }
}

class MatrixMath {

    rotationX(a, angle = 0) {
        var _x = a[0];
        var _y = a[1] * Math.cos(angle) + a[2] * -Math.sin(angle);
        var _z = a[1] * Math.sin(angle) + a[2] * Math.cos(angle);
        var lst = [_x, _y, _z];
        return lst
    }
    rotationY(a, angle = 0) {
        var _x = a[0] * Math.cos(angle) + a[2] * Math.sin(angle);
        var _y = a[1];
        var _z = a[0] * -Math.sin(angle) + a[2] * Math.cos(angle);
        var lst = [_x, _y, _z];
        return lst
    }
    rotationZ(a, angle = 0) {

        var _x = a[0] * Math.cos(angle) + a[2] * -Math.sin(angle);
        var _y = a[0] * Math.sin(angle) + a[2] * Math.cos(angle);;
        var _z = a[2];
        var lst = [_x, _y, _z];
        return lst
    }
}

// == FUNCTIONS OF MAIN LOOP ==
function mainLoop() {
    // console.log("MAIN LOOP");
    document.eve
    drawScreen();

    rotationDirection();
    // properties.angleX += .01;
    // properties.angleY += .005;
    // properties.angleZ += .0075;

    C.fillStyle = properties.colour.background;
}

function MAIN() {
    window.requestAnimationFrame(MAIN);
    mainLoop();
}

// == RUN APPLICATION ==
C.fillStyle = properties.colour.background;
C.clearRect(0, 0, CANVAS.width, CANVAS.height);

var mmath = new MatrixMath();
var shape = new Dodecahedron();

MAIN();

// == EVENTS ==
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('mousemove', mouseLocation, false);

document.getElementById('btnMe').addEventListener('mouseover', function () {
    mouseOver('titleMe');
}, false);
document.getElementById('btnSkills').addEventListener('mouseover', function () {
    mouseOver('titleSkills');
}, false);
document.getElementById('btnLinkedin').addEventListener('mouseover', function () {
    mouseOver('titleLinkedin');
}, false);
document.getElementById('btnPDF').addEventListener('mouseover', function () {
    mouseOver('titlePDF');
}, false);
document.getElementById('btnProj').addEventListener('mouseover', function () {
    mouseOver('titleProj');
}, false);

document.getElementById('btnMe').addEventListener('mouseout', function () {
    mouseOut('titleMe');
}, false);
document.getElementById('btnSkills').addEventListener('mouseout', function () {
    mouseOut('titleSkills');
}, false);
document.getElementById('btnLinkedin').addEventListener('mouseout', function () {
    mouseOut('titleLinkedin');
}, false);
document.getElementById('btnPDF').addEventListener('mouseout', function () {
    mouseOut('titlePDF');
}, false);
document.getElementById('btnProj').addEventListener('mouseout', function () {
    mouseOut('titleProj');
}, false);


// == Event functions == 
function resizeCanvas() {
    sides = CANVAS.clientHeight;

    CANVAS.width = sides;
    CANVAS.height = sides;
    properties.center = sides / 2;
    console.log(window.innerHeight);

    properties.scale = CANVAS.width * 0.25;
    properties.pointR = CANVAS.width / 99;
    properties.lineSize = CANVAS.width * 0.025;;
    properties.lineSize = rs.getPropertyValue('--borderSize');

    drawScreen();
}

function mouseLocation(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    //console.log('x pos: ' + mouse.x + '  ,  y pos: ' + mouse.y + '  ,  center x pos: ' + properties.windowCenter.x + '  ,  center y pos: ' + properties.windowCenter.y);
}


function mouseOut(titleId) {
    // console.log("mouse out");
    document.getElementById(titleId).style.display = "none";
}

function mouseOver(titleId) {
    // console.log("mouse over");
    document.getElementById(titleId).style.display = "block";
}
