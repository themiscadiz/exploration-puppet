
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



// var color1 = 'blue';


// createPaths(color1);

var hue = new Color({ hue: Math.random() * 360, saturation: .50, brightness: 1 })

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


    return path;
}

// face
var face = new Path.Circle({

    center: new Point(100, 100),
    radius: 70,
    fillColor: hue,
    strokeColor: hue
});

// if (blinkMotion) {
//     console.log("eyes open");
// }
// else if(blinkMotion===false) {
//     console.log("eyes close");
// }

// tes circle
// var eyeLOpen = new Path.Circle(new Point(0,0), 20);


// ****eyes circle****
var eyeLOpen = new Path.Circle({
    center: [0, 0],
    radius: 20,
    // fillColor: 'white'
});

eyeLOpen.removeSegment(1);
// eyesLOpen.fillColor = 'blue';

// eyeLOpen.removeSegment(3);

var eyeROpen = new Path.Circle({
    center: [60, 0],
    radius: 20
});

eyeROpen.removeSegment(1);


var eyesOpen = new Group();
eyesOpen.children = [eyeLOpen, eyeROpen];

// The path is the first child of the group:
// eyesOpen.firstChild.fillColor = 'black';
// eyesOpen.lastChild.fillColor = 'black';


// eyesOpen.position = [globals.n, globals.o];


// // ****eyes glow****
// var eyeLGlow = new Path.Circle({
//     center: [0, 0],
//     radius: 5,
//     fillColor: 'white'
// });

// var eyeRGlow = new Path.Circle({
//     center: [60, 0],
//     radius: 5,
//     fillColor: 'white'
// });

// var eyesGlow = new Group();
// eyesGlow.children = [eyeLGlow, eyeRGlow];


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

// // let's draw some fingers
// var thumbo = new Path.Circle({

//     center: [ globals.a, globals.b],
//     radius: 20,
//     fillColor: 'blue',
//     strokeColor: hue
// });

// var indexo = new Path.Circle({

//     center: [ globals.c, globals.d],
//     radius: 20,
//     fillColor: 'red',
//     strokeColor: hue
// });

// var middo = new Path.Circle({

//     center: [ globals.e, globals.f],
//     radius: 20,
//     fillColor: 'pink',
//     strokeColor: hue
// });

// var ringo = new Path.Circle({

//     center: [ globals.g, globals.h],
//     radius: 20,
//     fillColor: 'yellow',
//     strokeColor: hue
// });

// var pinko = new Path.Circle({

//     center: [ globals.i, globals.j],
//     radius: 20,
//     fillColor: 'green',
//     strokeColor: hue
// });

function onFrame(event) {
    var keyPiano = new Path.Rectangle({
        point: [20, 20],
        size: [160, 160],
        strokeColor: 'black'
    });

  

    blinkMotion = globals.p;
    mouthMotion = globals.p;

    
    if (blinkMotion) {
        // console.log("eyes close");
        eyes.strokeColor = 'black';
        eyes.strokeColor.alpha = 1;


        eyesOpen.fillColor = hue;
        // eyesGlow.fillColor = hue;

        raster.opacity = 0;
    }
    else if (blinkMotion === false) {
        // raster.alpha(1);
        raster.opacity = 1;

        // console.log("eyes open");
        eyes.strokeColor = hue;
        eyes.strokeColor.alpha = 0;

        // eyesOpen.fillColor = 'blue';
        // // eyes.strokeColor = 'black';
        // eyesGlow.fillColor = hue;
        // // eyes.fillColor = 'blue';
        // eyes.strokeWidth = 5;
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

    

    // var itemTest2 = project.getItem({
    //     class: Path,
    //     fillColor: 'blue'
    // });

    // face.position = [globals.e, globals.f];
    face.position = [globals.k, globals.l];

    keyPiano.position=[400,400];
    // keyPiano.fillColor = new Color(1, 0, 1, [0.005]);
    keyPiano.fillColor = hue;
    keyPiano.fillColor.alpha = 0.01;

    // eyes.position = [globals.e, globals.f + 5];
    eyes.position = [globals.k, globals.l + 5];

    raster.position = [globals.k, globals.l-10];

    // eyesGlow.position = [globals.e, globals.f - 10];

    // mouth.position = [globals.e, globals.f + 30];
    mouth.position = [globals.k, globals.l + 30];

    // eyesOpen.position = [globals.n, globals.o];


    // map function example
    // function mapRange(value, in_min, in_max, out_min, out_max) {
    //   return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    // }

    eyesMovementMap = mapRange(globals.n, 100, 1100, face.position.x + 20, face.position.x - 20);
    // eyesOpen.position = [eyesMovementMap, globals.f];
    // eyesGlow.position = [eyesMovementMap, globals.f - 10];

    eyesOpen.position = [eyesMovementMap, globals.l];
    // eyesGlow.position = [eyesMovementMap, globals.l - 10];


    // eyes.position = [eyesMovementMap, globals.f];
    // eyesOpen.position = [globals.e, globals.f];
    // raster.position = eyes.position;



    var itemTest1 = project.getItem({
        class: Path
        // fillColor: 'black'
    });

    //thumb
    itemTest1.segments[0].point.x = globals.a;
    itemTest1.segments[0].point.y = globals.b;

    // thumbo.position = [globals.a,globals.b];


    //index
    itemTest1.segments[1].point.x = globals.c;
    itemTest1.segments[1].point.y = globals.d;

    // indexo.position = [globals.c,globals.d];


    //middle
    itemTest1.segments[2].point.x = globals.e;
    itemTest1.segments[2].point.y = globals.f;

    // middo.position = [globals.e,globals.f];


    //ring
    itemTest1.segments[3].point.x = globals.g;
    itemTest1.segments[3].point.y = globals.h;

    // ringo.position = [globals.g,globals.h];


    //pinky
    itemTest1.segments[4].point.x = globals.i;
    itemTest1.segments[4].point.y = globals.j;

    // pinko.position = [globals.i,globals.j];

}


function mapRange(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}