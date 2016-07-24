'use strict';

/* globals */
const screenW = 640,
      screenH = 480,
      renderBuffer = new ArrayBuffer(screenW * screenH * 4),
      renderData = new Uint8ClampedArray(renderBuffer),
      originPixel = renderData.length - 1 - (screenW * 4);

function init(){
  const canvas = document.getElementById('viewer');
  const context = canvas.getContext('2d');
  const canvasDataHash = context.getImageData(0, 0, screenW, screenH);

  window.setInterval(gameTick, 10); //100 updates per second

  (function drawData(){
    canvasDataHash.data.set(renderData);
    context.putImageData(canvasDataHash, 0, 0);
    window.requestAnimationFrame(drawData);
    //This supposedly could be faster but doesn't seem to be
    // createImageBitmap(canvasDataHash, 0, 0, screenW, screenH).then(function(bitmap){
    //   context.drawImage(bitmap, 0, 0);
    //   window.requestAnimationFrame(drawData);
    // });
  })();
}

function gameTick(){
  renderData.fill(200); //Temp gray fill
  drawCharacter();
}

let x = 20;
function drawCharacter(){
  //square
  let  y = 0,
    size = 30;
  x = ++x > (screenW * 4 - (size * 4)) ? 20 : x;

  //draw the square a whole horizontal line at a time
  const upALine = screenW * 4;
  for (let i = 0; i < size; i++){
    const lineStart =
      (originPixel + (x * 4)) - (upALine * (size - i));
    renderData.fill(0, lineStart, lineStart + (size * 4));
  }
}
