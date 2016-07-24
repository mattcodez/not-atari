'use strict';

/* globals */
const screenW = 640,
      screenH = 480,
      renderBuffer = new ArrayBuffer(screenW * screenH * 4),
      renderData = new Uint8ClampedArray(renderBuffer),
      originPixel = renderData.length - 1 - (screenW * 4);
renderData.fill(200); //Temp gray fill

function init(){
  const canvas = document.getElementById('viewer');
  const context = canvas.getContext('2d');
  const canvasDataHash = context.getImageData(0, 0, 640, 480);
  canvasDataHash.data.set(renderData);
  context.putImageData(canvasDataHash, 0, 0);

  window.setInterval(gameTick, 10); //100 updates per second

  (function drawData(){
    canvasDataHash.data.set(renderData);
    context.putImageData(canvasDataHash, 0, 0);
    window.requestAnimationFrame(drawData);
  })();
}

function gameTick(){
  drawCharacter();
}

function drawCharacter(){
  //square
  const //position and size
    x = 20,
    y = 0,
    size = 30;

  //draw the square a whole horizontal line at a time
  const upALine = screenW * 4;
  for (let i = 0; i < size; i++){
    const lineStart =
      (originPixel + (x * 4)) - (upALine * (size - i));
    renderData.fill(0, lineStart, lineStart + (size * 4));
  }
}
