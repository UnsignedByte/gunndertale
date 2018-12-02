/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 16:39:12, 01-Dec-2018
 */


function draw(){
 context.clearRect(0, 0, canv.width, canv.height)
 if (Game.curr_action_type === "game"){
   mc.currAnim=MC_DATA.animations[mc.dir[0]][mc.dir[1]];

   Game.curr_collision_data = Collision.check_collide();
   test_keypress();
   Collision.enter_doors();
   Window.render();
 }
}

function second(){
  window.localStorage.setItem("mainchar", JSON.stringify(mc));
}

var secondinterval = setInterval(second, 1000);
var drawinterval = setInterval(draw, 1000/BASE_FPS);
