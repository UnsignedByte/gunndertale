/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 23:10:59, 26-Nov-2018
 */

function draw(){
  context.clearRect(0, 0, canv.width, canv.height)
  test_keypress();
  Window.render();
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
        case "37":
          mc.pos[0]-=MOV_SPEED*Window.zoom;
          break;
        case "38":
          mc.pos[1]-=MOV_SPEED*Window.zoom;
          break;
        case "39":
          mc.pos[0]+=MOV_SPEED*Window.zoom;
          break;
        case "40":
          mc.pos[1]+=MOV_SPEED*Window.zoom;
          break;
        default:
      }
    }
  });
}
