/**
 * @Author: Edmund Lam <edl>
 * @Date:   10:02:55, 27-Nov-2018
 * @Filename: collisions.js
 * @Last modified by:   edl
 * @Last modified time: 12:42:25, 24-Jun-2019
 */

var Collision = (function(){
  var self = {};

  function check_in_dir(dst, match_col, dir=SWITCH_DIRS.indexOf(mc.dir[0]), cond="===", map=Game.map.map){
    switch (dir){
      case 0:
        return c_c(mc.pos[0]-dst, mc.pos[1]+mc.currAnim.height, 0, 0, match_col, cond, map);
        //front
        break;
      case 1:
        return c_c(mc.pos[0], mc.pos[1]-dst+mc.currAnim.height, mc.currAnim.width, 0, match_col, cond, map);
        //back
        break;
      case 2:
        return c_c(mc.pos[0]+mc.currAnim.width+dst, mc.pos[1]+mc.currAnim.height, 0, 0, match_col, cond, map);
        //left
        break;
      case 3:
        return c_c(mc.pos[0], mc.pos[1]+dst+mc.currAnim.height, mc.currAnim.width, 0, match_col, cond, map);
        //right
        break;
    }
  }

  function get_col_at_pix(x, y, map){
   let m_data = map.getContext('2d').getImageData(x, y, 1, 1).data;
   return rgbHex(m_data[0], m_data[1], m_data[2]);
  }

  function c_c(sx, sy, lx, ly, match_col=0, cond="===", map=Game.map.map){
    for(let j = 0; j <= lx; j++){
      for(let i = 0; i <= ly; i++){
        if (eval(`get_col_at_pix(sx+j, sy+i, map) ${cond} match_col`)){
          return true;
        }
      }
    }
    return false;
  }

  self.check_collide = function(){
   return [check_in_dir(1, 0, 0) || check_in_dir(1, 0xffffff, 0, "!==", Game.map.objmap),
           check_in_dir(1, 0, 1) || check_in_dir(1, 0xffffff, 1, "!==", Game.map.objmap),
           check_in_dir(1, 0, 2) || check_in_dir(1, 0xffffff, 2, "!==", Game.map.objmap),
           check_in_dir(1, 0, 3) || check_in_dir(1, 0xffffff, 3, "!==", Game.map.objmap)]
  };

  self.check_doors = function(){
    let currmapdoors = MAP_DATA[mc.map].doors;
    Object.keys(currmapdoors).forEach(key => {
      if (check_in_dir(1, Number(key))){
        Game.curr_action_type = "darken";
        Game.cmde = [Events.change_map, currmapdoors[key]];
      }
    });
  };

  self.check_containers = function(){
    let currcontainers = lmd[mc.map].containers;
    Object.keys(currcontainers).forEach(key => {
      if (check_in_dir(0, Number(key))){
        Game.curr_action_type = "container";
        Game.container.id = Number(key);
        Game.container.chosen = null;
        Game.inventory.chosen = 0;
      }
    });
  };
  self.check_actions = function(){
    let currmapacts = MAP_DATA[mc.map].actions;
    Object.keys(currmapacts).forEach(key => {
      if (currmapacts[key].dir.indexOf(mc.dir[0]) >= 0  && check_in_dir(0, Number(key))){
        Events.initText(currmapacts[key].responses, key);
      }
    });
  };

  self.check_objects = function(){
    let currobjs = MAP_DATA[mc.map].objects;
    for(let i = 0; i < currobjs.length; i++){
      if (check_in_dir(1, i, undefined, undefined, Game.map.objmap)){
        Events.initText(OBJ_DATA[currobjs[i].type].responses);
      }
    }
  }

  return self;
}());
