/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:16:47, 24-Nov-2018
 * @Filename: init.js
 * @Last modified by:   edl
 * @Last modified time: 10:29:58, 27-Nov-2018
 */




//Init
var mc;
if (localStorage.getItem("mainchar") === null) {
  mc = {
    pos:[6, 110],
    dir:[0, 0], //0 = up, 1 = down, 2 = left, 3 = right
    map:"test_bg"
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

const BASE_FPS = 30;
const MOV_SPEED = 2;

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
