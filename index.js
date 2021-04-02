
// // PAPER.JS

// ******************************
var smooth = true;
var values = {
    paths: 1,
    minPoints: 5,
    maxPoints: 5,
    minRadius: 50,
    maxRadius: 50
};

var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
};

var globalPath;

var blinkMotion = false;

var eyesMovementMap = 0;

var keyPiano1;
var keyPiano2;
var keyPiano3;

var auraMove = 0;
var keyPianoAura1;
var sWidth;
var opac;
var clonedPath;

// var color1 = 'blue';


// createPaths(color1);

var hue = new Color({ hue: Math.random() * 360, saturation: .50, brightness: 1 })
var hue2 = new Color({ hue: Math.random() * 360, saturation: .50, brightness: 1 })
var hue3 = new Color({ hue: Math.random() * 360, saturation: .20, brightness: 1 })

createPaths(hue);

function createPaths(hue) {

    var radiusDelta = values.maxRadius - values.minRadius;

    var pointsDelta = values.maxPoints - values.minPoints;

    for (var i = 0; i < values.paths; i++) {

        var radius = values.minRadius + Math.random() * radiusDelta;

        var points = values.minPoints + Math.floor(Math.random() * pointsDelta);

        globalPath = createBlob(view.size / 2, radius, points);

        // var hue = new Color({ hue: Math.random() * 360, saturation: .50, brightness: 1 })
        globalPath.fillColor = hue;
        globalPath.strokeColor = hue;

        globalPath.strokeWidth = 20;
        globalPath.strokeCap = 'round';

    };
}


function createBlob(center, maxRadius, points) {

    var path = new Path();
    path.closed = true;

    for (var i = 0; i < points; i++) {
        var delta = new Point({
            // length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
            length: 100,
            angle: (-180 / points) * i
        });

        path.add(center + delta);
    }

    // path.smooth();

    if (smooth)
        // path.smooth({ type: 'continuous', from: -1, to: 1 }); 
        path.smooth({ type: 'catmull-rom', factor: 0.0 });
    // path.smooth({ type: 'continuous' });

    // Set the shadow color of the circle to RGB black:
    path.shadowColor = new Color(0, 0, 0);
    // Set the shadow blur radius to 12:
    path.shadowBlur = 12;
    // Offset the shadow by { x: 5, y: 5 }
    path.shadowOffset = new Point(5, 5);

    return path;
}


// var rect = new Path.Rectangle({
//     point: [globals.wSize/ 2, globals.hSize / 2],
//     size: [globals.wSize/ 2, globals.hSize / 2]
//     // strokeColor: 'white',
//     // selected: true
// });
// rect.sendToBack();
// rect.fillColor = '#dfedf2';

var rectangle = new Rectangle(
    new Point(0, 0),
    new Size(view.size.width, view.size.height)

);

var shape = new Shape.Rectangle(rectangle);
shape.sendToBack();





keyPiano1 = new Path.Rectangle({
    // var keyPiano1copy = new Shape.Rectangle(keyPiano1);
    // keyPiano1copy.sendToBack();
    point: [20, 20],
    size: [view.size.width * .35, view.size.height * .2],
});


keyPiano2 = new Path.Rectangle({
    // center: [20, 20],
    // radius: [globals.sizeNote, globals.sizeNote],
    point: [20, 20],
    size: [view.size.width * .35, view.size.height * .2],
});

keyPiano3 = new Path.Rectangle({
    // center: [20, 20],
    // radius: [globals.sizeNote, globals.sizeNote],
    point: [20, 20],
    size: [view.size.width * .35, view.size.height * .2],
});

// keyPianoAura1 = new Path.Circle({
//     center: [globals.rX, globals.rY],
//     radius: [60, 60],
//     strokeColor: hue2,
//     strokeWidth: 20
// });


// face
var face = new Path.Circle({

    center: new Point(100, 100),
    radius: 70,
    fillColor: hue,
    strokeColor: hue,
    // Set the shadow color of the circle to RGB black:
    shadowColor: new Color('#4a4a4a'),
    // Set the shadow blur radius to 12:
    shadowBlur: 12,
    // Offset the shadow by { x: 5, y: 5 }
    shadowOffset: new Point(1, 1)
});



// ****eyes circle****
var eyeLOpen = new Path.Circle({
    center: [0, 0],
    radius: 20,
    // fillColor: 'white'
});

eyeLOpen.removeSegment(1);

var eyeROpen = new Path.Circle({
    center: [60, 0],
    radius: 20
});

eyeROpen.removeSegment(1);


var eyesOpen = new Group();
eyesOpen.children = [eyeLOpen, eyeROpen];


// eyes arc
var eyeL = new Path.Arc({
    from: [20, 20],
    through: [30, 30],
    to: [40, 20]
});

var eyeR = new Path.Arc({
    from: [80, 20],
    through: [90, 30],
    to: [100, 20]
});

var eyes = new Group();
eyes.children = [eyeL, eyeR];

// The path is the first child of the group:
// eyes.firstChild.fillColor = 'white';
// eyes.lastChild.fillColor = 'white';

// eyes.strokeColor = 'black';
eyes.position = [0, 0];
eyes.strokeWidth = 5;
eyes.strokeCap = 'round';


// mouth arc smile
var mouth = new Path.Arc({
    from: [40, 90],
    through: [50, 100],
    to: [60, 90]
});

mouth.strokeColor = 'black';
// mouth.position = [30, 30];
mouth.strokeWidth = 5;
mouth.strokeCap = 'round';


// mouth open
// .
// .
// .

var segment, path;
var movePath = false;

// Cute Eyes
// Create a raster item using the image tag with id='mona'
var raster = new Raster('eyes');
// Scale the raster by 50%
raster.scale(0.1);


function onFrame(event) {

    // keyPiano1.position = [globals.rX + globals.tX / 3, globals.rY + globals.rY / 10];

    // keyPiano2.position = [globals.tX + globals.tX / 3, globals.tY + globals.tY / 10];

    // keyPiano3.position = [globals.vX + globals.vX / 3, globals.vY + globals.vY / 10];

    keyPiano1.position = [globals.rX + globals.tX / 2, globals.rY + globals.rY / 10];

    keyPiano2.position = [globals.tX + globals.tX / 1.5, globals.tY + globals.tY / 10];

    keyPiano3.position = [globals.vX + globals.vX / 5, globals.vY + globals.vY / 10];

    // shape.fillColor = hue3;
    shape.fillColor = '#f0ffff';

    if (globals.playNoteSpace) {

        keyPiano1.fillColor = hue2;
        keyPiano1.fillColor.alpha = 0.5;
        shape.fillColor.alpha = 0.5;

        keyPiano1.shadowColor = new Color('#3b3b3b');
        keyPiano1.shadowBlur = 0;
        keyPiano1.shadowOffset = new Point(0, 0);
    }

    else {
        keyPiano1.fillColor = hue2;
        keyPiano1.fillColor.alpha = 1;
        shape.fillColor.alpha = 1;

        keyPiano1.shadowColor = new Color('#3b3b3b');
        keyPiano1.shadowBlur = 12;
        keyPiano1.shadowOffset = new Point(5, 5);
    }



    if (globals.playNoteSpace2) {

        keyPiano2.fillColor = hue2;
        keyPiano2.fillColor.alpha = 0.5;

        shape.fillColor.alpha = 0.5;

        keyPiano2.shadowColor = new Color('#3b3b3b');
        keyPiano2.shadowBlur = 0;
        keyPiano2.shadowOffset = new Point(0, 0);


    }
    else {
        keyPiano2.fillColor = hue2;
        keyPiano2.fillColor.alpha = 1;
        shape.fillColor.alpha = 1;

        keyPiano2.shadowColor = new Color('#3b3b3b');
        keyPiano2.shadowBlur = 12;
        keyPiano2.shadowOffset = new Point(5, 5);
    }

    if (globals.playNoteSpace3) {

        keyPiano3.fillColor = hue2;
        keyPiano3.fillColor.alpha = 0.5;
        shape.fillColor.alpha = 0.5;

        keyPiano3.shadowColor = new Color('#3b3b3b');
        keyPiano3.shadowBlur = 0;
        keyPiano3.shadowOffset = new Point(0, 0);
    }
    else {
        keyPiano3.fillColor = hue2;
        keyPiano3.fillColor.alpha = 1;
        shape.fillColor.alpha = 1;

        keyPiano3.shadowColor = new Color('#3b3b3b');
        keyPiano3.shadowBlur = 12;
        keyPiano3.shadowOffset = new Point(5, 5);
    }





    if (globals.playNote) { }
    else { }

    blinkMotion = globals.p;
    mouthMotion = globals.p;

    if (blinkMotion) {
        // console.log("eyes close");
        eyes.strokeColor = 'black';
        eyes.strokeColor.alpha = 1;

        eyesOpen.fillColor = hue;

        raster.opacity = 0;
    }
    else if (blinkMotion === false) {
        raster.opacity = 1;

        // console.log("eyes open");
        eyes.strokeColor = hue;
        eyes.strokeColor.alpha = 0;
    }

    // mouthMotion

    if (mouthMotion) {
        // console.log("mouth open");
        mouth.strokeWidth = 20;
    }

    else if (mouthMotion === false) {
        // console.log("mouth close");
        mouth.strokeWidth = 7;


    }

    face.position = [globals.k, globals.l];

    eyes.position = [globals.k, globals.l + 5];

    raster.position = [globals.k, globals.l - 10];

    mouth.position = [globals.k, globals.l + 30];

    eyesMovementMap = mapRange(globals.n, 100, 1100, face.position.x + 20, face.position.x - 20);

    eyesOpen.position = [eyesMovementMap, globals.l];

    var itemTest1 = project.getItem({
        class: Path
    });

    //thumb
    itemTest1.segments[0].point.x = globals.a;
    itemTest1.segments[0].point.y = globals.b;

    //index
    itemTest1.segments[1].point.x = globals.c;
    itemTest1.segments[1].point.y = globals.d;

    //middle
    itemTest1.segments[2].point.x = globals.e;
    itemTest1.segments[2].point.y = globals.f;

    //ring
    itemTest1.segments[3].point.x = globals.g;
    itemTest1.segments[3].point.y = globals.h;

    //pinky
    itemTest1.segments[4].point.x = globals.i;
    itemTest1.segments[4].point.y = globals.j;

}


function mapRange(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}