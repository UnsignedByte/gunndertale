/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:16:47, 24-Nov-2018
 * @Filename: init.js
 * @Last modified by:   edl
 * @Last modified time: 09:53:14, 27-Nov-2018
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
var context = canv.getContext("2d");

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
 canv.width = window.innerWidth;
 canv.height = window.innerHeight;
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
