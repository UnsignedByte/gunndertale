/**
 * @Author: Edmund Lam <edl>
 * @Date:   22:16:47, 24-Nov-2018
 * @Filename: init.js
 * @Last modified by:   edl
 * @Last modified time: 12:49:01, 24-Jun-2019
 */


//Init

var mc;
var lmd;

function start_newgame(){
  mc = JSON.parse(JSON.stringify(DEFAULT_MC)); //deepcopy
  lmd = JSON.parse(JSON.stringify(DEFAULT_LOCAL_MAP_DATA));
  window.localStorage.setItem("mainchar", JSON.stringify(mc));
  window.localStorage.setItem("lmd", JSON.stringify(lmd));
  Events.set_map(mc.map);
}

if (localStorage.getItem("mainchar") === null || localStorage.getItem("lmd") === null) {
  start_newgame();
}else{
  mc = JSON.parse(window.localStorage.getItem("mainchar"));
  lmd = JSON.parse(window.localStorage.getItem("lmd"));
}


var Game = {
  game_anim_dir_mod:0,
  curr_collision_data:[false, false, false, false],
  curr_action_type:"game",
  map:{
    front:null,
    back:null,
    map:null,
    objmap:null
  },
  curr_obj:null,
  cmde:null,
  text:{
    door_id:null,
    pos:null,
    full:null,
    options:null,
    chosen:null,
    chosenKey:null
  },
  inventory:{
    chosen:null,
    chosen_action:null
  },
  container:{
    id:null,
    chosen:null
  },
  stats:{
    happiness:100,
    cqueue:[]
  }
};

(()=>{
  let count = 1;

  set_defaults(MAP_DATA, ["actions", "objects", "doors"], [{}, [], {}]);
  Object.keys(MAP_DATA).forEach(key => {
    let types = ["back", "front", "map"]
    for (let i = 0; i < types.length; i++){
      let img = new Image();
      count++;
      img.src = `../images/map/${key}/${key}-${types[i]}.png`;
      img.onload = function() {
        MAP_DATA[key][types[i]] = img;
        count--;
        if(count === 0){
          Events.set_map(mc.map);
        }
      }
    }
  });

  let directions = ["front", "back", "left", "right"];
  for (let i = 0; i < MC_DATA.animations.length; i++){
    for (let j = 0; j < MC_DATA.animations[i].length; j++){
      let img = new Image();
      count++;
      img.src = "../images/objects/mc/"+directions[i]+"/"+MC_DATA.animations[i][j];
      img.onload = function() {
        MC_DATA.animations[i][j] = img;
        count--;
        if(count === 0){
          Events.set_map(mc.map);
        }
      }
    }
  }

  //load cursor
  let img = new Image();
  count++;
  img.src = "../images/objects/mc/cursor.png";
  img.onload = function(){
    MC_DATA.cursor = img;
    count--;
    if(count === 0){
      Events.set_map(mc.map);
    }
  }

  //load objects
  Object.keys(OBJ_DATA).forEach(key => {
    OBJ_DATA[key].frames = [];
    for (let i = 0; i < OBJ_DATA[key].framecount; i++){
      let img = new Image();
      count++;
      img.src = `../images/objects/${key}/${i}.png`;
      img.onload = function() {
        OBJ_DATA[key].frames[i] = img;
        count--;
        if(count === 0){
          Events.set_map(mc.map);
        }
      }
    }
    let img = new Image();
    count++;
    img.src = `../images/objects/${key}/hitbox.png`;
    img.onload = function() {
      OBJ_DATA[key].hitbox = img;
      count--;
      if(count === 0){
        Events.set_map(mc.map);
      }
    }
  });

  count--;
})();

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
const TPS = 80;

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
