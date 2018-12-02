/**
 * @Author: Edmund Lam <edl>
 * @Date:   16:38:05, 01-Dec-2018
 * @Filename: gameutils.js
 * @Last modified by:   edl
 * @Last modified time: 17:18:38, 01-Dec-2018
 */

var Game = {
  game_anim_dir_mod:0,
  curr_collision_data:[false, false, false, false],
  curr_action_type:"game",
  cmde:null
}


function test_keypress(){
  let is_moving = false;
  Object.keys(KEYS_DOWN).forEach(key => {
    if (KEYS_DOWN[key] === true){
      if (37<=Number(key)<=40){
        if (!Game.curr_collision_data[Number(key)-37]){
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
  if (Game.game_anim_dir_mod===0){
    mc.dir[1]++;
    if (is_moving){
      mc.dir[1]%=MC_DATA.animations[0].length;
    }else{
      mc.dir[1] = 0;
    }
  }
  if(is_moving){
    Game.game_anim_dir_mod++;
    Game.game_anim_dir_mod%=FRAMES_BEFORE_WALK;
  }else{
    Game.game_anim_dir_mod=0;
  }
}
