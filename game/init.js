/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:16:47, 24-Nov-2018
 * @Filename: init.js
 * @Last modified by:   edl
 * @Last modified time: 22:17:53, 27-Nov-2018
 */




//Init
var mc;
if (localStorage.getItem("mainchar") === null) {
  mc = {
    pos:[6, 110],
    dir:[0, 0],
    map:"test_bg",
    currAnim:None
  }
  window.localStorage.setItem("mainchar", JSON.stringify(mc));
}else{
  mc = JSON.parse(window.localStorage.getItem("mainchar"));
}

var canv = document.getElementById('game');

function setupCanvas(canvas) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}

var context = setupCanvas(canv);

var KEYS_DOWN = {
  37:false,
  38:false,
  39:false,
  40:false
};

//Constants

const BASE_FPS = 60;
const MOV_SPEED = 1.5;

init();

function init(){
    /*Double size cuz stupid bug lol*/
 canv.width = window.innerWidth * 2;
 canv.height = window.innerHeight * 2;
}

//Event Listeners
document.addEventListener("keydown", function(event) {
  if (event.which in KEYS_DOWN){
    KEYS_DOWN[event.which] = true;
  }
});
document.addEventListener("keyup", function(event) {
  if (event.which in KEYS_DOWN){
    KEYS_DOWN[event.which] = false;
  }
});
