// Paul Cusimano
// 2024
// Homework 5

// Sol LeWitt's Wall Drawing 16 (1969)

// Description:
// Bands of lines 12 inches (30 cm) wide,
// in three directions (vertical, horizontal, diagonal right)
// intersecting.
// https://massmoca.org/event/walldrawing16/

let offsetRange = 0.3; // offset from the 'perfect' line position to help create the hand-drawn effect

// range of gray values for the lines
let grayMin = 150;
let grayMax = 200;

// how many times its redrawn per second
let fps = 15;

// segment counting for the stop motion effect
let segmentCounter = 0;
let segmentLimit = 100;
const segmentIncrement = 1000;

function setup() {
  createCanvas(1250, 500);
  background(242, 243, 238);
  frameRate(fps);
}

function draw() {
  // if we've drawn enough segments for this frame, increase the limit
  if (segmentCounter >= segmentLimit) {
    segmentLimit += segmentIncrement;
    segmentCounter = 0;
  }

  if (segmentLimit > 120000) {
    noLoop(); // Stop the draw loop
  }

  background(242, 243, 238);

  // original pattern (vertical)
  drawPattern();

  // rotate 90 degrees and draw pattern (horizontal)
  translate(width / 2, height / 2);
  rotate(HALF_PI);
  translate(-width / 2, -height / 2);
  drawPattern();

  // rotate 45 degrees and draw pattern (diagonal)
  translate(width / 2, height / 2);
  rotate(QUARTER_PI);
  translate(-width / 2, -height / 2);
  drawPattern();
}

function drawPattern() {
  let rectHeight = height * 0.5;
  let rectYStart = (height - rectHeight) / 2;

  // The line that indicates the 'start and end' of the vertical lines
  for (let i = 0; i < 2; i++) {
    let y = rectYStart + i * rectHeight;
    for (let x = 0; x <= width; x += 5) {
      let randomGray = getRandomGray();
      stroke(randomGray);
      drawImperfectLine(x, y, x + 5, y);
    }
  }

  // vertical lines within the rectangle
  for (let x = 0; x <= width; x += 5) {
    let randomGray = getRandomGray();
    stroke(randomGray);
    drawImperfectLine(x, rectYStart, x, rectYStart + rectHeight);
  }
}

// makes a line between two points, with an attempted hand-drawn effect
function drawImperfectLine(x1, y1, x2, y2) {
  let steps = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
  let noiseScale = 0.3;
  beginShape();
  for (let i = 0; i <= steps; i++) {
    if (segmentCounter >= segmentLimit) {
      endShape();
      return;
    }
    let t = i / steps;
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);
    let offsetX =
      noise(x * noiseScale, y * noiseScale) * offsetRange * 2 - offsetRange;
    let offsetY =
      noise(y * noiseScale, x * noiseScale) * offsetRange * 2 - offsetRange;
    vertex(x + offsetX, y + offsetY);
    segmentCounter++;
  }
  endShape();
}

function getRandomOffset() {
  return random(-offsetRange, offsetRange);
}

function getRandomGray() {
  return random(grayMin, grayMax);
}