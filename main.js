'use strict';

/* globals */
const renderBuffer = new ArrayBuffer(640 * 480 * 4);
let renderData = new Uint8ClampedArray(renderBuffer);
//renderData.fill(200); //Temp gray fill

function init(){
  const canvas = document.getElementById('viewer');
  const context = canvas.getContext('2d');
  const canvasDataHash = context.getImageData(0, 0, 640, 480);
  canvasDataHash.data.set(renderData);
  context.putImageData(canvasDataHash, 0, 0);

  let i = 0;//pulse gray just to get some change going
  const colorShift = function(){
    i = ++i > 255 ? 0 : i;
    renderData.fill(i);
    canvasDataHash.data.set(renderData);
    context.putImageData(canvasDataHash, 0, 0);
    window.requestAnimationFrame(colorShift);
  };
  window.requestAnimationFrame(colorShift);
}
