'use strict';

/* globals */
const renderBuffer = new ArrayBuffer(640 * 480 * 4);
let renderData = new Uint8ClampedArray(renderBuffer);
renderData.fill(200);

function init(){
  const canvas = document.getElementById('viewer');
  const context = canvas.getContext('2d');
  const canvasDataHash = context.getImageData(0, 0, 640, 480);
  const canvasData = canvasDataHash.data;
  canvasData.set(renderData);
  context.putImageData(canvasDataHash, 0, 0);
}
