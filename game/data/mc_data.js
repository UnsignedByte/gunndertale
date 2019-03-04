/**
 * @Author: Edmund Lam <edl>
 * @Date:   18:22:30, 25-Nov-2018
 * @Filename: mc_data.js
 * @Last modified by:   edl
 * @Last modified time: 11:10:38, 03-Mar-2019
 */

var MAX_INVENTORY_SIZE = 16;

var DEFAULT_MC = {
  pos:[100, 100],
  dir:[0, 0],
  map:"bedroom",
  currAnim:null,
  inventory:[],
  time:0,
  stats:{
    happiness:{
      hunger:{
        "Dinner":{
          val:100,
          dr:0.01,
          dt:60
        }
      },
      reputation:{

      },
      base_happiness:{
        "Alive":{
          val:100, //current value
          dr: 0,   //decay rate towards 0 (between 0 and 1)
          dt:0     //how often to lower happiness (0 = infinity)
        }
      }
    }
  }
}

var MC_DATA = {
 animations:[
   ["0.png", "1.png", "0.png", "2.png"],
   ["0.png", "1.png", "0.png", "2.png"],
   ["0.png", "1.png", "0.png", "1.png"],
   ["0.png", "1.png", "0.png", "1.png"]
 ],
 cursor:null,
 stats:{
   happiness:{
     base_happiness:x=>{return x;},
     hunger:x=>{return -Math.pow(minmax(x,0,100)/10-10, 2);},
     reputation:x=>{return x}
   }
 }
};

init_mc_data();

function init_mc_data(){
  let directions = ["front", "back", "left", "right"];
  for (let i = 0; i < MC_DATA.animations.length; i++){
    for (let j = 0; j < MC_DATA.animations[i].length; j++){
      let img = new Image();
      img.src = "../images/objects/mc/"+directions[i]+"/"+MC_DATA.animations[i][j];
      img.onload = function() {
        MC_DATA.animations[i][j] = img;
      }
    }
  }

  //load cursor
  let img = new Image();
  img.src = "../images/objects/mc/cursor.png";
  img.onload = function(){
    MC_DATA.cursor = img;
  }
}
