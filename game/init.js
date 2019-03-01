/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:16:47, 24-Nov-2018
 * @Filename: init.js
 * @Last modified by:   edl
 * @Last modified time: 19:35:21, 28-Feb-2019
 */




//Init

var mc;
var lmd;

function start_newgame(){
  mc = DEFAULT_MC;
  lmd = DEFAULT_LOCAL_MAP_DATA;
  window.localStorage.setItem("mainchar", JSON.stringify(mc));
  window.localStorage.setItem("lmd", JSON.stringify(lmd));
}

if (localStorage.getItem("mainchar") === null || localStorage.getItem("lmd") === null) {
  start_newgame();
}else{
  mc = JSON.parse(window.localStorage.getItem("mainchar"));
  lmd = JSON.parse(window.localStorage.getItem("lmd"));
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
  40:false,
  13:false,
  88:false,
  90:false,
  16:false,
  67:false,
  17:false
};

var KEY_NAMES = {
  "37":"left",
  "38":"up",
  "39":"right",
  "40":"down",
  "90":"z",
  "13":"z",
  "16":"x",
  "88":"x",
  "17":"c",
  "67":"c"
}

const SWITCH_DIRS = [2, 1, 3, 0];

//Constants

const BASE_FPS = 60;
const MOV_SPEED = 1;
const FRAMES_BEFORE_WALK = 10;

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
