/**
 * @Author: Edmund Lam <edl>
 * @Date:   10:02:55, 27-Nov-2018
 * @Filename: collisions.js
 * @Last modified by:   edl
 * @Last modified time: 19:06:33, 07-Mar-2019
 */

var Collision = (function(){
  var self = {};

  self.map_data = null;

  self.get_map_data = function(){
    let cmap = MAP_DATA[mc.map].map
    let map_data_canv = document.createElement('canvas');
    map_data_canv.width = cmap.width;
    map_data_canv.height = cmap.height;
    map_data_canv.getContext('2d').drawImage(cmap, 0, 0);
    return map_data_canv;
  };

  function check_rect_player(dst, match_col){
    return [c_c(mc.pos[0]-dst, mc.pos[1], 0, mc.currAnim.height, match_col),
            c_c(mc.pos[0], mc.pos[1]-dst, mc.currAnim.width, 0, match_col),
            c_c(mc.pos[0]+mc.currAnim.width+dst, mc.pos[1], 0, mc.currAnim.height, match_col),
            c_c(mc.pos[0], mc.pos[1]+dst+mc.currAnim.height, mc.currAnim.width, 0, match_col)]
  }

  function check_in_dir(dst, match_col, dir=SWITCH_DIRS.indexOf(mc.dir[0])){
    switch (dir){
      case 0:
        return c_c(mc.pos[0]-dst, mc.pos[1]+mc.currAnim.height, 0, 0, match_col);
        //front
        break;
      case 1:
        return c_c(mc.pos[0], mc.pos[1]-dst+mc.currAnim.height, mc.currAnim.width, 0, match_col);
        //back
        break;
      case 2:
        return c_c(mc.pos[0]+mc.currAnim.width+dst, mc.pos[1]+mc.currAnim.height, 0, 0, match_col);
        //left
        break;
      case 3:
        return c_c(mc.pos[0], mc.pos[1]+dst+mc.currAnim.height, mc.currAnim.width, 0, match_col);
        //right
        break;
    }
  }

  function get_col_at_pix(x, y){
   let m_data = self.map_data.getContext('2d').getImageData(x, y, 1, 1).data;
   return rgbHex(m_data[0], m_data[1], m_data[2]);
  }

  function c_c(sx, sy, lx, ly, match_col=0){
    for(let j = 0; j <= lx; j++){
      for(let i = 0; i <= ly; i++){
        if (get_col_at_pix(sx+j, sy+i) === match_col){
          return true;
        }
      }
    }
    return false;
  }

  self.check_collide = function(){
   self.map_data = self.get_map_data();
   // return [false, false, false, false];
   return [check_in_dir(MOV_SPEED, 0, dir=0),
           check_in_dir(MOV_SPEED, 0, dir=1),
           check_in_dir(MOV_SPEED, 0, dir=2),
           check_in_dir(MOV_SPEED, 0, dir=3)]
  };

  self.check_doors = function(){
    let currmapdoors = MAP_DATA[mc.map].doors;
    Object.keys(currmapdoors).forEach(key => {
      if (check_in_dir(MOV_SPEED, Number(key))){
        Game.curr_action_type = "darken";
        Game.cmde = currmapdoors[key];
      }
    });
  };

  self.check_containers = function(){
    let currcontainers = lmd[mc.map].containers;
    Object.keys(currcontainers).forEach(key => {
      if (check_in_dir(0, Number(key))){
        Game.curr_action_type = "container";
        Game.container.id = Number(key);
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

  return self;
}());
