/**
 * @Author: Edmund Lam <edl>
 * @Date:   10:02:55, 27-Nov-2018
 * @Filename: collisions.js
 * @Last modified by:   edl
 * @Last modified time: 22:19:58, 14-Aug-2019
 */

var Collision = (function(){
  var self = {};

  var rects = {
    re:null,
    ore:null,
    zdr:null
  }

  function get_footrect(dst, map=Game.map.map){
    let r = [];
    r.push(get_dir(dst,0,map));
    r.push(get_dir(dst,1,map));
    r.push(get_dir(dst,2,map));
    r.push(get_dir(dst,3,map));
    return r
  }

  function get_dir(dst, dir=SWITCH_DIRS.indexOf(mc.dir[0]), map=Game.map.map){
    switch (dir){
      case 0:
        return c_c(mc.pos[0]-dst, mc.pos[1]+mc.currAnim.height, 0, 0, map);
        //front
        break;
      case 1:
        return c_c(mc.pos[0], mc.pos[1]-dst+mc.currAnim.height, mc.currAnim.width, 0, map);
        //back
        break;
      case 2:
        return c_c(mc.pos[0]+mc.currAnim.width+dst, mc.pos[1]+mc.currAnim.height, 0, 0, map);
        //left
        break;
      case 3:
        return c_c(mc.pos[0], mc.pos[1]+dst+mc.currAnim.height, mc.currAnim.width, 0, map);
        //right
        break;
      default:
        return;
    }
  }

  function get_col_at_pix(x, y, map){
    let m_data = map.getContext('2d').getImageData(x, y, 1, 1).data;
    return rgbHex(m_data[0], m_data[1], m_data[2]);
  }

  function c_c(sx, sy, lx, ly, map=Game.map.map){
    let ret = [];
    for(let j = 0; j <= lx; j++){
      for(let i = 0; i <= ly; i++){
        ret.push(get_col_at_pix(sx+j, sy+i, map));
      }
    }
    return ret;
  }

  self.check_collide = function(){
    rects.re = get_footrect(1);
    rects.ore = get_footrect(1, Game.map.objmap);
    rects.zdr = get_dir(0);
    return [rects.re[0].includes(0) || !rects.ore[0].includes(0xffffff),
            rects.re[1].includes(0) || !rects.ore[0].includes(0xffffff),
            rects.re[2].includes(0) || !rects.ore[0].includes(0xffffff),
            rects.re[3].includes(0) || !rects.ore[0].includes(0xffffff)]
  };

  self.check_doors = function(){
    let currmapdoors = MAP_DATA[mc.map].doors;
    Object.keys(currmapdoors).forEach(key => {
      if (rects.re[SWITCH_DIRS.indexOf(mc.dir[0])].includes(Number(key))){
        Game.curr_action_type = "darken";
        Game.cmde = [Events.change_map, currmapdoors[key]];
      }
    });
  };

  self.check_containers = function(){
    let currcontainers = lmd[mc.map].containers;
    Object.keys(currcontainers).forEach(key => {
      if (rects.zdr.includes(Number(key))){
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
      if (currmapacts[key].dir.indexOf(mc.dir[0]) >= 0  && rects.zdr.includes(Number(key))){
        Events.initText(currmapacts[key].responses, key);
      }
    });
  };

  self.check_objects = function(){
    let currobjs = MAP_DATA[mc.map].objects;
    for(let i = 0; i < currobjs.length; i++){
      if (check_in_dir(1, i, undefined, undefined, Game.map.objmap)){
        Game.curr_obj = currobjs[i];
        Events.initText(OBJ_DATA[currobjs[i].type].responses);
      }
    }
  }

  return self;
}());
