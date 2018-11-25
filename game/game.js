/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 09:54:26, 25-Nov-2018
 */

function draw(){
  
}

draw();

function KEYPRESS_ACTIONS(code){
  switch (code){
    case 37:
      mc.pos[1]--;
      break;
    case 38:
      mc.pos[0]--;
      break;
    case 39:
      mc.pos[1]++;
      break;
    case 40:
      mc.pos[0]++;
      break;
    default:
  }
}
