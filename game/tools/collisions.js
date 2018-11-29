/**
 * @Author: Edmund Lam <edl>
 * @Date:   10:02:55, 27-Nov-2018
 * @Filename: collisions.js
 * @Last modified by:   edl
 * @Last modified time: 22:55:49, 28-Nov-2018
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

  function get_col_at_pix(x, y){
   let m_data = self.map_data.getContext('2d').getImageData(x, y, 1, 1).data;
   return rgbHex(m_data[0], m_data[1], m_data[2]);
  }

  function c_c(sx, sy, lx, ly){
    for(let j = 0; j <= lx; j++){
      for(let i = 0; i <= ly; i++){
        if (get_col_at_pix(sx+j, sy+i) === 0){
          return true;
        }
      }
    }
    return false;
  }

  self.check_collide = function(){
   self.map_data = self.get_map_data();
   return [c_c(mc.pos[0]-MOV_SPEED, mc.pos[1], 0, mc.currAnim.height),
           c_c(mc.pos[0], mc.pos[1]-MOV_SPEED, mc.currAnim.width, 0),
           c_c(mc.pos[0]+mc.currAnim.width+MOV_SPEED, mc.pos[1], 0, mc.currAnim.height),
           c_c(mc.pos[0], mc.pos[1]+MOV_SPEED+mc.currAnim.height, mc.currAnim.width, 0)]
  }

  return self;
}());
