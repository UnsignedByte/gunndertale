/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 22:46:03, 27-Nov-2018
 */

var game_anim_dir_mod = 0;

//no more blurring! :)
context.imageSmoothingEnabled = false;

function draw(){
  context.clearRect(0, 0, canv.width, canv.height)

  test_keypress();
  mc.currAnim=MC_DATA.animations[mc.dir[0]][mc.dir[1]];
  Window.render();
}

function minute(){
  window.localStorage.setItem("mainchar", JSON.stringify(mc));
}

var minuteinterval = setInterval(minute, 1000*60);
var drawinterval = setInterval(draw, 1000/BASE_FPS);

function test_keypress(){
  let is_moving = false;
  Object.keys(KEYS_DOWN).forEach(key => {
    if (KEYS_DOWN[key] === true){
      switch (key){
        case "37":
          is_moving=true;
          mc.pos[0]-=MOV_SPEED;
          mc.dir[0] = 2;
          break;
        case "38":
          is_moving=true;
          mc.pos[1]-=MOV_SPEED;
          mc.dir[0] = 1;
          break;
        case "39":
          is_moving=true;
          mc.pos[0]+=MOV_SPEED;
          mc.dir[0] = 3;
          break;
        case "40":
          is_moving=true;
          mc.pos[1]+=MOV_SPEED;
          mc.dir[0] = 0;
          break;
      }
    }
  });
  if (game_anim_dir_mod===0){
    mc.dir[1]++;
    if (is_moving){
      mc.dir[1]%=MC_DATA.animations[0].length;
    }else{
      mc.dir[1] = 0;
    }
  }
  if(is_moving){
    game_anim_dir_mod++;
    game_anim_dir_mod%=FRAMES_BEFORE_WALK;
  }else{
    game_anim_dir_mod=0;
  }
}
