/**
 * @Author: Edmund Lam <edl>
 * @Date:   18:22:30, 25-Nov-2018
 * @Filename: mc_data.js
 * @Last modified by:   edl
 * @Last modified time: 22:49:42, 26-Nov-2018
 */


var MC_DATA = {
 animations:[
   ["0.png"],
   ["0.png"],
   ["0.png"]
 ]
};

init_mc_data();

function init_mc_data(){
  let directions = ["front", "back", "side"];
  for (let i = 0; i < MC_DATA.animations.length; i++){
    for (let j = 0; j < MC_DATA.animations[i].length; j++){
      let img = new Image();
      img.src = "../images/objects/mc/"+directions[i]+"/"+MC_DATA.animations[i][j];
      img.onload = function() {
        MC_DATA.animations[i][j] = img
      }
    }
  }
}
