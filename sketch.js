// p5 sketch

// ********************
// VARIABLES FOR PAPER
window.globals = { a: 800, b: 100, c: 500, d: 100, e: 800, f: 100, g: 500, h: 100, i: 800, j: 100, k: 100, l: 100, m: 100, n: 100, o: 100, p: false, q: false };


// ****Hand Pose****
let handpose;
let video;
let predictions = [];

// let s1, s2, s3;
// let gravity = 9.0;
// let mass = 2.0;
// let newIndicator;
let smoothMov = 0.1;
// let smoothMov = 0.5;


//Sound variables
let mySnd;
let soundsArray = [];
let sounds = ["c.wav", "e.wav", "g.wav", "b.wav", "note.wav"];
let amp;

//preload sounds
function preload() {
  for (let i = 0; i < 5; i++) {
    soundsArray.push(loadSound(sounds[i]));
  }
}


// ****HAND****
let lerp_X = 0;
let lerp_Y = 0;

let lerpPoints = [];

let keypoint;

let previousKeypoint;

let lerpLength = 21;


let thumpFinger;

let indexFinger;

let middleFinger;

let ringFinger;

let pinkyFinger;

let palm;
let floorH;


// ****FACE****

let faceapi;
// let video;
let detections;

// let smoothMov = 0.1;
let lerpPos = [];
let x = 0;
let y = 0;
let pointsLength = 30;

// FACE:
// by default all options are set to true
const detection_options = {
  withLandmarks: true,
  withDescriptors: false,
}

// ****Eyes****
let eye1, eye2;
let ts = 25;

let wSize;
let hSize;
// ****SET UP****
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  wSize = window.innerWidth;
  hSize = window.innerHeight;

  floorH = windowHeight;
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();

  // HAND
  for (let i = 0; i < lerpLength; i++) {
    let thispoint = createVector(0, 0);
    lerpPoints.push(thispoint);
  }

  // // FACE
  // faceapi = ml5.faceApi(video, detection_options, modelReadyFace)

  // EYES
  eye1 = new Eye(100, 100, 120);
  // eye2 = new Eye(300, 100, 120);

  //  LERP
  for (let i = 0; i < pointsLength; i++) {
    let thispoint = createVector(0, 0);
    lerpPos.push(thispoint);
  }

}

function modelReady() {
  console.log("Hand Model Ready!");
  let showValue = document.getElementById("show-value");
  showValue.innerHTML = `<h2>Puppet is Ready!</h2>`;

  // FACE
  // faceapi = ml5.faceApi(video, detection_options, modelReadyFace)
}

function modelReadyFace() {
  console.log('Face Model Ready!')

  // console.log(faceapi)
  // faceapi.detect(gotResults)
}

function draw() {
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {

    //set sound amp and volume
    amp = new p5.Amplitude(0.9);

    for (let i = 0; i < 5; i++) {
      soundsArray[i].setVolume(.2);
    }

  for (let i = 0; i < predictions.length; i += 1) {

    const prediction = predictions[i];

    for (let j = 0; j < prediction.landmarks.length; j += 1) {

      if (predictions.length != 0) {
        keypoint = prediction.landmarks[j];
      }
      if (predictions.length < 0) {
        keypoint = previousKeypoint;
      }


      fill(0, 255, 0);
      noStroke();

      //       //  LERP
      lerp_X = lerp(lerpPoints[j].x, prediction.landmarks[j][0], smoothMov);
      lerp_Y = lerp(lerpPoints[j].y, prediction.landmarks[j][1], smoothMov);


      let keypointPos = createVector(lerp_X, lerp_Y);

      lerpPoints[j] = keypointPos;

      // // All Point after Lerp
      previousKeypoint = prediction.landmarks[j];


    }

    thumpFinger = createVector(lerpPoints[4].x, lerpPoints[4].y);

    indexFinger = createVector(lerpPoints[8].x, lerpPoints[8].y);

    middleFinger = createVector(lerpPoints[12].x, lerpPoints[12].y);

    ringFinger = createVector(lerpPoints[16].x, lerpPoints[16].y);

    pinkyFinger = createVector(lerpPoints[20].x, lerpPoints[20].y);

    palm = createVector(lerpPoints[9].x, lerpPoints[9].y);


    // Use distance between index and thumb to set variable for open and closed mouth
    let distance = indexFinger.dist(thumpFinger);

    if (distance < 90) {
      window.globals.p = true;

      if(!soundsArray[4].isPlaying()){
        soundsArray[4].play();
      }

    }
    else {
      window.globals.p = false;
    }

    if (palm.x > 0 && palm.x < wSize/2){
      if(!soundsArray[3].isPlaying()){
        soundsArray[3].play();
      }
    }
    if (palm.x > wSize/2 && palm.x < wSize){
      if(!soundsArray[2].isPlaying()){
        soundsArray[2].play();
      }
    }

    // access global variables for paper.js
    window.globals.a = thumpFinger.x;
    window.globals.b = thumpFinger.y;

    window.globals.c = indexFinger.x;
    window.globals.d = indexFinger.y;

    window.globals.e = middleFinger.x;
    window.globals.f = middleFinger.y;

    window.globals.g = ringFinger.x;
    window.globals.h = ringFinger.y;

    window.globals.i = pinkyFinger.x;
    window.globals.j = pinkyFinger.y;

    // face
    window.globals.k = middleFinger.x;
    window.globals.l = middleFinger.y;


    window.globals.m = floorH;
  }
}



// Face analysis
function gotResults(err, result) {
  if (err) {
    console.log(err)
    return
  }
  detections = result;
  image(video, 0, 0, width, height)
  if (detections) {
    if (detections.length > 0) {
      drawLandmarks(detections)
    }
  }
  // faceapi.detect(gotResults)
}


function drawLandmarks(detections) {
  noFill();
  stroke(161, 95, 251)
  strokeWeight(2)

  for (let i = 0; i < detections.length; i++) {
    const allPoints = detections[i].landmarks._positions;
    drawCircles(allPoints);

  }
}

function drawCircles(feature) {
  for (let i = 0; i < feature.length; i++) {

    // WITH LERP
    lerpPos[i] = createVector(feature[i]._x, feature[i]._y);

    x = lerp(lerpPos[i].x, feature[i]._x, smoothMov);
    y = lerp(lerpPos[i].y, feature[i]._y, smoothMov);

    let smoothPoints = createVector(x, y);
    lerpPos[i] = smoothPoints;
  }

  let focalPoint = createVector(lerpPos[27].x, lerpPos[27].y);

  let mouthTop = createVector(lerpPos[51].x, lerpPos[51].y);
  let mouthBottom = createVector(lerpPos[57].x, lerpPos[57].y);

  let mouthDist = mouthTop.dist(mouthBottom);

  if (mouthDist > 40) {
    window.globals.q = true;
  }
  else {
    window.globals.q = false;
  }
  // ellipse(focalPoint.x, focalPoint.y, 10);

  // eyes movement
  fill(255);

  let sides = {
    l_x: 100,
    l_y: 0,
    r_x: 175,
    r_y: 50
  }

  // rect(sides.l_x, sides.l_y, sides.r_x, sides.r_y);

  // let xMap = map(focalPoint.x, 0, width, sides.r_x*1.5,  sides.l_x);

  // fill(0);
  // ellipse(xMap, 25, 20,20);
  // ellipse(xMap+ 20, 25, 20,20);

  window.globals.n = focalPoint.x;
  window.globals.o = focalPoint.y;

  eye1.update(window.globals.n, window.globals.o);
  eye1.display();
  // eye2.update(window.globals.n, window.globals.o);
  // eye2.display();
}

function Eye(trackingx, trackingy, ts) {
  this.x = trackingx;
  this.y = trackingy;
  this.size = ts;
  this.angle = 0;

  this.update = function (tracking_x, tracking_y) {
    this.angle = atan2(tracking_y - this.y, tracking_x - this.x);
  };

  this.display = function () {
    push();
    translate(this.x, this.y);
    fill(255);

    ellipse(0, 0, this.size, this.size);

    rotate(this.angle);
    fill(153, 204, 0);

    ellipse(this.size / 4, 0, this.size / 2, this.size / 2);
    pop();
  };
}



