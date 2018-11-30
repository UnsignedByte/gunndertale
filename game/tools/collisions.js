/**
 * @Author: Edmund Lam <edl>
 * @Date:   10:02:55, 27-Nov-2018
 * @Filename: collisions.js
 * @Last modified by:   edl
 * @Last modified time: 09:56:57, 30-Nov-2018
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
  }

  function check_rect_player(dst, match_col){
    return [c_c(mc.pos[0]-dst, mc.pos[1], 0, mc.currAnim.height, match_col),
            c_c(mc.pos[0], mc.pos[1]-dst, mc.currAnim.width, 0, match_col),
            c_c(mc.pos[0]+mc.currAnim.width+dst, mc.pos[1], 0, mc.currAnim.height, match_col),
            c_c(mc.pos[0], mc.pos[1]+dst+mc.currAnim.height, mc.currAnim.width, 0, match_col)]
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
   document.getElementById("debug").appendChild(self.map_data);
   // return [false, false, false, false];
   return check_rect_player(MOV_SPEED, 0);
  }

  self.enter_doors = function(){
    let currmapdoors = MAP_DATA[mc.map].doors
    Object.keys(currmapdoors).forEach(key => {
      console.log(get_col_at_pix(mc.pos[0]+32, mc.pos[1]));
      let rect_check = check_rect_player(0, Number(key));
      if (rect_check[0] || rect_check[1] || rect_check[2] || rect_check[3]){
        let cmde = currmapdoors[key];
        mc.map = cmde[0];
        mc.pos = [cmde[1], cmde[2]];
      }
    });
  }

  return self;
}());
