/**
 * @Author: Edmund Lam <edl>
 * @Date:   21:16:29, 24-Nov-2018
 * @Filename: main.js
 * @Last modified by:   edl
 * @Last modified time: 11:05:40, 21-Apr-2019
 */

//no more blurring! :)
context.imageSmoothingEnabled = false;

function draw(){
  context.clearRect(0, 0, canv.width, canv.height)
  test_keypress();
  // mc.inventory = mc.inventory.filter((el) => {return el!=null;});
  switch (Game.curr_action_type){
    case "game":
      mc.currAnim=MC_DATA.animations[mc.dir[0]][mc.dir[1]];

      Game.curr_collision_data = Collision.check_collide();
      Collision.check_doors();
      Window.render();
      break;
    case "darken":
      Window.render();
      Effects.darken();
      break;
    case "text":
      Window.render();
      Events.text();
      break;
    case "inventory":
      Window.render();
      if (mc.inventory.length === 0) Game.inventory.chosen = null;
      Effects.inventory();
      break;
    case "container":
      Window.render();
      Events.container();
      break;
    default:
  }
}

function second(){
  mc.time++;
  mc.time%=86400;
  Stats.calculate();

  window.localStorage.setItem("mainchar", JSON.stringify(mc));
  window.localStorage.setItem("lmd", JSON.stringify(lmd));
}

second();
var secondinterval = setInterval(second, 1000);
var drawinterval = setInterval(draw, 1000/BASE_FPS);
