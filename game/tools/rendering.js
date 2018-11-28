/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:59:40, 24-Nov-2018
 * @Filename: rendering.js
 * @Last modified by:   edl
 * @Last modified time: 19:16:21, 27-Nov-2018
 */

var Window = (function(){
  var self = {};

  self.height = 256;
  self.zoom = canv.height/self.height;
  self.width = canv.width/self.zoom;

  self.invis_canv = document.createElement('canvas');
  self.invis_canv_context = self.invis_canv.getContext('2d');

  function get_window_pos(){
    return [Math.max(Math.min(0, self.width/2-mc.pos[0]), self.width-MAP_DATA[mc.map].back.width),
    Math.max(Math.min(0, self.height/2-mc.pos[1]), self.height-MAP_DATA[mc.map].back.height)];
  }

  function drawImage(im, xy){
    let x = xy[0];
    let y=xy[1];
    w_p = get_window_pos();
    context.drawImage(im, (w_p[0]+x)*self.zoom, (w_p[1]+y)*self.zoom, im.width*self.zoom, im.height*self.zoom);
  }

  self.render = function(){
    let win_pos = get_window_pos();
    drawImage(MAP_DATA[mc.map].back, [0, 0]);
    drawImage(mc.currAnim, mc.pos)
    drawImage(MAP_DATA[mc.map].front, [0, 0]);
  }

  self.get_map = function(){
    self.invis_canv_context.width = MAP_DATA[mc.map].map.width;
    self.invis_canv_context.height = MAP_DATA[mc.map].map.height;
    invis_canv_context.drawImage(MAP_DATA[mc.map].map, 0, 0);
  }

  return self;
}());
