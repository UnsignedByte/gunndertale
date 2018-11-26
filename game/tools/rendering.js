/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:59:40, 24-Nov-2018
 * @Filename: rendering.js
 * @Last modified by:   edl
 * @Last modified time: 08:24:29, 26-Nov-2018
 */

var Window = (function(){
  var self = {};

  self.window_height = 256;
  self.window_width = self.window_height*window.innerWidth/window.innerHeight;

  function get_window_pos(){
    return Math.min(mc.pos - MAP_DATA[mc.map].back)
  }

  self.render = function(){
    context.drawImage(MC_DATA.animations[mc.dir[0]][mc.dir[1]], window.innerWidth/2-12, window.innerHeight/2)
    MAP_DATA[mc.map]
  }

  return self;
}());
