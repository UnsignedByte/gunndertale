/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 23:18:29, 28-Nov-2018
 */

var game_anim_dir_mod = 0;
var curr_collision_data = [false, false, false, false];

//no more blurring! :)
context.imageSmoothingEnabled = false;

function draw(){
  context.clearRect(0, 0, canv.width, canv.height)
  mc.currAnim=MC_DATA.animations[mc.dir[0]][mc.dir[1]];

  curr_collision_data = Collision.check_collide();
  test_keypress();
  Window.render();
  Collision.enter_doors();
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
      if (37<=Number(key)<=40){
        if (!curr_collision_data[Number(key)-37]){
          is_moving=true;
          switch (key){
            case "37":
              mc.pos[0]-=MOV_SPEED;
              break;
            case "38":
              mc.pos[1]-=MOV_SPEED;
              break;
            case "39":
              mc.pos[0]+=MOV_SPEED;
              break;
            case "40":
              mc.pos[1]+=MOV_SPEED;
              break;
          }
        }
      }
      switch (key){
        case "37":
          mc.dir[0] = 2;
          break;
        case "38":
          mc.dir[0] = 1;
          break;
        case "39":
          mc.dir[0] = 3;
          break;
        case "40":
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
