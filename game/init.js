/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:16:47, 24-Nov-2018
 * @Filename: init.js
 * @Last modified by:   edl
 * @Last modified time: 09:54:13, 25-Nov-2018
 */




//Init
var mc = {
  pos:[0, 0],
  dir:0, //0 = up, 1 = down, 2 = left, 3 = right
  animations:[
    ["0.png"],
    ["0.png"],
    ["0.png"]
  ]
}

var canv = document.getElementById('game');
var context = canv.getContext("2d");

//Constants

const MC_HEIGHT_PERCENTAGE = 0.2;

init();

function init(){
 canv.width = window.innerWidth;
 canv.height = window.innerHeight;
}

function PARSE_MAP(){
  
}




//Event Listeners
document.addEventListener("keydown", function(event) {
  KEYPRESS_ACTIONS(event.which)
});
