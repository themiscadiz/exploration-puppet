// p5 sketch

// ********************
// VARIABLES FOR PAPER
// window.globals = { a: 800, b: 100, c: 500, d: 100, e: 800, f: 100, g: 500, h: 100, i: 800, j: 100, k: 100, l: 100, m: 100, n: 100, o: 100, p: false, q: false, rX: 0, rY: 0, sX: 0, sY: 0, tX: 0, tY: 0, uX: 0, uY: 0, vX: 0, vY: 0, wX: 0, wY: 0, sizeNote: 100, playNoteSpace: false, playNoteSpace2: false, playNoteSpace3: false, playNote: false, wSize: 0, hSize: 0 };

window.globals = { a: 800, b: 100, c: 500, d: 100, e: 800, f: 100, g: 500, h: 100, i: 800, j: 100, k: 100, l: 100, m: 100, p: false, rX: 0, rY: 0, sX: 0, sY: 0, tX: 0, tY: 0, uX: 0, uY: 0, vX: 0, vY: 0, wX: 0, wY: 0, sizeNote: 100, playNoteSpace: false, playNoteSpace2: false, playNoteSpace3: false, playNote: false, wSize: 0, hSize: 0 };


// ****Hand Pose****
let handpose;
let video;
let predictions = [];
// let smoothMov = 0.1;
let smoothMov = 0.3;

let notesSoundRadius = [3];
let notesSound = [6];
let notesSoundSize = 100;
let notes;
let playNoteSpace = false;
let playNote = false;

//Sound variables
let mySnd;
let soundsArray = [];
// let sounds = ["e.wav", "g.wav", "c.wav", "b.wav", "note.wav"];
let sounds = ["sounds_assets/short/HandPuppet_G.wav", "sounds_assets/short/HandPuppet_E.wav", "sounds_assets/short/HandPuppet_C.wav", "sounds_assets/note.wav", "sounds_assets/short/Voice03.wav"];
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

let heightButton;


// ****FACE****

let faceapi;
// let video;
let detections;

// let smoothMov = 0.1;
let lerpPos = [];
let x = 0;
let y = 0;
let pointsLength = 30;

// ****Eyes****
let eye1, eye2;
let ts = 25;

let wSize;
let hSize;

let wSize_1;
let hSize_1;

// ****SET UP****
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  wSize_1 = width;
  hSize_1 = height;

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

  //  LERP
  for (let i = 0; i < pointsLength; i++) {
    let thispoint = createVector(0, 0);
    lerpPos.push(thispoint);
  }

  heightButton = height / 1.2;
  notesSound[0] = createVector(0, heightButton);
  notesSound[1] = createVector(width * 0.3, heightButton);

  notesSound[2] = createVector(width * 0.3, heightButton);
  notesSound[3] = createVector(width * 0.5, heightButton);

  notesSound[4] = createVector(width * 0.7, heightButton);
  notesSound[5] = createVector(width, heightButton);

  window.globals.sizeNote = notesSoundSize;

  window.globals.rX = notesSound[0].x;
  window.globals.rY = notesSound[0].y;
  window.globals.sX = notesSound[1].x;
  window.globals.sY = notesSound[1].y;


  window.globals.tX = notesSound[2].x;
  window.globals.tY = notesSound[2].y;
  window.globals.uX = notesSound[3].x;
  window.globals.uY = notesSound[3].y;

  window.globals.vX = notesSound[4].x;
  window.globals.vY = notesSound[4].y;
  window.globals.wX = notesSound[5].x;
  window.globals.wY = notesSound[5].y;

}

function modelReady() {
  console.log("Hand Model Ready!");
  let showValue = document.getElementById("show-value");
  showValue.innerHTML = `<h2>Puppet is Ready!</h2>`;
}

function draw() {
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {

  //set sound amp and volume
  amp = new p5.Amplitude(0.9);

  for (let i = 0; i < 5; i++) {
    soundsArray[i].setVolume(1);
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

      // lerp_X = lerp(lerpPoints[j].x, wSize_1 - prediction.landmarks[j][0], smoothMov);
      // lerp_Y = lerp(lerpPoints[j].y, prediction.landmarks[j][1], smoothMov);

      lerp_X = lerp(lerpPoints[j].x, wSize_1 - (map(prediction.landmarks[j][0], 0, width, 0 -width / 10, width + width / 3)), smoothMov);
      lerp_Y = lerp(lerpPoints[j].y, map(prediction.landmarks[j][1], 0, height / 2, 0, height), smoothMov);

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

      if (!soundsArray[3].isPlaying()) {
        soundsArray[3].play();
      }

    }
    else {
      soundsArray[3].stop();
      window.globals.p = false;
    }

    window.globals.wSize_1 = wSize;
    window.globals.hSize_1 = hSize;

    // PIANO KEYS CIRCLES
    notesSoundRadius[0] = p5.Vector.dist(notesSound[0], middleFinger);
    notesSoundRadius[1] = p5.Vector.dist(notesSound[1], middleFinger);
    notesSoundRadius[2] = p5.Vector.dist(notesSound[2], middleFinger);

    positionTracking(thumpFinger, heightButton);

    //////////////////////
    //////////////////////
    //////////////////////

    function positionTracking(finger, heightButton) {

      if (
        finger.x > notesSound[0].x && finger.x < notesSound[1].x && finger.y > heightButton) {

        playNoteSpace = true;

        if (!soundsArray[0].isPlaying()) {
          soundsArray[0].play();
          playNote = true;
        }
        else { 
          // soundsArray[0].pause();
          playNote = false; }
      }

      else { playNoteSpace = false; }

      if (
        finger.x > notesSound[2].x && finger.x < notesSound[3].x &&
        finger.y > heightButton) {

        playNoteSpace2 = true;

        if (!soundsArray[1].isPlaying()) {
          soundsArray[1].play();
          playNote = true;
        }
        else { 
          // soundsArray[1].pause();
          playNote = false; }
      }

      else { playNoteSpace2 = false; }

      if (
        finger.x > notesSound[4].x && finger.x < notesSound[5].x && finger.y > heightButton) {

        playNoteSpace3 = true;

        if (!soundsArray[2].isPlaying()) {
          soundsArray[2].play();
          playNote = true;
        }
        else { 
          // soundsArray[2].pause();
          playNote = false; }
      }

      else { playNoteSpace3 = false; }

    }

    //////////////////////
    //////////////////////
    //////////////////////

    window.globals.playNoteSpace = playNoteSpace;
    window.globals.playNoteSpace2 = playNoteSpace2;
    window.globals.playNoteSpace3 = playNoteSpace3;

    window.globals.playNote = playNote;

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
