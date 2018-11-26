/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 16:16:35, 25-Nov-2018
 */

function draw(){
  test_keypress();
}

function minute(){
  window.localStorage.setItem("mainchar", JSON.stringify(mc));
}

var minuteinterval = setInterval(minute, 1000*60);
var drawinterval = setInterval(draw, 1000/BASE_FPS);

function test_keypress(){
  Object.keys(KEYS_DOWN).forEach(key => {
    if (KEYS_DOWN[key] === true){
      switch (key){
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
  });
}
